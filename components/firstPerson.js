import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import Stats from '../lib/stats.module';
// import * as THREE from '../lib/three.module';
// const Stats = require('../texture/')
import { FirstPersonControls } from '../lib/FirstPersonControls';
//import * as FirstPersonControls from 'three/examples/jsm/controls/FirstPersonControls.js';

const firstPerson = (props) => {

    let camera = null;
    let controls = null;;
    let scene = null;;
    let renderer = null;;
    let stats = null;;
    let mesh = null;;
    let geometry = null;;
    let material = null;;
    let clock = null;;
    let worldWidth = 200;
    let worldDepth = 128;
    let con = null;
    let position = null;
    let texture = null;
    let delta = null;
    let time = null;


    useEffect(() => {
        init();
        animate();
        return () => {

        }
    }, [])

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
    }

    function init() {
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.y = 200;
        clock = new THREE.Clock();
        controls = new FirstPersonControls(camera);
        controls.movementSpeed = 2000;
        controls.lookSpeed = 0.2;
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xaaccff);
        scene.fog = new THREE.FogExp2(0xaaccff, 0.0006);
        geometry = new THREE.PlaneBufferGeometry(20000, 20000, worldWidth - 1, worldDepth - 1);
        geometry.rotateX(- Math.PI / 2);
        position = geometry.attributes.position;
        position.dynamic = true;
        for (let i = 0; i < position.count; i++) {
            let y =  Math.sin(i / 2);
            position.setY(i, y);
        }
        texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water.jpg'); // .setPath('../lib/water.jpg')
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
        material = new THREE.MeshBasicMaterial({ color: 0x0044dd, map: texture });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        con.appendChild(renderer.domElement);
        stats = new Stats();
        con.appendChild(stats.dom);
        //document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    function stop() {
        con.removeChild(renderer.domElement);
        cancelAnimationFrame(con);
    }

    function render() {
        delta = clock.getDelta();
        time = clock.getElapsedTime() * 10;
        let position = geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            let y = 35 * Math.sin(i / 5 + (time + i) / 7);
            position.setY(i, y);
        }
        position.needsUpdate = true;
        controls.update(delta);
        renderer.render(scene, camera);
    }

    console.log('renderrrrrrrrrrrrrr');

    return (
            <div
                style={{ width: '100%', height: '100%' }}
                ref={(ref) => { con = ref }}
            ></div>
    )


}
export default firstPerson;

