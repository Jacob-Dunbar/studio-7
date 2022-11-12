import Link from "next/link";

const index = () => {
  return (
    <div className="absolute top-0 z-20 flex justify-center h-screen bg-yellow-200 ">
      <img
        className="object-cover object-right"
        src="/images/yoga1.jpg"
        alt="background"
      />
      <button className=" absolute bottom-52 button w-[80%]" type="button">
        <Link href="/classes">Check out out classes</Link>
      </button>
    </div>
  );
};

export default index;
