import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price, catagories } }) => {
  return (
    <div className="flex justify-center w-40 cursor-pointer  bg-red-50">
      <Link href={`/product/${slug.current}`}>
        <div>
          <img className=" w-36" src={urlFor(image && image[0])} alt="" />
          <p>{name}</p>
          {catagories.map((catagory) => (
            <p>{catagory}</p>
          ))}
          <p>£{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
