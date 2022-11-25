import { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiOutlineArrowRight,
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
  weekday: "short",
  month: "short",
  day: "numeric",
};

// add days to date
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// Current date
const date = new Date();

const ProductDetails = ({ product, sessions, trainers }) => {
  const { image, name, details, price, catagories, length, intensity } =
    product;
  const { onAdd } = useStateContext();
  const [index, setIndex] = useState(0);

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
      {/* Page container */}
      <div className="flex flex-col items-center sm:min-h-screen ">
        {/* Class details */}
        <section className="flex flex-col   sm:min-w-[900px] sm:mt-32 mt sm:gap-5 sm:mb-5 items-center justify-center sm:items-start mt-20  sm:h-[380px] sm:w-2/3 sm:flex-row ">
          {/* Image */}
          {/* Mobile image carousel */}
          <div className="flex w-full h-64 mb-3 overflow-x-scroll sm:hidden ">
            {image.map((image) => (
              <img
                className="object-cover w-full sm:aspect-square "
                src={urlFor(image)}
                key={image._key}
                alt="class image"
              />
            ))}
          </div>
          {/* Desktop image */}
          <div className="hidden w-full h-full sm:block aspect-square">
            <img
              className="object-cover w-full h-full rounded-md"
              src={urlFor(image[index])}
            />
          </div>
          {/* Copy */}
          <div className="flex flex-col  sm:h-full sm:justify-between">
            {/* Details container */}
            <div className="flex flex-col self-center w-full gap-3 px-5 sm:px-0">
              {/* Heading */}
              <h1 className="text-3xl font-semibold tracking-wider font-PlayfairDisplay">
                {name}
              </h1>
              {/* time - intensity - price */}
              <div className="flex gap-3 text-sm font-bold text-gray-500">
                <p>{length} hour</p>
                <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
                <p>{intensity}</p>
                <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
                <p>£{price}</p>
              </div>
              {/*  Categories */}
              <div className="flex gap-2 ">
                {catagories.map((catagory, i) => (
                  <p key={i} className="chip-active">
                    {catagory}
                  </p>
                ))}
              </div>
              {/* Desciption */}
              <p className="mb-5 text-sm leading-5 indent-5">{details}</p>
            </div>

            {/* Sessions */}
            <section className="flex flex-col self-center justify-center bg-gray-100 sm:shadow-lg w-fit sm:rounded-xl sm:py-4 px-7 py-7 ">
              <div className="flex flex-col gap-3 sm:gap-1 sm:w-full">
                {sessions.map((session, i) => (
                  <div className="flex flex-col">
                    {i !== 0 && (
                      <div className="w-full h-[2px] mb-2 mt-1 bg-gray-300 "></div>
                    )}
                    <div key={i} className="flex justify-between gap-5 ">
                      <p className="flex-grow text-lg sm:text-base sm:w-24 sm:flex-grow-0 ">
                        {date
                          .addDays(session.number)
                          .toLocaleDateString("en-GB", options)}
                      </p>
                      {/* <div className="self-center w-[6px]  h-[6px] bg-gray-500 rounded-full "></div> */}
                      <p> - </p>
                      <p>{session.time}</p>
                      {/* <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div> */}

                      <button
                        className="px-2 text-xs sm:px-3 sm:py-0 button sm:scale-95 sm:hover:scale-100"
                        type="button"
                        onClick={() => onAdd(session)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Trainer section */}
        <div className="flex flex-col py-5 mb-12 sm:shadow-lg  px-5 sm:min-w-[900px] items-center w-full mt-5 bg-gray-100 sm:gap-5 sm:overflow-clip sm:rounded-xl sm:mb-6 sm:py-5 sm:px-5 sm:w-2/3 sm:flex-row ">
          <img
            className="w-1/2 rounded-full aspect-square sm:w-44 "
            src={urlFor(classTrainer.image && classTrainer.image)}
            alt="trainer profile picture"
          />
          <div className="flex flex-col items-center mt-3 sm:items-start sm:mt-0 sm:gap-3">
            <h2 className="text-center sm:-mb-3 sm:text-left ">Trainer :</h2>
            <h1 className="mb-4 text-2xl font-semibold text-center sm:text-left sm:mb-0 font-PlayfairDisplay ">
              {classTrainer.name}
            </h1>
            <p className="mb-4 text-center sm:text-left sm:text-sm indent-5">
              {classTrainer.desc}
            </p>
            {/* <Link href={`/trainer/${classTrainer.slug.current}`}>
              <button
                className="button-sec sm:-mt-3 justify-center  flex items-center gap-3 sm:hover:bg-[#e4816b]  sm:border-2 border-[#e4816b] sm:hover:text-white sm:w-fit z-10 sm:px-6 font-bold sm:font-semibold tracking-wide w-[90%]"
                type="button"
              >
                More about {classTrainer.firstName}
                <AiOutlineArrowRight className="w-5 h-5 -mr-1" />
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
