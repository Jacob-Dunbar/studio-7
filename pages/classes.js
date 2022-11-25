import { useState } from "react";
import Product from "../components/Product";
import { client } from "../lib/client";
import { CatCarousel } from "../components/CatCarousel";
import { AiOutlineSearch } from "react-icons/ai";

// Fetch classes and trainers

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  const products = await client.fetch(query);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, trainers },
  };
};

const Classes = ({ products, trainers }) => {
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

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    if (activeFilters.every((filter) => product.catagories.includes(filter))) {
      return product;
    } else if (activeFilters[0] === "All") {
      return product;
    }
  });

  console.log(filteredProducts.length);
  return (
    <div className="flex flex-col items-center py-4 mt-24">
      <div className="relative w-[90%] sm:w-2/3 bg-yellow-50">
        <AiOutlineSearch className="w-6 absolute top-[17%] left-4 text-[#a0a0a0] h-6" />
        <input
          className="flex items-center justify-start w-full gap-2 px-5 pl-12 text-left searchBar"
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
      {filteredProducts.filter((product) => {
        if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return product;
        } else if (
          product.catagories[0].toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return product;
        }
      }).length < 1 && (
        <div>
          <h1>No classes found</h1>
        </div>
      )}
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
            if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
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

export default Classes;
