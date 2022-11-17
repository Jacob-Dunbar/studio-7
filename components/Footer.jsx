import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 tems-center ">
      <p className="flex gap-2">
        <AiFillInstagram className="w-8 h-8" />
        <AiOutlineTwitter className="w-8 h-8" />
      </p>
      <p>2022 Studio 7 All rights reserved</p>
    </div>
  );
};

export default Footer;
