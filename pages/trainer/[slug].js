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
  return (
    <div className="flex flex-col items-center w-full gap-4 ">
      <div className="flex justify-center ">
        <img
          className="w-2/3 mt-5 rounded-full"
          src={urlFor(trainer[0].image && trainer[0].image)}
          alt="trainer profile picture"
        />
      </div>
      <h1 className="text-3xl text-center">{trainer[0].name}</h1>
      <div className="flex items-center justify-center px-8 py-4 bg-gray-100 ">
        <img className="self-start " src="/quote-marks.svg" alt="quote marks" />
        <p className="w-4/5 p-3 italic font-bold text-center ">
          {trainer[0].quote}
        </p>
        <img
          className="self-start mt-1 rotate-180"
          src="/quote-marks.svg"
          alt="quote marks"
        />
      </div>
      <p className=" w-[90%] my-5 indent-5">{trainer[0].desc}</p>

      <div className="flex flex-col items-center w-full text-xl">
        <h3 className="mb-5 w-[90%]">{`Classes taught by ${trainer[0].name} :`}</h3>
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
