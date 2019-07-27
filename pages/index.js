import { useEffect, useState } from 'react';
import Head from 'next/head';
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
      <Head>
        <title>Next.js + Node API</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"></meta>
      </Head>
      <ThreeScene/>
      <style jsx>{`
        main {
          // align-content: center;
          // box-sizing: border-box;
          width: 100vw;
          height: 100vh;
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
