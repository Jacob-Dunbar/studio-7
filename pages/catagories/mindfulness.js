import { useState } from "react";
import Product from "../../components/Product";
import { client } from "../../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class" && "Mindfulness" in catagories]';
  //   const query = '*[[details, name, catagories] match ["fighting"]]';
  const products = await client.fetch(query);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, trainers },
  };
};

const mindfullness = ({ products, trainers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center py-4">
      <input
        className="pl-4 text-left searchBar"
        type="text"
        placeholder="search"
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {!searchTerm ? (
        <div>
          <h1>Mind</h1>
          <div className="">
            {products?.map((product) => (
              <Product
                trainers={trainers}
                key={product._id}
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

export default mindfullness;
