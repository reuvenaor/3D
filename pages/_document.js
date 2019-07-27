import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"></meta>
                </Head>
                <body>
                    <Main />
                    <NextScript />

                </body>
                <style global jsx>{`
 
                    body {
                        width: 100vw;
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                    }
                    `}</style>
            </Html>

        );

    }
}

export default MyDocument;