import "@material-tailwind/react/tailwind.css";
import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import {Provider as AuthProvider} from "next-auth/client";
import "../styles.css";

function MyApp({Component, pageProps }) {
  return (
      <>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head> 

        <AuthProvider session={pageProps.session}>
        <Component {...pageProps} />
        </AuthProvider>
        
      </>
    
    )
}

export default MyApp
