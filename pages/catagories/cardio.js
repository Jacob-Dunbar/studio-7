import React from "react";
import Product from "../../components/Product";
import { client } from "../../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class" && "Cardio" in catagories]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

const cardio = ({ products }) => {
  console.log(products);
  return (
    <div>
      <h1>Mind</h1>
      <div className="">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default cardio;
