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
                <link rel="icon" href="/img/true-press-logo-1.png"></link>
            <title>True Press</title>
        </Head>
        <Component {...pageProps} />
    </>) }

export default _App