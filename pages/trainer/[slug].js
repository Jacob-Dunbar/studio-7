import React, { Children } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import { useStateContext } from "../../context/StateContext";
import Link from "next/link";
import { BsColumnsGap } from "react-icons/bs";

// Fetch class details and avaible sessions
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "trainer" && slug.current == '${slug}']`;
  const trainer = await client.fetch(query);

  const query2 = `*[_type == "class"]`;
  const products = await client.fetch(query2);

  return {
    props: { trainer, products },
  };
};

// Get static paths
export const getStaticPaths = async () => {
  const query = `*[_type == "trainer"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = [
    {
      params: {
        slug: `${trainer.slug}`,
      },
    },
  ];

  return {
    paths,
    fallback: "blocking",
  };
};

const trainer = ({ trainer, products }) => {
  console.log(products);
  return (
    <div>
      <div>
        <img
          src={urlFor(trainer[0].image && trainer[0].image)}
          alt="trainer profile picture"
        />
      </div>
      <h2>{trainer[0].quote}</h2>
      <h1>{trainer[0].name}</h1>
      <p>{trainer[0].desc}</p>

      <div>
        <h3>classes :</h3>
        {products
          .filter((product) => product.trainer === trainer[0].name)
          .map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default trainer;
