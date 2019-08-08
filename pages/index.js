import { useEffect, useState } from 'react';
// import ThreeScene from '../components/threeScene';
import Head from 'next/head';
import FirstPerson from '../components/firstPerson';
import { config } from 'react-spring';
import { Parallax, ParallaxLayer } from '../node_modules/react-spring/renderprops-addons.js'
import { Spring } from '../node_modules/react-spring/renderprops'
import BackOne from '../static/back1';
import BackTwo from '../static/back2';

function Index() {

  const [win, setWindow] = useState(null);

  let parallax;
  useEffect(() => {
    setWindow(window);
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
      <Parallax ref={ref => (parallax = ref)} pages={2} style={{ width: '100vw', maxWidth: '100vw', minWidth: '100vw' }}>
        {/* <ParallaxLayer offset={1} speed={7} style={{ backgroundColor: '#805EFF' }} >
          <BackTwo />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={7} style={{ backgroundColor: '#87BCDE' }} >
          <BackOne />
        </ParallaxLayer> */}


        {win ? <ParallaxLayer
          offset={0}
          speed={2}
          //factor={3}
          style={{ width: '100vw' }}  >
          <BackOne width={win.screen.availWidth} height={win.screen.availHeight} />
        </ParallaxLayer> : null}
        {win ? <ParallaxLayer
          offset={0}
          speed={4}
          //factor={1}
          style={{ pointerEvents: 'none', width: '100vw' }}>
          <BackTwo width={win.screen.availWidth} height={win.screen.availHeight} />
        </ParallaxLayer>
          : null}
        {win ? <ParallaxLayer
          //offset={1}
          speed={2}
          //factor={1}
          style={{ pointerEvents: 'none', width: '100vw' }}>
          <BackTwo width={win.screen.availWidth} height={win.screen.availHeight} />
        </ParallaxLayer>
          : null}

        {/* <ParallaxLayer offset={1} speed={6} style={{ opacity: 0.1 }}>
          <BackOne />
        </ParallaxLayer>

         <ParallaxLayer offset={1.75} speed={4} style={{ opacity: 0.1 }}>
          <BackTwo />
        </ParallaxLayer>


        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <BackOne />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <BackOne />
        </ParallaxLayer> 

        <ParallaxLayer offset={2.6} speed={-0.4} style={{ opacity: 0.6 }}>
          <BackTwo />
        </ParallaxLayer> */}

        {/* <ParallaxLayer offset={2.4} speed={-0.5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <BackOne />
        </ParallaxLayer> */}

      </Parallax>


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
