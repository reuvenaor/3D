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

function Index() {

  const cameraProspectiveY = 120;
  const [win, setWindow] = useState(null);
  const [scale, setScale] = useState(null);
  const [isLandscape, setLandscape] = useState(null);

  useEffect(() => {
    setWindow(window);
    let scale = window.screen.availWidth / window.screen.availHeight;
    setScale(scale);
    if (scale < 1) {
      setLandscape(false);
    } else {
      setLandscape(true);
    }
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
    <main>
      <Head>
        <title>Reuven 3D</title>
      </Head>

      <React.Fragment>

        <Parallax pages={4} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* 
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: 'black', opacity: 0.5 }} >

          </div> */}

          <ParallaxLayer offset={3} speed={0} factor={1}>
            {!isLandscape && win ?
              <div style={{ transform: `translateY(${(1 - scale) * win.innerHeight * 0.6}px)` }} >
                <BackOne />
              </div>
              : <BackOne />}
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={2} factor={1} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw' }}>
            <Flamingos />
          </ParallaxLayer>

          <ParallaxLayer offset={1.7} speed={5} >
            <Flamingos />
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={3} factor={0} style={{ height: '100vh', maxHeight: '100vh', minHeight: '100vh' }}>
            {!isLandscape && win ?
              <div style={{ transform: `translateY(${(1 - scale) * win.innerHeight * 0.7}px)` }} >
                <Landscape />
              </div>
              : <Landscape />}
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={5} >
            <h1 style={{ position: 'absolute', color: 'black', top: 30, left: 30 }}>
              {'Hi,'}
            </h1>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={-5} style={{ opacity: 1 }}>
            <h3 style={{ position: 'absolute', color: 'black', top: 30, left: 30 }}>
              {'Reuven Naor Full-stack Developer'}
            </h3>
          </ParallaxLayer>

          <ParallaxLayer offset={3.1} speed={-10} style={{ opacity: 1 }}>
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
          //height: '100vh';
          margin: 0;
          padding: 0;
          overflow: hidden;
          //display: grid;
          font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
           'Helvetica', 'Arial', sans-serif;
          // hyphens: auto;
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
