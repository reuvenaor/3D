import React, { useEffect } from 'react';
//import * as THREE from 'three';
import * as THREE from '../lib/three.module';
import { FirstPersonControls } from '../lib/FirstPersonControls.js';
import { Water } from '../lib/Water.js';
import { Sky } from '../lib/Sky.js';
import { TimelineMax } from 'gsap';


const firstPerson = (props) => {

    let camera = null;
    let controls = null;
    let water = null;
    let scene = null;
    let renderer = null;
    let con = null;
    let light = null;
    let raycaster = null;
    let mouse = null;
    let box = null;
    let isBoxScaled = true;

    useEffect(() => {
        init();
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener("deviceorientation", handleOrientation, true);
        window.addEventListener('mousemove', onMouseMove);
        animate();

        return () => {
            stop();
        }
    }, []);

    function handleOrientation(event) {
        if (controls && event.alpha || event.beta || event.gamma) {
            event.preventDefault();

            let ar = event.alpha * Math.PI / 180;
            let br = event.beta * Math.PI / 180;
            let gr = event.gamma * Math.PI / 180;

            let art = ar >= 0 ? ar : ar;
            let brt = br >= 0 ? br : br;
            let grt = gr >= 0 ? gr : gr;

            let radius = window.innerHeight / 2;
            //let radiusW = window.innerWidth / 2;

            // WITH EULER:
            let eu = new THREE.Euler(art, brt, grt);
            // WITH quaternion:
            let quaternion = new THREE.Quaternion();
            quaternion.setFromEuler(eu);

            let v = new THREE.Vector3(1, radius, radius);
            // watching ground: 
            // let v = new THREE.Vector3(1, 1, 1); 
            // let v = new THREE.Vector3(radiusW, radius, radius);
            v.applyQuaternion(quaternion);


            controls.lookAt(v.y, v.x, v.z);
            controls.update();

        }
    }

    function init() {

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        con.appendChild(renderer.domElement);
        let radius = window.innerHeight / 2;
        // let radiusW = window.innerWidth / 2;
        //
        scene = new THREE.Scene();

        //
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
        // camera.position.set(radiusW, radius, 1);
        camera.position.set(1, radius, 1);
        //
        light = new THREE.DirectionalLight(0xffffff, 0.8);
        scene.add(light);
        // Water
        var waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000);
        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('../static/waternormals.jpg', function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                alpha: 1.0,
                sunDirection: light.position.clone().normalize(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );
        water.rotation.x = - Math.PI / 2;
        scene.add(water);

        // box
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        let boxGeometry = new THREE.SphereGeometry(150, 150, 150);
        let boxMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        box = new THREE.Mesh(boxGeometry, boxMaterial);

        box.position.x = window.innerWidth / 2 //300;
        box.position.y = window.innerHeight * 0.9;
        box.position.z = -2000;
        //box.material.color = {r: 0.3, g: 0.4, b: 0.4};
        box.material.emissive = { r: 0.3, g: 0.38, b: 0.3 };
        //box.material.shininess = 100
        //box.material.premultipliedAlpha = true
        console.log('box', box);
        scene.add(box);
        // Skybox
        var sky = new Sky();
        var uniforms = sky.material.uniforms;
        uniforms['turbidity'].value = 20;
        uniforms['rayleigh'].value = 2;
        uniforms['luminance'].value = 1;
        uniforms['mieCoefficient'].value = 0.005;
        uniforms['mieDirectionalG'].value = 0.8;
        var parameters = {
            distance: 10000,
            inclination: 0.48,
            azimuth: 0.205
        };
        var cubeCamera = new THREE.CubeCamera(0.1, 1, 512);
        cubeCamera.renderTarget.texture.generateMipmaps = true;
        cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipmapLinearFilter;
        scene.background = cubeCamera.renderTarget;
        function updateSun() {
            var theta = Math.PI * (parameters.inclination - 0.5);
            var phi = 2 * Math.PI * (parameters.azimuth - 0.5);
            light.position.x = parameters.distance * Math.cos(phi);
            light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
            light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);
            sky.material.uniforms['sunPosition'].value = light.position.copy(light.position);
            water.material.uniforms['sunDirection'].value.copy(light.position).normalize();
            cubeCamera.update(renderer, sky);
        }
        updateSun();

        controls = new FirstPersonControls(camera);
        controls.movementSpeed = 300;
        controls.lookSpeed = 0.1;
        controls.activeLook = false;
        controls.update();
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (controls.handleResize) {
            controls.handleResize();
        }
    }

    function stop() {
        if (con) {
            con.removeChild(renderer.domElement);
            cancelAnimationFrame(con);
        }
    }

    function render() {
        water.material.uniforms['time'].value += 1.0 / 60.0;
        renderer.render(scene, camera);
    }

    function onMouseMove(event) {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObject(box, false);
        if (intersects[0] && intersects[0].object.geometry.type === "SphereGeometry" && isBoxScaled) {
            console.log('intersects[0].object', intersects[0].object);
            this.tl = new TimelineMax();
            this.tl.to(intersects[0].object.scale, 1, { x: 0.3, y: 0.3, z: 0.3, ease: Expo.easeOut })
            this.tl.to(intersects[0].object.position, .5, { x: 20, ease: Expo.easeIn })
            this.tl.to(intersects[0].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
            this.tl.to(intersects[0].object.scale, .5, { x: 3, y: 0.5, z: 10, ease: Expo.easeOut })
            this.tl.to(intersects[0].object.position, .5, { y: 10, ease: Expo.easeIn })
            this.tl.to(intersects[0].object.scale, .5, { x: 3, ease: Expo.easeOut })
            // this.tl.to(intersects[0].object.position, .5, { x: 20, ease: Expo.easeIn })
            isBoxScaled = false;
        }


        // var intersects = raycaster.intersectObjects(scene.children, true);

        // if (intersects[0] && intersects[0].object.geometry.type === "BoxGeometry") {
        //     console.log('intersects', intersects);
        //     for (var i = 0; i < intersects.length; i++) {
        //         this.tl = new TimelineMax();
        //         this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
        //         this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
        //         this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
        //         this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
        //     }
        // }

    }

    return (
        // <div style={{
        //     width: '100vw',
        //     height: '100vh',
        //     display: 'block',
        //     margin: 0,
        //     padding: 0,
        //     overflow: 'hidden'
        // }}
        <>
            <div
                style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
                ref={(ref) => { con = ref }}
            ></div>
        </>
    )


}
export default React.memo(firstPerson);

