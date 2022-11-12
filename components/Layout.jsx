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
      <div className="flex flex-col min-h-screen">
        <header className="z-30">
          <Navbar />
        </header>
        <main className="flex-grow bg-green-200 ">{children}</main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
