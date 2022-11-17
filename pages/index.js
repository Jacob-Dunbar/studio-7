import Link from "next/link";
import Head from "next/head";

const index = () => {
  return (
    <section
      id="home"
      className="absolute top-0 z-20 flex flex-col justify-center "
    >
      <Head>
        <title>Studio 7 | Home</title>
        <meta
          name="Studio 7"
          content="pay as you go London fitness club with classes"
        />
        <link rel="icon" href="/s7icon.svg" />
      </Head>
      <img
        className="object-cover object-right h-screen"
        src="/images/home-bg2.jpg"
        alt="background"
      />
      <button className=" absolute bottom-52 button w-[80%]" type="button">
        <Link href="/classes">Check out out classes</Link>
      </button>
      {/* <button className=" absolute  bottom-40 button w-[80%]" type="button">
        <Link href="/api/auth/login">login</Link>
      </button> */}
      <section id="about" className="h-screen bg-green-400">
        <h1>hello</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Cras nibh in quis tortor sit
          pellentesque amet cursus arcu. Fringilla ut ullamcorper massa
          pellentesque platea justo quam pellentesque. Semper ipsum consectetur
          nulla eu morbi euismod porttitor.
        </p>
      </section>
    </section>
  );
};

export default index;
