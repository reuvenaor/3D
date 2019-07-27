import React, { useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = (props) => {

  let mounted = null;
  let scene = null;
  let camera = null;
  let renderer = null;
  let cube  = null;
  let frameId = null;

  useEffect(()=> {
    const width = mounted.clientWidth
    const height = mounted.clientHeight
    //ADD SCENE
    scene = new THREE.Scene();
    //ADD CAMERA
    camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.position.z = 4
    //ADD RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);
    mounted.appendChild(renderer.domElement);
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube)
    start();
    return () => {
      stop();
      mounted.removeChild(renderer.domElement);
    }
  }, [])

  const start = () => {
    if (!frameId) {
      frameId = requestAnimationFrame(animate);
    }
  }
  const stop = () => {
    cancelAnimationFrame(frameId);
  }
  const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderScene();
    frameId = window.requestAnimationFrame(animate);
  }
  const renderScene = () => {
    renderer.render(scene, camera);
  }

    return (
      <div
        style={{ width: '100%', height: '100%'}}
        ref={(mount) => { mounted = mount }}
      />
    )
}
export default ThreeScene;

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

