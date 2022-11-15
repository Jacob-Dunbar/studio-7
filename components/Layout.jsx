import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";

const Layout = ({ children }) => {
  const { showCart, showMenu } = useStateContext();
  return (
    <div className={`flex flex-col ${showMenu && "   touch-none"}`}>
      <Head>
        <title>Studio 7</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="z-30">
          <Navbar />
        </header>
        <main className="flex-grow h-5/6 ">{children}</main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
