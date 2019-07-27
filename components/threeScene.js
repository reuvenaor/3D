import React, { useEffect } from 'react';
import * as THREE from 'three';
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
// import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from '../lib/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from '../lib/CSS3DRenderer';
import { TrackballControls } from '../lib/TrackballControls';

const Element = function (id, x, y, z, ry) {
  var div = document.createElement('div');
  div.style.width = '480px';
  div.style.height = '360px';
  //div.style.backgroundColor = '#000';
  var iframe = document.createElement('iframe');
  iframe.style.width = '480px';
  iframe.style.height = '360px';
  iframe.style.border = '0px';
  iframe.src = ['https://www.youtube.com/embed/', id, '?rel=0'].join('');
  div.appendChild(iframe);
  var object = new CSS3DObject(div);
  object.position.set(x, y, z);
  object.rotation.y = ry;
  return object;
};

const ThreeScene = (props) => {

  let mounted = null;
  let scene = null;
  let camera = null;
  let renderer = null;
  let cube = null;
  let frameId = null;

  let container = null;
  let blocker = null;
  let controls = null;
  let group = null;

 

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    createAnim();
    animate();
    return () => {
      stop();
      document.removeChild(renderer.domElement);
      window.removeEventListener('scroll', handleScroll);
      //blocker.removeChild(renderer.domElement);
    }
  }, [])

  function handleScroll(e) {
    //const h = window.pageYOffset - (window.screen.availHeight + window.screen.height);
    const h = window.pageYOffset;
    console.log(h);
    if (h <= 240) {
      group.children[0].position.x = `-${h}`;
      group.children[1].position.y = `-${h}`;
      group.children[2].position.x = `${h}`;
      group.children[3].position.y = `${h}`;
      camera.position.set(h, 350, 1000)
    } else {
      //camera.position.set(h, h + 110, h + 760)
      //camera.position.set(h, 350, 100)
      camera.position.setX(h * 3.14)
    }
    // group.children.position.x = '22px';
    // scene.add(group);
    // animate()
  };


  function createAnim() {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(500, 350, 1000);
    camera.isPerspectiveCamera = true;   // ADDED
    scene = new THREE.Scene();
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    group = new THREE.Group();
    group.add(new Element('xoW477XDiY4', 0, 0, 240, 0));
    group.add(new Element('OBcilRnQPA4', 240, 0, 0, Math.PI / 2));
    group.add(new Element('rQJc49WdhNo', 0, 0, - 240, Math.PI));
    group.add(new Element('3gVqpuPLNUs', - 240, 0, 0, - Math.PI / 2));
    scene.add(group);
    console.log('group',group);
    controls = new TrackballControls(camera, renderer.domElement);
    // controls.rotateSpeed = 1;
    controls.noZoom = true;          // ADDED
    controls.noRotate = true;         // ADDED
    //controls.staticMoving = true;   // ADDED
    //window.addEventListener('resize', onWindowResize, false);

    // blocker.style.display = 'none';
    // controls.addEventListener('start', function () {
    //   blocker.style.display = '';
    // });
    // controls.addEventListener('end', function () {
    //   blocker.style.display = 'none';
    // });
  }



  // function onWindowResize() {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  function animate() {
    if (container) {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
  }
  function stop() {
    cancelAnimationFrame(container);
    //cancelAnimationFrame(blocker);
  }

  console.log('renderrrrrrrrrrrrrr');
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'fixed', background: 'black'}}
    >
      <div
        style={{ width: '100%', height: '100%'}}
        ref={(ref) => { container = ref }}
      ></div>
      {/* <div
        style={{ width: '100%', height: '100%' }}
        ref={(ref) => { blocker = ref }}
      ></div> */}
    </div>

  )
}
export default ThreeScene;



///////////// BEGIN //////////////////
// import React, { Component } from 'react';
// import * as THREE from 'three';


// class ThreeScene extends Component {

//   componentDidMount() {
//     const width = this.mount.clientWidth
//     const height = this.mount.clientHeight
//     //ADD SCENE
//     this.scene = new THREE.Scene()
//     //ADD CAMERA
//     this.camera = new THREE.PerspectiveCamera(
//       75,
//       width / height,
//       0.1,
//       1000
//     )
//     this.camera.position.z = 4
//     //ADD RENDERER
//     this.renderer = new THREE.WebGLRenderer({ antialias: true })
//     this.renderer.setClearColor('#000000')
//     this.renderer.setSize(width, height)
//     this.mount.appendChild(this.renderer.domElement)
//     //ADD CUBE
//     const geometry = new THREE.BoxGeometry(1, 1, 1)
//     const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
//     this.cube = new THREE.Mesh(geometry, material)
//     this.scene.add(this.cube)
//     this.start()
//   }

//   componentWillUnmount() {
//     this.stop()
//     this.mount.removeChild(this.renderer.domElement)
//   }
//   start = () => {
//     if (!this.frameId) {
//       this.frameId = requestAnimationFrame(this.animate)
//     }
//   }
//   stop = () => {
//     cancelAnimationFrame(this.frameId)
//   }
//   animate = () => {
//     this.cube.rotation.x += 0.01
//     this.cube.rotation.y += 0.01
//     this.renderScene()
//     this.frameId = window.requestAnimationFrame(this.animate)
//   }
//   renderScene = () => {
//     this.renderer.render(this.scene, this.camera)
//   }
//   render() {
//     return (
//       <div
//         style={{ width: '400px', height: '400px' }}
//         ref={(mount) => { this.mount = mount }}
//       />
//     )
//   }
// }
// export default ThreeScene

