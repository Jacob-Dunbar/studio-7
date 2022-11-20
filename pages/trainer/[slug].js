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
import Head from "next/head";

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
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full gap-4 mt-20 sm:w-2/3 ">
        <Head>
          <title>Studio 7 | {trainer[0].name}</title>
          <meta
            name="Studio 7"
            content="pay as you go London fitness club with classes"
          />
          <link rel="icon" href="/s7icon.svg" />
        </Head>
        <div className="flex justify-center ">
          <img
            className="w-2/3 mt-5 rounded-full sm:w-1/4"
            src={urlFor(trainer[0].image && trainer[0].image)}
            alt="trainer profile picture"
          />
        </div>
        <h1 className="text-3xl font-semibold text-center font-PlayfairDisplay">
          {trainer[0].name}
        </h1>
        {/* Quote */}
        <div className="flex items-center justify-center px-8 py-4 bg-gray-100 sm:w-2/3 sm:rounded-xl sm:px-5 ">
          <img
            className="self-start "
            src="/quote-marks.svg"
            alt="quote marks"
          />
          <p className="w-4/5 p-3 italic font-bold text-center sm:font-semibold ">
            {trainer[0].quote}
          </p>
          <img
            className="self-start mt-1 rotate-180"
            src="/quote-marks.svg"
            alt="quote marks"
          />
        </div>
        <p className=" w-[90%] sm:w-full my-5 indent-5">{trainer[0].desc}</p>

        <div className="flex flex-col items-center w-full sm:w-screen ">
          <h3 className="mb-6 mt-2 sm:w-2/3 text-2xl w-[90%]">{`Classes taught by ${trainer[0].firstName} :`}</h3>
          {products
            .filter((product) => product.trainer === trainer[0].name)
            .map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default trainer;
