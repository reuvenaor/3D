import { useEffect, useState } from 'react';
import ThreeScene from '../components/threeScene';
import Head from 'next/head';
import FirstPerson from '../components/firstPerson';

function Index() {

  useEffect(() => {
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
      {/* <ThreeScene /> */}
      <FirstPerson/>


      <style jsx>{`
        main {
          align-content: center;
          left: 0;
          top: 0;
          width: '100%';
          height: '100%';
          margin: 0;
          padding: 0;
          display: grid;
          // font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
          //  'Helvetica', 'Arial', sans-serif;
          // hyphens: auto;
          // line-height: 1.65;
          // margin: 0 auto;

          // max-width: 90%;
          // min-height: 90%;
          // padding: 72px 0;
          // text-align: center;
        }
        body {
          width: '100%';
          height: '100%';
        }
        p {
          font-size: 16px;
        }
      `}</style>
    </main>
  );
}

export default Index;
