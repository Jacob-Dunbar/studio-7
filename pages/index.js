import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/Banner";
import Product from "../components/Product";
import { client } from "../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

const index = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div>
        <h2>New Classes</h2>
        <p>Our latest and greatest</p>
      </div>
      <div className="">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner />
    </>
  );
};

export default index;
