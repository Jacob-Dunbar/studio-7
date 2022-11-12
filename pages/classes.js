import Product from "../components/Product";
import { client } from "../lib/client";
import Link from "next/link";

// export const getServerSideProps = async () => {
//   //   const query = '*[_type == "class"]';
// //   const query = '*[[details, name, catagories] match ["fighting"]]';
//   const products = await client.fetch(query);

//   const bannerQuery = '*[_type == "banner"]';
//   const bannerData = await client.fetch(bannerQuery);

//   return {
//     props: { products, bannerData },
//   };
// };

const Classes = ({ products, bannerData }) => {
  return (
    <div className="py-4 ">
      <div className="button"> search </div>
      <div className="flex flex-col items-center gap-5 mt-6 text-2xl">
        <Link href="/catagories/mindfullness">
          <h2 className="w-full py-10 text-center bg-slate-400">Mindfullnes</h2>
        </Link>
        <Link href="">
          <h2 className="w-full py-10 text-center bg-slate-400">Strength</h2>
        </Link>
        <Link href="">
          <h2 className="w-full py-10 text-center bg-slate-400">Mobilty</h2>
        </Link>
        <Link href="">
          <h2 className="w-full py-10 text-center bg-slate-400">Cardio</h2>
        </Link>
      </div>
    </div>
  );
};

export default Classes;
