import React from 'react';
import App from 'next/app';
import withReduxStore from '../store/with-redux-store';
import { Provider } from 'react-redux';
import { Head } from 'next/document';


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </>

    );
  }
}

export default withReduxStore(MyApp);