import React, { useEffect, useState } from 'react';
//import * as THREE from 'three';
import * as THREE from '../lib/three.module';
import { OrbitControls } from '../Lib/OrbitControls.js';
import { Water } from '../lib/Water.js';
import { Sky } from '../lib/Sky.js';

const firstPerson = (props) => {

    const [win, setWindow] = useState(null);
    const [contoler, setControler] = useState(null);
    const [radius, setRadius] = useState(null)
    //
    let camera = null;
    let controls = null;
    let water = null;
    let scene = null;
    let renderer = null;
    let con = null;
    let light = null;
    let sphere = null;
    let stats = null;
    let mesh = null;
    let geometry = null;
    let material = null;
    let clock = null;;
    let worldWidth = 200;
    let worldDepth = 128;
    
    let position = null;
    let texture = null;
    let delta = null;
    let time = null;


    useEffect(() => {
        setWindow(window);
        init();
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener("deviceorientation", handleOrientation, true);

        animate();

        return () => {
            stop();
        }
    }, []);

    function handleOrientation(event) {
        if (event) {
            event.preventDefault();
            let alpha = event.alpha; // > 180 ? event.alpha : 180;
            let beta = event.beta;
            let gamma = event.gamma;

            let ar = alpha * Math.PI / 180;
            let br = beta * Math.PI / 180;
            let gr = gamma * Math.PI / 180;

            let art = ar >= 0 ? ar : ar;
            let brt = br >= 0 ? br : br;
            let grt = gr >= 0 ? gr : gr;

            let radius = window.innerHeight / 2;

            // WITH EULER:
            let eu = new THREE.Euler(art, brt, grt);
            // let v = new THREE.Vector3(1, 1, 1); 
            // WITH quaternion:
            let quaternion = new THREE.Quaternion();
            quaternion.setFromEuler(eu);

            let v = new THREE.Vector3(1, radius, radius);
            // watching ground: 
            // let v = new THREE.Vector3(1, 1, 1); 
            v.applyQuaternion(quaternion);

            console.log('contoler', controls);
            if (alpha && beta && gamma && controls) {
                //controls.activeLook = true;
                setGamma(gamma);
                setAlpha(alpha);
                setBeta(beta);
                // setA(v.x);
                // setB(v.y);
                setG(v.z);
                controls.lookAt(v.y, v.x, v.z);
                // if (isTouched) {
                //     for (var i = 3; i < NUM_OF_BALLS + 3; i++) {
                //         scene.children[i].position.x = Math.random() * 50 - 25 + v.x + isTouched.x;
                //         scene.children[i].position.y = Math.random() * 50 - 25 + v.y + isTouched.y;
                //         scene.children[i].position.z = Math.random() * 50 - 25 + v.z;
                //     }
                // }
            }
        }
    }


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
    }


    function init() {

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        con.appendChild(renderer.domElement);

        //


        scene = new THREE.Scene();
        //
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.set(30, 30, 100);
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
                waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {
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
        uniforms['turbidity'].value = 10;
        uniforms['rayleigh'].value = 2;
        uniforms['luminance'].value = 1;
        uniforms['mieCoefficient'].value = 0.005;
        uniforms['mieDirectionalG'].value = 0.8;
        var parameters = {
            distance: 400,
            inclination: 0.49,
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

        //
        controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set(0, 10, 0);
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();

        setRadius(radius);
        setControler(controls);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function stop() {
        con.removeChild(renderer.domElement);
        cancelAnimationFrame(con);
    }

    function render() {
        var time = performance.now() * 0.001;
        if (sphere) {
            sphere.position.y = Math.sin(time) * 20 + 5;
            sphere.rotation.x = time * 0.5;
            sphere.rotation.z = time * 0.51;
        }

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
