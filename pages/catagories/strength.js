import React from "react";
import Product from "../../components/Product";
import { client } from "../../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class" && "Strength" in catagories]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, trainers },
  };
};

const strength = ({ products, trainers }) => {
  return (
    <div>
      <h1>Mind</h1>
      <div className="">
        {products?.map((product) => (
          <Product trainers={trainers} key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default strength;
