import { useEffect, useState } from "react";
import Product from "../components/Product";
import { client, urlFor } from "../lib/client";
import { CatCarousel } from "../components/CatCarousel";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import ProductPanel from "../components/productPannel";
// Fetch classes and trainers

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  const products = await client.fetch(query);

  const query2 = `*[_type == "session"]`;
  const sessions = await client.fetch(query2);

  const trainerQuery = '*[_type == "trainer"]';
  const trainers = await client.fetch(trainerQuery);

  return {
    props: { products, trainers, sessions },
  };
};

const Classes = ({ products, trainers, sessions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const [inactiveFilters, setInactiveFilters] = useState([
    "Combat",
    "Mindfulness",
    "Mobility",
    "Strength",
    "Cardio",
  ]);
  const [activeClass, setActiveClass] = useState(null);
  const [activeClassName, setActiveClassName] = useState("");
  const [activeClassSessions, setActiveClassSessions] = useState([]);
  const [showFeature, setShowFeature] = useState(true);

  useEffect(() => {
    if (activeClassName) {
      setActiveClass(
        products.find((product) => product.name === activeClassName)
      );
    }
  }, [activeClassName]);

  useEffect(() => {
    if (activeClassName) {
      setActiveClassSessions(
        sessions.filter((session) => session.name === activeClassName)
      );
    }
  }, [activeClassName]);

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

  return (
    <div className="flex  justify-start  py-4 sm:min-h-[90vh]  sm:py-0 ">
      <div className=" sm:w-2/3 sm:pl-12 sm:h-full">
        <div className="z-10 bg-white s sm:py-6 ">
          <div className="relative    sm:min-w-[500px] ">
            <AiOutlineSearch className="w-5 absolute top-2 left-3 text-[#a0a0a0] h-6" />
            <input
              className="flex items-center justify-start w-full gap-2 px-5 pl-10 text-sm text-left sm:py-2 searchBar"
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
          />
        </div>
        {filteredProducts.filter((product) => {
          if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return product;
          } else if (
            product.catagories[0]
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return product;
          }
        }).length < 1 && (
          <div>
            <h1>No classes found</h1>
          </div>
        )}
        {!searchTerm ? (
          <div className="">
            <div className="">
              {filteredProducts.map((product) => (
                <Product
                  setActiveClassName={setActiveClassName}
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
                setActiveClassName={setActiveClassName}
                key={product._id}
                activeFilters={activeFilters}
                inactiveFilters={inactiveFilters}
                trainers={trainers}
                product={product}
              />
            ))
        )}
      </div>
      <div className=" w-1/3 px-12 py-6    sticky top-0 left-0  h-[93vh]">
        <div
          className={`relative flex flex-col transition-all duration-300 gap-6 p-6 shadow-lg sm:bg-gray-100 sm:bg-opacity-50 rounded-xl  ${
            !showFeature
              ? "opacity-0  sm:right-0  pointer-events-none"
              : "opacity-100"
          }`}
        >
          <h1 className="w-full pb-4 text-3xl font-semibold tracking-wider border-b border-gray-300 sm:text-2xl font-PlayfairDisplay">
            Featured Trainer
          </h1>
          <AiOutlineClose
            onClick={() => setShowFeature(false)}
            className="absolute w-5 h-5 cursor-pointer right-4 top-4 "
          />
          <div className="flex flex-col items-center w-full gap-3">
            <img
              className="w-1/2 rounded-full "
              src={urlFor(trainers[0].image && trainers[0].image)}
            ></img>
            <h2 className="text-lg font-semibold">{trainers[0].name}</h2>
            <p className="text-sm indent-5 ">{trainers[0].desc}</p>
          </div>
        </div>
      </div>
      {/* <div className="px-4 overflow-y-scroll sm:h-full sm:w-1/2">
        {activeClass && (
          <ProductPanel product={activeClass} sessions={activeClassSessions} />
        )}
      </div> */}
    </div>
  );
};

export default Classes;
