import React from "react";
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
import Head from "next/head";

// Fetch class details and avaible sessions
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "class" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const query2 = `*[_type == "session" && class == '${slug}']`;
  const sessions = await client.fetch(query2);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { product, sessions, trainers },
  };
};

// Get static paths
export const getStaticPaths = async () => {
  const query = `*[_type == "class"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// Options object for toLocaleDateString method to format date
const options = {
  month: "numeric",
  day: "numeric",
  year: "numeric",
};

// add days to date
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// current date
const date = new Date();

const ProductDetails = ({ product, sessions, trainers }) => {
  const { image, name, details, price, catagories, length, intensity } =
    product;
  const { onAdd } = useStateContext();

  // Make sure sessions are in correct order
  sessions.sort((a, b) => {
    return a.number - b.number;
  });

  // Selection right trainer for this class from trainers array

  const classTrainer = trainers.find(
    (trainer) => trainer.name === product.trainer
  );

  return (
    <div>
      <Head>
        <title>Studio 7 | {name}</title>
        <meta
          name="Studio 7"
          content="pay as you go London fitness club with classes"
        />
        <link rel="icon" href="/s7icon.svg" />
      </Head>
      <div>
        <div className="flex flex-col justify-center mt-20 ">
          <div className="flex w-full h-64 my-3 overflow-scroll ">
            {image.map((image) => (
              <img
                className="object-cover"
                src={urlFor(image)}
                key={image._key}
                alt="class image"
              />
            ))}
          </div>
          <div className=" flex flex-col gap-3  self-center w-[90%]">
            <p className="text-3xl font-semibold tracking-wider font-PlayfairDisplay">
              {name}
            </p>
            <div className="flex gap-3 text-sm font-bold text-gray-500">
              <p>{length} hour</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>{intensity}</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>£{price}</p>
            </div>
            <div className="flex gap-2 ">
              {catagories.map((catagory, i) => (
                <p key={i} className="chip-active">
                  {catagory}
                </p>
              ))}
            </div>
            <p className="mb-5 text-sm leading-5 indent-5">{details}</p>
          </div>
          <section className="flex flex-col justify-center bg-gray-100 px-7 py-7 ">
            <h1 className="mb-4 text-xl">Upcoming classes :</h1>
            <div className="flex flex-col gap-3">
              {sessions.map((session, i) => (
                <div key={i} className="flex justify-between gap-5 ">
                  <p className="text-lg ">
                    {date
                      .addDays(session.number)
                      .toLocaleDateString("en-GB", options)}
                  </p>
                  <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>

                  <p>{session.time}</p>
                  <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>

                  <button
                    className="px-2 text-xs button"
                    type="button"
                    onClick={() => onAdd(session)}
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* Trainer section */}
        <div className="flex flex-col items-center w-full gap-4 mt-5">
          <img
            className="w-1/2 rounded-full "
            src={urlFor(classTrainer.image && classTrainer.image)}
            alt="trainer profile picture"
          />
          <h1 className="text-2xl font-semibold font-PlayfairDisplay ">
            {classTrainer.name}
          </h1>
          <p className=" w-[90%] mb-4 indent-5"> {classTrainer.desc}</p>
          <Link href={`/trainer/${classTrainer.slug.current}`}>
            <button className="button-sec w-[90%] mb-8" type="button">
              More about {classTrainer.firstName}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
