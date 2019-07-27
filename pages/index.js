import { useEffect, useState } from 'react';
import Head from 'next/head';
import ThreeScene from '../components/threeScene';

function Index() {
  const [date, setDate] = useState([]);

  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.json();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      {/* <script src="js/three.js"></script> */}
      <Head>
        <title>Next.js + Node API</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        {/* <script src="js/three.js"></script> */}
      </Head>
      <ThreeScene/>
      <p>
        <a href="/pages/api/date.js">
          <code>api/date.js</code> for the Date API with Node.js
        </a>
        .
      </p>
      <p>{date ? date.date : 'Loading date...'}</p>
      <style jsx>{`
        main {
          align-content: center;
          box-sizing: border-box;
          display: grid;
          font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
            'Helvetica', 'Arial', sans-serif;
          hyphens: auto;
          line-height: 1.65;
          margin: 0 auto;
          max-width: 680px;
          min-height: 100vh;
          padding: 72px 0;
          text-align: center;
        }
        h1 {
          font-size: 45px;
        }
        h2 {
          margin-top: 1.5em;
        }
        p {
          font-size: 16px;
        }
        a {
          border-bottom: 1px solid white;
          color: #0076ff;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        a:hover {
          border-bottom: 1px solid #0076ff;
        }
        canvas { width: 100%; height: 100% }
        code,
        pre {
          color: #d400ff;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.92em;
        }
        code:before,
        code:after {
          content: '\`';
        }
      `}</style>
    </main>
  );
}

export default Index;
