import React from "react";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

interface layoutprops {
  title?: string;
}

const Layout: React.FC<layoutprops> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? title : "AMMAR"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Announcement />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
