import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col ">
      <Head>
        <title>Studio 7</title>
      </Head>
      <div className="min-h-screen ">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow ">{children}</main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
