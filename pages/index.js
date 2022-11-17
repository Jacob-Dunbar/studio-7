import Link from "next/link";
import Head from "next/head";

const index = () => {
  return (
    <section id="home" className="top-0 z-20 flex flex-col justify-center ">
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
      <div className="absolute flex justify-center w-full bottom-32">
        <button className="  button w-[80%]" type="button">
          <Link href="/classes">Checkout our classes</Link>
        </button>
      </div>
      {/* <button className=" absolute  bottom-40 button w-[80%]" type="button">
        <Link href="/api/auth/login">login</Link>
      </button> */}
      <section id="about" className="flex flex-col gap-5 pt-10 mb-10 ">
        <h1 className="px-5 mb-3 text-4xl font-PlayfairDisplay">
          About Studio 7
        </h1>
        <p className="px-5 indent-5">
          Studio 5 is a multi-purpose fitness studio situated in Bermondsey,
          London, specialising in holistic fitness and overall well-being. Our
          pay-as-you-go classes range in focus from cardiovascular health,
          medication and relaxation to martial arts. All our classes have a
          emphasis on mindfulness. Join us in our spacious class space as we
          improve ourselves together.
        </p>
        <div className="px-8 py-4 bg-slate-100 ">
          <h2 className="mb-3 text-2xl text-center font-PlayfairDisplay">
            Flexible
          </h2>
          <p className="text-center ">
            No subscription, just pay for as many or as few classes as you like.
            You are only committed to the classes you have already booked - no
            strings.
          </p>
        </div>
        <div className="self-center w-[8px] h-[8px] bg-gray-800 mb-5 rounded-full "></div>

        <div className="px-8 py-4 bg-slate-100 ">
          <h2 className="mb-3 text-2xl text-center font-PlayfairDisplay">
            Friendly
          </h2>
          <p className="text-center ">
            Our trainers are some of the nicest around. Their approachable
            manner makes all our classes feel safe and welcoming, whilst still
            challenging enough to get the best out of you.
          </p>
        </div>
        <div className="self-center w-[8px] h-[8px] bg-gray-800 mb-5 rounded-full "></div>

        <div className="px-8 py-4 bg-slate-100 ">
          <h2 className="mb-3 text-2xl text-center font-PlayfairDisplay">
            Inclusive
          </h2>
          <p className="text-center ">
            We believe Fitness isn’t about 6-pack abs and big muscles, it’s
            about a healthy mind and body, and that is the ideal we work towards
            here. We are all at different stages of our journey and we are here
            to help, whatever stage you are at.
          </p>
        </div>
        <div className="self-center w-[8px] h-[8px] bg-gray-800 mb-5 rounded-full "></div>

        <div className="px-8 py-4 bg-slate-100 ">
          <h2 className="mb-3 text-2xl text-center font-PlayfairDisplay">
            Location
          </h2>
          <p className="text-center ">
            Located just around the corner from Bermondsey station, you should
            have no trouble popping in before or after work for a quick session.
            We even have customers that swing by during their lunch breaks! Now
            that commitment!
          </p>
        </div>
      </section>
    </section>
  );
};

export default index;
