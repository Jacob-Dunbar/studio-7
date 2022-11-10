import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className=" flex flex-col items-center">
      <p>2022 Studio 7 All rights reserved</p>
      <p className="flex gap-2">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
