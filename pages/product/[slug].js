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

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "class" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  // could add similar products later on

  return {
    props: { product },
  };
};

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

console.log(date.addDays(5).toLocaleDateString("en-GB", options));
console.log(date.toLocaleDateString("en-GB", options));
// console.log(date.addDays(5));

const ProductDetails = ({ product }) => {
  const { image, name, details, price } = product;
  const { onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product);

    setShowCart(true);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <img src={urlFor(image && image[0])} alt="" />
          </div>
          {/* <div>
            {image?.map((item, index) => (
                <img src={urlFor(item)} />
            ))}
          </div> */}
          {/* <h1>{date}</h1> */}
          {/* <h1>{date.addDays(5)}</h1> */}
        </div>
        <div>
          <h1>{name}</h1>
          <div className="flex items-center">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>

          <h4>Details</h4>
          <p>{details}</p>
          <p>£{price}</p>
        </div>
        <div className="flex gap-3">
          <button
            className="px-2 bg-blue-300"
            type="button"
            onClick={() => onAdd(product)}
          >
            Add To Cart
          </button>
          <button className="px-2 border " type="button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>

      <div>
        <h2> What out members say</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
