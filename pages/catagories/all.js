import React from "react";
import Product from "../../components/Product";
import { client } from "../../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, trainers },
  };
};

const cardio = ({ products, trainers }) => {
  console.log(products);
  return (
    <div>
      {products.map((product) => (
        <h1>{product.name}</h1>
      ))}
    </div>
  );
};

export default cardio;
