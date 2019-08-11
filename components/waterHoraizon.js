import React, { useEffect, useState } from 'react';
//import * as THREE from 'three';
import * as THREE from '../lib/three.module';
import { FirstPersonControls } from '../lib/FirstPersonControls.js';
import { Water } from '../lib/Water.js';
import { Sky } from '../lib/Sky.js';

const firstPerson = (props) => {

    let camera = null;
    let controls = null;
    let water = null;
    let scene = null;
    let renderer = null;
    let con = null;
    let light = null;
    let [orientVector, setOrientVector] = useState(null);

    useEffect(() => {
        init();
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener("deviceorientation", handleOrientation, true);

        animate();

        // return () => {
        //     stop();
        // }
    }, []);

    function handleOrientation(event) {
        if (orientVector && controls) {
            event.preventDefault();
            // to rad:
            let ar = event.alpha * Math.PI / 180;
            let br = event.beta * Math.PI / 180;
            let gr = event.gamma * Math.PI / 180;

            let art = ar >= 0 ? ar : ar;
            let brt = br >= 0 ? br : br;
            let grt = gr >= 0 ? gr : gr;

            // WITH EULER:
            let eu = new THREE.Euler(art, brt, grt);
            // WITH quaternion:
            let quaternion = new THREE.Quaternion();
            quaternion.setFromEuler(eu);

            orientVector.applyQuaternion(quaternion);

            controls.lookAt(orientVector.y, orientVector.x, orientVector.z);
            //controls.update();

        }
    }

    function init() {
        let radius = window.innerHeight / 2;

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        con.appendChild(renderer.domElement);

        // watching ground: 
        // let v = new THREE.Vector3(1, 1, 1); 
        //also work:
        //let radiusW = window.innerWidth / 2;
        // let v = new THREE.Vector3(radiusW, radius, radius);
        setOrientVector(new THREE.Vector3(1, radius, radius));
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
        con.removeChild(renderer.domElement);
        cancelAnimationFrame(con);
    }

    function render() {
        water.material.uniforms['time'].value += 1.0 / 60.0;
        renderer.render(scene, camera);
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'block',
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        }}
        >
            <div
                style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
                ref={(ref) => { con = ref }}
            ></div>
        </div>
    )


}
export default firstPerson;

