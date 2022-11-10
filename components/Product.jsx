import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div className=" bg-red-50 cursor-pointer  w-40 flex justify-center">
      <Link href={`/product/${slug.current}`}>
        <div>
          <img className=" w-36" src={urlFor(image && image[0])} alt="" />
          <p>{name}</p>
          <p>£{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
