import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import Stats from '../lib/stats.module';
// import * as THREE from '../lib/three.module';
// const Stats = require('../texture/')
import { FirstPersonControls } from '../lib/FirstPersonControls';
//import * as FirstPersonControls from 'three/examples/jsm/controls/FirstPersonControls.js';

const firstPerson = (props) => {

    const [win, setWindow] = useState(null);
    const [gammatxt, setGamma] = useState(0)
    const [alphatxt, setAlpha] = useState(0);
    const [betatxt, setBeta] = useState(0);
    const [contoler, setControler] = useState(null);
    const [radius, setRadius] = useState(null)
    const [a, setA] = useState(null);
    const [b, setB] = useState(null);
    const [g, setG] = useState(null);
    const [absolute, setAbsolue] = useState(null);

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
    let wraper = null;
    let btnForward = null;
    let btnLeft = null;
    let btnRight = null;


    useEffect(() => {
        setWindow(window);
        init();
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener("deviceorientation", handleOrientation, true);
        // if (contoler) {
        //     btnForward.addEventListener('touchstart', handleTouchStart, true);
        //     btnForward.addEventListener('touchend', handleTouchEnd, true)
        // }

        animate();
        console.log(camera);
        console.log(controls);
        return () => {

        }
    }, []);

    function handleOrientation(event) {
        if (event) {
            let absolute = event.absolute;
            let alpha = event.alpha; // > 180 ? event.alpha : 180;
            let beta = event.beta;
            let gamma = event.gamma;

            let ar = alpha * Math.PI / 180;
            let br = beta * Math.PI / 180;
            let gr = gamma * Math.PI / 180;

            let radius = window.innerHeight / 2;

            var eu = new THREE.Euler(ar, br, gr);
            var v = new THREE.Vector3(1, 1, 1); // CHECK:  var v = new THREE.Vector3(1, radius, 1);
            v.applyEuler(eu);
            console.log('eu', eu);
            console.log('radius', radius);

            console.log('contoler', controls);
            if (alpha && beta && gamma && controls) {
                //controls.activeLook = true;
                setGamma(gamma);
                setAlpha(alpha);
                setBeta(beta);
                setA(v.x);
                setB(v.y);
                setG(v.z);
                setAbsolue('' + absolute);
                controls.lookAt(v.x, v.y + radius, v.z);  // controls.lookAt(v.x, v.y, v.z);
            }
        }
    }

    function onRight() {
        if (contoler) {
            contoler.moveRight = true;
        }
    }

    function onRightEnd(event) {
        if (contoler) {
            contoler.moveRight = false;
        }
    }

    function onLeft(event) {
        if (contoler) {
            contoler.moveLeft = true;
        }
    }

    function onLeftEnd(event) {
        if (contoler) {
            contoler.moveLeft = false;
        }
    }

    function onForward(event) {
        console.log(event);
        if (contoler) {
            //contoler.moveLeft = true;
            contoler.moveForward = true;
        }
    }

    function onForwardEnd(event) {
        if (contoler) {
            //contoler.moveLeft = false;
            contoler.moveForward = false;
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        controls.handleResize();
    }

    function init() {
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
        let radius = window.innerHeight / 2;
        setRadius(radius);
        camera.position.y = radius;    // this is RADIUS
        clock = new THREE.Clock();
        controls = new FirstPersonControls(camera);
        controls.movementSpeed = 1000;
        //controls.lookAt(1, 1, 1);
        controls.lookSpeed = 0.1;
        controls.activeLook = false;
        setControler(controls);
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xaaccff);
        scene.fog = new THREE.FogExp2(0xaaccff, 0.0006);
        //WAVES VIEW
        geometry = new THREE.PlaneBufferGeometry(20000, 20000, worldWidth - 1, worldDepth - 1);
        geometry.rotateX(- Math.PI / 2);
        // WAVES MOVES AND TEXTURE
        position = geometry.attributes.position;
        position.dynamic = true;
        for (let i = 0; i < position.count; i++) {
            let y = Math.sin(i / 2);
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

        console.log(window.innerWidth);

        stats = new Stats();
        con.appendChild(stats.dom);
        con.appendChild(renderer.domElement);
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


    //handleTouch();


    return (
        <div style={{
            width: '100%',
            height: '100%',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center'
        }}
            //alphaZ={alphaZ}
            ref={(ref) => { wraper = ref }}
        >

            {/* {win ? <div style={{
                position: 'absolute',
                bottom: win.innerHeight / 5,
                left: win.innerWidth / 4,
                width: win.innerWidth / 2,
                height: win.innerHeight / 5,
                display: 'flex',
                background: 'grey',
                alignItems: 'center',
                justifyContent: 'space-around', //space-between
                zIndex: 1
            }}>
                <span
                    style={{
                        width: '32%',
                        height: '30%',
                        background: 'green',
                    }}
                    onTouchStart={onLeft} // onTouchMove
                    onTouchEnd={onLeftEnd}
                    onMouseDown={onLeft}
                    onMouseUp={onLeftEnd}
                    ref={(ref) => { btnLeft = ref }}
                ></span>
                <span style={{
                    width: '32%',
                    height: '30%',
                    background: 'green',
                    zIndex: 2,
                    overflow: 'hidden'
                }}
                    ref={(ref) => { btnForward = ref }}
                    onTouchStart={onForward}
                    onTouchEnd={onForwardEnd}
                    onMouseDown={onForward}
                    onMouseUp={onForwardEnd}
                ></span>
                <span style={{
                    width: '32%',
                    height: '30%',
                    background: 'green',
                }}
                    ref={(ref) => { btnRight = ref }}
                    onTouchStart={onRight}
                    onTouchEnd={onRightEnd}
                    onMouseDown={onRight}
                    onMouseUp={onRightEnd}
                ></span>
            </div> : null} */}
            {win && gammatxt ? <div style={{
                position: 'absolute',
                width: 100,
                height: 220,
                top: win.innerHeight * 0.5,
                left: win.innerWidth * 0.5,
                zIndex: 3
            }}>
                <p >gamma: {gammatxt}</p>
                <p >alpha: {alphatxt}</p>
                <p >beta: {betatxt}</p>
                <p >v.x: {a}</p>
                <p >v.y: {b}</p>
                <p >v.z: {g}</p>
                <p >radius: {radius}</p>
            </div> : null}
            <div
                style={{ width: '100%', height: '100%' }}
                ref={(ref) => { con = ref }}
            ></div>
        </div>
    )


}
export default firstPerson;

