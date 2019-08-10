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
import Silhouette from '../static/silhouette';
import Landscape from '../static/landscape';
import BackOne from '../static/back1';
import BackTwo from '../static/back2';



function Index() {

  const cameraProspectiveY = 120;
  const [win, setWindow] = useState(null);
  const [scale, setScale] = useState(null);
  const [isLandscape, setLandscape] = useState(null);

  let parallax;
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

        <Parallax ref={ref => (parallax = ref)} pages={4} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw', alignItems: 'center', justifyContent: 'center' }}>
          {/* <ParallaxLayer offset={0} speed={-1} style={{ backgroundColor: '#11BCDE' }} />
        <ParallaxLayer offset={0} speed={-6} style={{ backgroundColor: '#FFBCDE' }} />
        <ParallaxLayer offset={0} speed={1} style={{ backgroundColor: '#11BCDE' }} />
        <ParallaxLayer offset={1} speed={6} style={{ backgroundColor: '#FFBCDE' }} />
        <ParallaxLayer offset={3} speed={0} style={{ backgroundColor: '#FFBCDE' }} />

        <ParallaxLayer speed={6} style={{ backgroundColor: '#0000EE', opacity: 0.2 }} /> */}

          {/* <ParallaxLayer offset={0} speed={0} factor={4}>
         
        </ParallaxLayer> */}

          <ParallaxLayer offset={0} speed={0} style={{ opacity: 0.4, margin: 0 }} >
            <FirstPerson cameraProspectiveY={cameraProspectiveY}/>
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0} style={{ opacity: 0.4, margin: 0 }} >
            <FirstPerson cameraProspectiveY={-cameraProspectiveY}/>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={0} style={{ opacity: 0.4, margin: 0 }} >
            <FirstPerson cameraProspectiveY={cameraProspectiveY}/>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0} style={{ opacity: 0.4, margin: 0 }} >
            <FirstPerson cameraProspectiveY={-cameraProspectiveY}/>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0} factor={1}>
          {!isLandscape && win ?
              <div style={{ transform: `translateY(${(1 - scale) * win.innerHeight * 0.7}px)` }} >
                <BackOne />
              </div>
              : <BackOne />}
            
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={2} factor={1} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw'}}>
            <Flamingos />
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={2} >
            <Flamingos />
          </ParallaxLayer>

          <ParallaxLayer offset={0} speed={3} factor={0} style={{ height: '100vh', maxHeight: '100vh', minHeight: '100vh' }}>
            {!isLandscape && win ?
              <div style={{ transform: `translateY(${(1 - scale) * win.innerHeight * 0.7}px)` }} >
                <Landscape />
              </div>
              : <Landscape />}
            <h1 style={{ position: 'absolute', color: 'white', top: 50, left: 50 }}>
              {'Hi,'}
            </h1>
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={-5} style={{ opacity: 1 }}>
            <h4 style={{ position: 'absolute', color: 'white', bottom: 20, left: 20 }}>
              {'Reuven Naor Full-stack Developer'}
            </h4>
          </ParallaxLayer>

          <ParallaxLayer offset={2} speed={1} factor={2} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw' }}>
            <Parashooter />
          </ParallaxLayer>




          {/* <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={-0.4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <img src={url('earth')} style={{ width: '60%' }} />
        </ParallaxLayer> */}


        </Parallax>
        {/* <div style={{ width: '100vw', height: '100vh', margin: 0, maxWidth: '100vw', minWidth: '100vw' }}>
         
        </div> */}

      </React.Fragment>



      <style jsx>{`
        main {
          align-content: center;
          left: 0;
          top: 0;
          width: '100vw';
          //height: '100vh';
          margin: 0;
          padding: 0;
          //display: grid;
          // font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
          //  'Helvetica', 'Arial', sans-serif;
          // hyphens: auto;
          // line-height: 1.65;
          // margin: 0 auto;

          // max-width: 90%;
          // min-height: 90%;
          // padding: 72px 0;
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
