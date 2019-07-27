import { useEffect, useState } from 'react';
import ThreeScene from '../components/threeScene';

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
      <ThreeScene/>
      <style jsx>{`
        main {
          // align-content: center;
          // box-sizing: border-box;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
          // display: grid;
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
        p {
          font-size: 16px;
        }
      `}</style>
    </main>
  );
}

export default Index;
