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
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const [inactiveFilters, setInactiveFilters] = useState([
    "Combat",
    "Mindfulness",
    "Mobility",
    "Strength",
    "Cardio",
  ]);

  // Handle remove filter
  function handleRemoveFilter(filter) {
    if (activeFilters.length === 1) {
      setActiveFilters(["All"]);
      setInactiveFilters([
        "Combat",
        "Cardio",
        "Mobility",
        "Mindfulness",
        "Strength",
      ]);
    } else {
      setActiveFilters((prev) => {
        return prev.filter((cat) => cat !== filter);
      });

      setInactiveFilters((prev) => {
        return [...prev, filter];
      });
    }
  }

  // Handle add filter
  function handleAddFilter(filter) {
    setInactiveFilters((prev) => {
      return prev.filter((cat) => cat !== filter);
    });

    setActiveFilters((prev) => {
      return [...prev, filter];
    });

    if (filter === "All") {
      setActiveFilters(["All"]);
      setInactiveFilters([
        "Combat",
        "Cardio",
        "Mobility",
        "Mindfulness",
        "Strength",
      ]);
    } else {
      setActiveFilters((prev) => {
        return prev.filter((cat) => cat !== "All");
      });
      if (inactiveFilters.includes("All")) {
        return;
      } else {
        setInactiveFilters((prev) => {
          return [...prev, "All"];
        });
      }
    }
  }

  const checker = (arr, arr2) => arr2.every((v) => arr.includes(v));

  console.log(checker(activeFilters, products[1].catagories));

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    if (activeFilters.every((filter) => product.catagories.includes(filter))) {
      return product;
    } else if (activeFilters[0] === "All") {
      return product;
    }
  });

  // If not categories seclected, select "All

  return (
    <div className="flex flex-col items-center py-4 mt-20">
      <div className="flex items-center justify-start w-[90%] gap-2 px-5 pl-4 mt-2 text-left sm:w-2/3 searchBar">
        <AiOutlineSearch className="w-6 text-[#a0a0a0] h-6" />
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search our classes"
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <CatCarousel
        activeFilters={activeFilters}
        inactiveFilters={inactiveFilters}
        removeFilter={handleRemoveFilter}
        addFilter={handleAddFilter}
        className="sm:w-1/3"
      />
      {!searchTerm ? (
        <div>
          <div className="">
            {filteredProducts.map((product) => (
              <Product
                key={product._id}
                activeFilters={activeFilters}
                inactiveFilters={inactiveFilters}
                trainers={trainers}
                product={product}
              />
            ))}
          </div>
        </div>
      ) : (
        filteredProducts
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
            <Product
              key={product._id}
              activeFilters={activeFilters}
              inactiveFilters={inactiveFilters}
              trainers={trainers}
              product={product}
            />
          ))
      )}
    </div>
  );
};

export default cardio;
