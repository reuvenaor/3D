import { useEffect, useState } from 'react';
import Head from 'next/head';
import React from 'react';
import Parashooter from '../static/parashooter';
import Flamingos from '../static/flamingos';
import Landscape from '../static/landscape';
import BackOne from '../static/back1';
import WaterHoraizon from '../components/waterHoraizon';

function Index() {

  // const cameraProspectiveY = 120;
  // const [win, setWindow] = useState(null);
  // const [scale, setScale] = useState(null);
  // const [isLandscape, setLandscape] = useState(false);
  // const [loader, setLoader] = useState(false);
  // const [activeView, setActiveView] = useState(false);

  // function fullScreen() {
  //   let isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method  
  //     (document.mozFullScreen || document.webkitIsFullScreen);
  //   let docElm = document.documentElement;
  //   if (!isInFullScreen) {
  //     if (docElm.requestFullscreen) {
  //       docElm.requestFullscreen();
  //     }
  //     else if (docElm.mozRequestFullScreen) {
  //       docElm.mozRequestFullScreen();
  //       alert("Mozilla entering fullscreen!");
  //     }
  //     else if (docElm.webkitRequestFullScreen) {
  //       docElm.webkitRequestFullScreen();
  //       alert("Webkit entering fullscreen!");
  //     }
  //   }
  // }

  // useEffect(() => {
  //   setLoader(true);
  //   setWindow(window);
  //   let scale = window.screen.availWidth / window.screen.availHeight;
  //   setScale(scale);
  //   if (scale < 1) {
  //     setLandscape(false);
  //   } else {
  //     setLandscape(true);
  //   }
  //   const timer = setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);


  //console.log('window.height',window.screen.availHeight, window.screen.availWidth);
  // WORK WITH API - date.js
  // async function getDate() {
  //   const res = await fetch('/api/date');
  //   const newDate = await res.json();
  //   setDate(newDate);
  // }
  // getDate();
  // }, []);

  // function onActiveView() {
  //   fullScreen();
  //   setActiveView(!activeView);
  // }

  return (
    <main>
      <Head>
        <title>Reuven 3D</title>
      </Head>
      <>
        <h1 style={{ position: 'absolute', color: 'black', left: 50, top: 50, zIndex: 10 }}>
          {'Coming soon..'}
        </h1>
        <WaterHoraizon />
      </>




      <style jsx>{`
      * {
        text-align: center
      }
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
      }
        
      `}</style>
    </main>
  );
}

export default Index;
