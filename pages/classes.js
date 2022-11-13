import Product from "../components/Product";
import { client } from "../lib/client";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

const Classes = ({ products, bannerData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log(products);
  return (
    <div className="py-4 ">
      <input
        type="text"
        placeholder="search"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="button"> search </div>
      {!searchTerm ? (
        <div className="flex flex-col items-center gap-5 mt-6 text-2xl">
          <Link href="/catagories/mindfulness">
            <h2 className="w-full py-10 text-center bg-slate-400">
              Mindfulness
            </h2>
          </Link>
          <Link href="/catagories/strength">
            <h2 className="w-full py-10 text-center bg-slate-400">Strength</h2>
          </Link>
          <Link href="/catagories/mobility">
            <h2 className="w-full py-10 text-center bg-slate-400">Mobilty</h2>
          </Link>
          <Link href="/catagories/cardio">
            <h2 className="w-full py-10 text-center bg-slate-400">Cardio</h2>
          </Link>
          <Link href="/catagories/combat">
            <h2 className="w-full py-10 text-center bg-slate-400">Combat</h2>
          </Link>
          <Link href="/catagories/all">
            <h2 className="w-full py-10 text-center bg-slate-400">All</h2>
          </Link>
        </div>
      ) : (
        products
          .filter((product) => {
            if (
              product.details.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return product;
            } else if (
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return product;
            } else if (
              product.catagories[0]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return product;
            }
          })
          .map((product) => <Product product={product} />)
      )}
    </div>
  );
};

export default Classes;
