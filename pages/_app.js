import "../styles/globals.css";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@auth0/nextjs-auth0";

import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </UserProvider>
  );
}

export default MyApp;
