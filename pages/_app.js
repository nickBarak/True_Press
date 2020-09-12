/* Universal styles */
import '../styles/index.css';
import Head from 'next/head';

function _App({ Component, pageProps }) {
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <script
                src="https://kit.fontawesome.com/7cab195da1.js"
                crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
                rel="stylesheet" />
                {/* <link rel="icon" href="https://i1.wp.com/dailynexus.com/wp-content/uploads/2015/10/cropped-new-logo.png?fit=32%2C32&amp;ssl=1" sizes="32x32"></link> */}
                {/* <link rel="icon" href="https://i1.wp.com/dailynexus.com/wp-content/uploads/2015/10/cropped-new-logo.png?fit=192%2C192&amp;ssl=1" sizes="192x192"></link> */}
                {/* <link rel="apple-touch-icon" href="https://i1.wp.com/dailynexus.com/wp-content/uploads/2015/10/cropped-new-logo.png?fit=180%2C180&amp;ssl=1"></link> */}
                <link rel="icon" href="/img/nexus-logo.png"></link>
            <title>Mock Nexus</title>
        </Head>
        <Component {...pageProps} />
    </>) }

export default _App