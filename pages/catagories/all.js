import { useState } from "react";
import Product from "../../components/Product";
import { client } from "../../lib/client";
import { CatCarousel } from "../../components/CatCarousel";
import { AiOutlineSearch } from "react-icons/ai";

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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center py-4 mt-20">
      <div className="flex items-center justify-start w-full gap-2 px-5 pl-4 mt-2 text-left sm:w-2/3 searchBar">
        <AiOutlineSearch className="w-6 text-[#a0a0a0] h-6" />
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search our classes"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <CatCarousel className="sm:w-1/3" />
      {!searchTerm ? (
        <div>
          <div className="">
            {products?.map((product) => (
              <Product
                key={product._id}
                trainers={trainers}
                product={product}
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
