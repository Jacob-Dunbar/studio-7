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

// Fetch class details and avaible sessions
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "class" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const query2 = `*[_type == "session" && class == '${slug}']`;
  const sessions = await client.fetch(query2);

  return {
    props: { product, sessions },
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

const ProductDetails = ({ product, sessions }) => {
  const { image, name, details, price } = product;
  const { onAdd } = useStateContext();

  // const sessionByDate = sessions.sort((a, b) => {
  //   return a.number - b.number;
  // });

  // console.log(sessionByDate);

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

        {sessions.map((session) => (
          <div>
            <p>
              {date
                .addDays(session.number)
                .toLocaleDateString("en-GB", options)}
            </p>
            <p>{session.time}</p>{" "}
            <button
              className="px-2 bg-blue-300"
              type="button"
              onClick={() => onAdd(session)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2> What out members say</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
