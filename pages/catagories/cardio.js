import { useState } from "react";
import { CatCarousel } from "../../components/CatCarousel";
import Product from "../../components/Product";
import { client } from "../../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class" && "Cardio" in catagories]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, trainers },
  };
};

const cardio = ({ products, trainers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState("cardio");

  return (
    <div className="flex flex-col items-center py-4 mt-20">
      <div className="w-full px-5 ">
        <input
          className="pl-4 text-left searchBar"
          type="text"
          placeholder="Search our classes"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <CatCarousel />
      {!searchTerm ? (
        <div className="flex flex-col w-full">
          <div className="">
            {products?.map((product) => (
              <Product
                key={product._id}
                trainers={trainers}
                product={product}
                page={page}
              />
            ))}
          </div>
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
          .map((product) => (
            <Product key={product._id} trainers={trainers} product={product} />
          ))
      )}
    </div>
  );
};

export default cardio;
