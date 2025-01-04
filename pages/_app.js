// pages/_app.js
import '../styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <div id="root">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;