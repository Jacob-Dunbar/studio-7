import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";
import S7Class from "../components/S7Class";
import { client } from "../lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "class"]';
  const s7Classes = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { s7Classes, bannerData },
  };
};

const index = ({ s7Classes, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log(bannerData)}
      <div>
        <h2>New Classes</h2>
        <p>Our latest and greatest</p>
      </div>
      <div>
        {s7Classes ? s7Classes.map((s7Class) => s7Class.name) : undefined}
      </div>
      <FooterBanner />
    </>
  );
};

export default index;
