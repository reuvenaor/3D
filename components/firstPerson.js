import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import Stats from '../lib/stats.module';
// import * as THREE from '../lib/three.module';
// const Stats = require('../texture/')
import { FirstPersonControls } from '../lib/FirstPersonControls';
// import { Lensflare, LensflareElement } from '../Lib/Lensflare.js';
//import * as FirstPersonControls from 'three/examples/jsm/controls/FirstPersonControls.js';

const firstPerson = (props) => {

    const NUM_OF_BALLS = 30;
    const [win, setWindow] = useState(null);
    const [abScene, setScene] = useState(null);
    const [gammatxt, setGamma] = useState(0)
    const [alphatxt, setAlpha] = useState(0);
    const [betatxt, setBeta] = useState(0);
    const [contoler, setControler] = useState(null);
    const [radius, setRadius] = useState(null)
    const [a, setA] = useState(null);
    const [b, setB] = useState(null);
    const [g, setG] = useState(null);
    const [absolute, setAbsolue] = useState(null);
    //
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

    // container - view wrap
    let con = null;

    let position = null;
    let texture = null;
    let delta = null;
    let time = null;
    let wraper = null;
    let btnForward = null;
    let btnLeft = null;
    let btnRight = null;

    let light1 = null;
    let light2 = null;
    let light3 = null;
    let light4 = null;

    // let raycaster = null;
    let isTouched = false;


    useEffect(() => {
        setWindow(window);
        init();
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener("deviceorientation", handleOrientation, true);

        window.addEventListener('touchstart', handleTouchStart, true);
        window.addEventListener('touchend', handleTouchEnd, true)

        animate();

        // console.log(raycaster);

        console.log(controls);
        console.log('scene', scene);
        return () => {
            stop();
        }
    }, []);

    function handleTouchStart(event) {
        isTouched = true;
    };

    function handleTouchEnd(event) {
        isTouched = false;
    }

    function handleOrientation(event) {
        if (event) {
            event.preventDefault();
            let absolute = event.absolute;
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
                setAbsolue('' + absolute);
                controls.lookAt(v.y, v.x, v.z);
                if (isTouched) {
                    for (var i = 3; i < NUM_OF_BALLS + 3; i++) {
                        scene.children[i].position.x = Math.random() * 50 - 25 + v.x;
                        scene.children[i].position.y = Math.random() * 50 - 25 + v.y;
                        scene.children[i].position.z = Math.random() * 50 - 25 + v.z;
                    }
                }
            }
        }
    }

    function onRight(event) {
        event.preventDefault();
        if (contoler) {
            contoler.moveRight = true;
        }
    }

    function onRightEnd(event) {
        event.preventDefault();
        if (contoler) {
            contoler.moveRight = false;
        }
    }

    function onLeft(event) {
        event.preventDefault();
        if (contoler) {
            contoler.moveLeft = true;
        }
    }

    function onLeftEnd(event) {
        event.preventDefault();
        if (contoler) {
            contoler.moveLeft = false;
        }
    }

    function onForward(event) {
        event.preventDefault();
        if (contoler) {
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
        // raycaster = new THREE.Raycaster();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
        let radius = window.innerHeight / 2;
        setRadius(radius);
        camera.position.y = radius;    // this is RADIUS
        clock = new THREE.Clock();
        controls = new FirstPersonControls(camera);
        controls.movementSpeed = 1000;
        controls.lookSpeed = 0.1;
        controls.activeLook = false;
        setControler(controls);
        var light = new THREE.DirectionalLight(0xffffff, 1);
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xaaccff);
        scene.fog = new THREE.FogExp2(0xaaccff, 0.0006);

        // LIGHT

        var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
        light1.position.set(1, 1, 1);
        scene.add(light1);
        var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
        light2.position.set(0, - 1, 0);
        scene.add(light2);

        var sphere = new THREE.SphereBufferGeometry(5, 64, 32);

        // light1 = new THREE.PointLight( 0xff0040, 2, 50 );
        // light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
        // scene.add( light1 );
        // light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
        // light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
        // scene.add( light2 );
        // light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
        // light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
        // scene.add( light3 );
        // light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
        // light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
        // scene.add( light4 );

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

        texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water.jpg'); // .setPath('../lib/water.jpg') // https://wallpaperstream.com/wallpapers/full/nebula/Carina-Nebula-Space-Stars.jpg
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
        material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // MeshLambertMaterial box

        for (var i = 0; i < NUM_OF_BALLS; i++) {
            var object = new THREE.Mesh(sphere, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
            object.position.x = Math.random() * radius - radius;
            object.position.y = Math.random() * radius + radius;
            object.position.z = Math.random() * radius - radius;
            // object.rotation.x = Math.random() * 2 * Math.PI;
            // object.rotation.y = Math.random() * 2 * Math.PI;
            // object.rotation.z = Math.random() * 2 * Math.PI;
            // object.scale.x = Math.random() + 0.5;
            // object.scale.y = Math.random() + 0.5;
            // object.scale.z = Math.random() + 0.5;
            scene.add(object);
        }

        // RENDERS & APPENDS
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        setScene(scene);
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
        cancelAnimationFrame(wraper);
    }

    function render() {
        delta = clock.getDelta();
        time = clock.getElapsedTime() * 10;
        let position = geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            let y = 35 * Math.sin(i / 5 + (time + i) / 7);
            position.setY(i, y);
        }

        // light1.position.x = Math.sin( time * 0.7 ) * 30;
        // light1.position.y = Math.cos( time * 0.5 ) * 40;
        // light1.position.z = Math.cos( time * 0.3 ) * 30;
        // light2.position.x = Math.cos( time * 0.3 ) * 30;
        // light2.position.y = Math.sin( time * 0.5 ) * 40;
        // light2.position.z = Math.sin( time * 0.7 ) * 30;
        // light3.position.x = Math.sin( time * 0.7 ) * 30;
        // light3.position.y = Math.cos( time * 0.3 ) * 40;
        // light3.position.z = Math.sin( time * 0.5 ) * 30;
        // light4.position.x = Math.sin( time * 0.3 ) * 30;
        // light4.position.y = Math.cos( time * 0.7 ) * 40;
        // light4.position.z = Math.sin( time * 0.5 ) * 30;

        position.needsUpdate = true;
        controls.update(delta);
        renderer.render(scene, camera);
    }



    // function touchScreen(event) {
    //     event.preventDefault();
    //     if (event.touches && radius && abScene) {
    //         let x = event.touches[0].clientX;
    //         let y = event.touches[0].clientY;
    //         let touch2D = new THREE.Vector2();
    //         touch2D.x = ( x / window.innerWidth ) * 2 - 1;
    //         touch2D.y = - ( y / window.innerHeight ) * 2 + 1;
    //         setA(touch2D.x);
    //         setB(touch2D.y);
    //         for (var i = 3; i < NUM_OF_BALLS + 3; i++) {
    //             abScene.children[i].position.x = touch2D.x;
    //             abScene.children[i].position.y = touch2D.y;
    //             //abScene.children[i].position.z = -200;
    //             // scene.children[i].position.z = Math.random() * 50 - 25 + v.z;
    //         }
    //     }
    // }


    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'block'
        }}
            //onTouchStart={touchScreen}
            ref={(ref) => { wraper = ref }}
        >

            {/* <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '25%',
                width: '50%',
                height: '20%',
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
            </div> */}
            <div style={{
                position: 'absolute',
                width: 100,
                height: '10%',
                top: '50%',
                left: '50%',
                zIndex: 3
            }}>
                {/* <p >gamma: {gammatxt}</p>
                <p >alpha: {alphatxt}</p>
                <p >beta: {betatxt}</p> */}
                <p >v.x: {a}</p>
                <p >v.y: {b}</p>
                {/* <p >v.z: {g}</p>
                <p >radius: {radius}</p> */}
            </div>
            <div
                style={{ width: '100%', height: '100%' }}
                ref={(ref) => { con = ref }}
            ></div>
        </div>
    )


}
export default firstPerson;

