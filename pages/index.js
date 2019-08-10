import { useEffect, useState } from 'react';
// import ThreeScene from '../components/threeScene';
import Head from 'next/head';
import React from 'react';
import FirstPerson from '../components/firstPerson';
import { config } from 'react-spring';
import { Parallax, ParallaxLayer } from '../node_modules/react-spring/renderprops-addons.js';
import { Spring } from '../node_modules/react-spring/renderprops';
import Parashooter from '../static/parashooter';
import Flamingos from '../static/flamingos';
import Landscape from '../static/landscape';
import BackOne from '../static/back1';
import { setTimeout } from 'timers';

function Index() {

  const cameraProspectiveY = 120;
  const [win, setWindow] = useState(null);
  const [scale, setScale] = useState(null);
  const [isLandscape, setLandscape] = useState(false);
  const [loader, setLoader] = useState(false);

  function fullScreen() {
    let isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method  
      (document.mozFullScreen || document.webkitIsFullScreen);
    let docElm = document.documentElement;
    if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
        alert("Mozilla entering fullscreen!");
      }
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
        alert("Webkit entering fullscreen!");
      }
    }
  }

  useEffect(() => {
    setLoader(true);
    setWindow(window);
    let scale = window.screen.availWidth / window.screen.availHeight;
    setScale(scale);
    if (scale < 1) {
      setLandscape(false);
    } else {
      setLandscape(true);
    }
    const timer = setTimeout(() => {
      setLoader(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    }
    //fullScreen();
    //console.log('window.height',window.screen.availHeight, window.screen.availWidth);
    // WORK WITH API - date.js
    // async function getDate() {
    //   const res = await fetch('/api/date');
    //   const newDate = await res.json();
    //   setDate(newDate);
    // }
    // getDate();
  }, []);

  return (
    <main onClick={fullScreen}>
      <Head>
        <title>Reuven 3D</title>
      </Head>

      <React.Fragment>
        {loader ? <div style={{ width: '100vw', height: '100vw', position: 'absolute', margin: 0, top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', zIndex: 2 }}>
          <Spring
            from={{ number: 10 }}
            to={{ number: 101 }}>
            {props => <center><h2>{props.number}</h2></center>}
          </Spring>
        </div> : null}
        <Parallax pages={4} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

          <ParallaxLayer offset={3} speed={0} >
            {!isLandscape && win ?
              <div style={{ transform: `translateY(${(1 - scale) * win.innerHeight * 0.8}px)` }} >
                <BackOne />
              </div>
              : <BackOne />}
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={2} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw' }}>
            <Flamingos />
          </ParallaxLayer>

          <ParallaxLayer offset={1.7} speed={4} >
            <Flamingos />
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={3} style={{ height: '100vh', maxHeight: '100vh', minHeight: '100vh' }}>
            {!isLandscape && win ?
              <div style={{ transform: `translateY(${(1 - scale) * win.innerHeight * 0.8}px)` }} >
                <Landscape />
              </div>
              : <Landscape />}
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={5} >
            <h1 style={{ position: 'absolute', color: 'black', top: 30, left: 30 }}>
              {'Hi,'}
            </h1>
          </ParallaxLayer>

          <ParallaxLayer offset={3.1} speed={-2} style={{ opacity: 1 }}>
            <h3 style={{ position: 'absolute', color: 'black', top: 30, left: 30 }}>
              {'Reuven Naor Full-stack Developer'}
            </h3>
          </ParallaxLayer>

          <ParallaxLayer offset={3.2} speed={-3} style={{ opacity: 1 }}>
            <p style={{ position: 'absolute', color: 'black', top: 30, left: 30 }}>
              {'Images by Gordon Johnson from Pixabay'}
            </p>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0.5} factor={2} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw' }}>
            <Parashooter />
          </ParallaxLayer>


        </Parallax>

        <FirstPerson cameraProspectiveY={cameraProspectiveY} />

      </React.Fragment>


      <style jsx>{`
          ::-webkit-scrollbar {
            display: none;
        }
        main {
          align-content: center;
          left: 0;
          top: 0;
          width: '100vw';
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
           'Helvetica', 'Arial', sans-serif;
          text-align: center;
          align-items: center;
        }
        p {
          font-size: 16px;
        }
      `}</style>
    </main>
  );
}

export default Index;
