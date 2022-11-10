import Link from "next/link";
import { urlFor } from "../lib/client";

const Banner = ({ heroBanner }) => {
  return (
    <div className=" flex bg-pink-200">
      <div>
        <p>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        {/* <img src={urlFor(heroBanner.image)} alt="begginer yoga class" /> */}
      </div>

      <div>
        <Link href={`/class/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
        <div>
          <h5>Description</h5>
          <p>{heroBanner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
