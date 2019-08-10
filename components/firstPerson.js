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
        let x = event.touches[0].clientX;
        let y = event.touches[0].clientY;
        let touch2D = new THREE.Vector2();
        touch2D.x = (x / window.innerWidth) * 2 - 1;
        touch2D.y = - (y / window.innerHeight) * 2 + 1;
        // touch2D.x = x;
        // touch2D.y = - y;
        setA(touch2D.x);
        setB(touch2D.y);

        isTouched = touch2D;
    };

    function handleTouchEnd(event) {
        isTouched = false;
        //setIsTouch(false);
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
        camera = new THREE.PerspectiveCamera(props.cameraProspectiveY, window.innerWidth / window.innerHeight, 1, 2000);
        let radius = window.innerHeight / 2;
        setRadius(radius);
        camera.position.y = radius;    // this is RADIUS
        clock = new THREE.Clock();
        controls = new FirstPersonControls(camera);
        controls.movementSpeed = 1000;
        controls.lookSpeed = 0.1;
        controls.activeLook = false;
        setControler(controls);
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xEEEEEE);
        scene.fog = new THREE.FogExp2(0x05053D, 0.0008);

        // var sphere = new THREE.SphereBufferGeometry(3, 32, 16);

        addLights();

        //WAVES VIEW
        geometry = new THREE.PlaneBufferGeometry(10000, 10000, worldWidth - 1, worldDepth - 1);
        geometry.rotateX(- Math.PI / 2);
        // WAVES MOVES AND TEXTURE
        position = geometry.attributes.position;
        position.dynamic = true;
        for (let i = 0; i < position.count; i++) {
            let y = Math.sin(i / 2);
            position.setY(i, y);
        }

        texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/water.jpg'); // .load(../static/img.jpg)
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set(5, 5);
        material = new THREE.MeshToonMaterial({ color: 0x8888EE, map: texture });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // MeshLambertMaterial box

        // for (var i = 0; i < NUM_OF_BALLS; i++) {
        //     var object = new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({color: '0xFFFFFF'}));
        //     object.receiveShadow = true;
        //     object.position.x = Math.random() * radius - radius;
        //     object.position.y = Math.random() * radius + radius;
        //     object.position.z = Math.random() * radius - radius;
        //     //object.rotation.x = Math.random() * -1000 * Math.PI /2;
        //     object.rotation.z = Math.random() * 1000 * Math.PI;
        //     scene.add(object);
        // }

        // RENDERS & APPENDS
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        setScene(scene);
        //stats = new Stats();
        //con.appendChild(stats.dom);
        con.appendChild(renderer.domElement);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        //stats.update();
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
            let y = 30 * Math.sin(i / 5 + (time + i) / 7);
            position.setY(i, y);
        }

        // for (var i = 3; i < NUM_OF_BALLS + 3; i++) {
        //     scene.children[i].position.x += 0.05;
        //     scene.children[i].position.y -= 0.1;
        //     scene.children[i].position.z -= 0.1;
        //     scene.children[i].rotation.x += Math.random() * 10 * Math.PI;
        //     scene.children[i].rotation.z += Math.random() * 10 * Math.PI;
        // }

        position.needsUpdate = true;
        controls.update(delta);
        renderer.render(scene, camera);
    }

    function addLights() {
        var light1 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        light1.position.set(1, 1, 1);
        scene.add(light1);
        var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.5);
        light2.position.set(0, - 1, 0);
        scene.add(light2);
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
            width: '100vw',
            height: '100vh',
            display: 'block',
            //position: 'fixed',
            margin: 0,
            overflow: 'hidden'
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
            <div
                style={{ width: '100%', height: '100%', margin: 0 }}
                ref={(ref) => { con = ref }}
            ></div>
        </div>
    )


}
export default firstPerson;

