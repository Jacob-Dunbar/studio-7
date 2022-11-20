import Product from "../components/Product";
import { client } from "../lib/client";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";
import { AiOutlineSearch } from "react-icons/ai";

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, bannerData, trainers },
  };
};

const Classes = ({ products, bannerData, trainers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center py-4 mt-20 ">
      <Head>
        <title>Studio 7 | Classes</title>
        <meta
          name="Studio 7"
          content="pay as you go London fitness club with classes"
        />
        <link rel="icon" href="/s7icon.svg" />
      </Head>
      <div className="flex items-center justify-start w-full gap-2 px-5 pl-4 mt-2 mb-4 text-left sm:w-2/3 searchBar">
        <AiOutlineSearch className="w-6 text-[#a0a0a0] h-6" />
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search our classes"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {!searchTerm ? (
        <div className="flex flex-col items-center w-full gap-3 mt-6 text-2xl">
          <Link href="/catagories/mindfulness">
            <div className="relative w-full cursor-pointer">
              <h2 className="w-full py-20 text-3xl font-medium tracking-wider text-center text-white duration-200 ease-in bg-black bg-opacity-50 sm:hover:bg-opacity-40 sm:py-36 font-PlayfairDisplay">
                Mindfulness
              </h2>
              <img
                src="/images/mindfulness-bg.jpg"
                className="absolute top-0 object-cover object-top w-full h-full opacity-60 -z-20"
                alt=""
              />
            </div>
          </Link>
          <Link href="/catagories/strength">
            <div className="relative w-full cursor-pointer">
              <h2 className="w-full py-20 text-3xl font-medium tracking-wider text-center text-white duration-200 ease-in bg-black bg-opacity-50 sm:hover:bg-opacity-40 sm:py-36 font-PlayfairDisplay">
                Strength
              </h2>
              <img
                src="/images/strength-bg.jpg"
                className="absolute top-0 object-cover object-top w-full h-full opacity-60 -z-20"
                alt=""
              />
            </div>
          </Link>
          <Link href="/catagories/mobility">
            <div className="relative w-full cursor-pointer">
              <h2 className="w-full py-20 text-3xl font-medium tracking-wider text-center text-white duration-200 ease-in bg-black bg-opacity-50 sm:hover:bg-opacity-40 sm:py-36 font-PlayfairDisplay">
                Mobility
              </h2>
              <img
                src="/images/mobility-bg.jpg"
                className="absolute top-0 object-cover object-center w-full h-full opacity-60 -z-20"
                alt=""
              />
            </div>
          </Link>
          <Link href="/catagories/cardio">
            <div className="relative w-full cursor-pointer">
              <h2 className="w-full py-20 text-3xl font-medium tracking-wider text-center text-white duration-200 ease-in bg-black bg-opacity-50 sm:hover:bg-opacity-40 sm:py-36 font-PlayfairDisplay">
                Cardio
              </h2>
              <img
                src="/images/cardio-bg.jpg"
                className="absolute top-0 object-cover object-top w-full h-full opacity-60 -z-20"
                alt=""
              />
            </div>
          </Link>
          <Link href="/catagories/combat">
            <div className="relative w-full cursor-pointer">
              <h2 className="w-full py-20 text-3xl font-medium tracking-wider text-center text-white duration-200 ease-in bg-black bg-opacity-50 sm:hover:bg-opacity-40 sm:py-36 font-PlayfairDisplay">
                Combat
              </h2>
              <img
                src="/images/combat-bg.jpg"
                className="absolute top-0 object-cover object-top w-full h-full opacity-60 -z-20"
                alt=""
              />
            </div>
          </Link>
          <Link href="/catagories/all">
            <div className="relative w-full cursor-pointer">
              <h2 className="w-full py-20 text-3xl font-medium tracking-wider text-center text-white duration-200 ease-in bg-black bg-opacity-50 sm:hover:bg-opacity-40 sm:py-36 font-PlayfairDisplay">
                All
              </h2>
              <img
                src="/images/all-bg.jpg"
                className="absolute top-0 object-cover object-top w-full h-full opacity-60 -z-20"
                alt=""
              />
            </div>
          </Link>
        </div>
      ) : (
        <div className="py-5 ">
          {products
            .filter((product) => {
              if (
                product.details.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return product;
              } else if (
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Product
                key={product._id}
                trainers={trainers}
                product={product}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
