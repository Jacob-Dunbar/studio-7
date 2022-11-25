import Link from "next/link";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import Image from "next/image";
import flexible from "../public/images/flexible.jpg";
import friendly from "../public/images/friendly.jpg";
import inclusive from "../public/images/inclusive.jpg";
import location from "../public/images/location.jpg";

const index = () => {
  const [ref, inView] = useInView();
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();
  const [ref3, inView3] = useInView();
  const animationFromLeft = useAnimation();
  const animationFromRight = useAnimation();
  const animationFromLeft1 = useAnimation();
  const animationFromRight1 = useAnimation();

  // Animate in flexible box
  useEffect(() => {
    if (inView) {
      animationFromLeft.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    }

    if (!inView) {
      animationFromLeft.start({ x: "-10vw", opacity: 0 });
    }
  }, [inView]);

  // Animate in friendly box
  useEffect(() => {
    if (inView1) {
      animationFromRight.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    }

    if (!inView1) {
      animationFromRight.start({ x: "10vw", opacity: 0 });
    }
  }, [inView1]);

  // Animate in friendly box
  useEffect(() => {
    if (inView2) {
      animationFromLeft1.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    }

    if (!inView2) {
      animationFromLeft1.start({ x: "-10vw", opacity: 0 });
    }
  }, [inView2]);

  // Animate in location box
  useEffect(() => {
    if (inView3) {
      animationFromRight1.start({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 2,
          bounce: 0.3,
        },
      });
    }

    if (!inView3) {
      animationFromRight1.start({ x: "10vw", opacity: 0 });
    }
  }, [inView3]);

  return (
    <section
      id="home"
      className="top-0 z-20 flex flex-col justify-center w-full "
    >
      <Head>
        <title>Studio 7 | Home</title>
        <meta
          name="Studio 7"
          content="pay as you go London fitness club with classes"
        />
        <link rel="icon" href="/s7icon.svg" />
      </Head>
      {/* <img
        className="object-cover object-right h-screen"
        src="/images/home-bg2.jpg"
        alt="background"
      /> */}
      <div className="absolute top-0 z-10 w-full h-screen bg-black bg-opacity-50"></div>

      <img
        src="/images/homeImage.jpg"
        alt="Background image"
        className="object-cover object-right h-screen sm:hidden"
      />
      <video
        className="hidden object-cover h-screen sm:block sm:mb-5"
        autoPlay
        loop
        muted
        playsinline
        src="/studio7Video.mp4"
      />

      <div className="absolute flex flex-col items-center justify-center w-full z-10  bottom-[10%]">
        <h1 className="mb-16 text-3xl font-medium text-gray-300 sm:text-7xl font-PlayfairDisplay">
          Training : Your Way
        </h1>
        <p className="mb-10 text-white">
          Pay as you go classes taught by world class trainers in their fields.
          Let's do this.
        </p>
        <button
          className="button-sec flex justify-center items-center gap-3 text-white sm:border-2 sm:hover:border-[#e4816b] sm:hover:text-[#e4816b] sm:w-fit px-6 font-bold sm:font-semibold tracking-wide  border-white w-[70%]"
          type="button"
        >
          <Link href="/classes">Explore Our Classes</Link>
          <AiOutlineArrowRight className="w-5 h-5 -mr-1" />
        </button>
        <div className="flex items-center gap-5 text-gray-300 sm:mt-32 mt-60">
          <HiOutlineChevronDoubleDown className="w-6 h-6" />
          <h1 className="text-xl ">Learn More</h1>
          <HiOutlineChevronDoubleDown className="w-6 h-6" />
        </div>
      </div>
      {/* <button className=" absolute  bottom-40 button w-[80%]" type="button">
        <Link href="/api/auth/login">login</Link>
      </button> */}
      <section
        id="about"
        className="flex flex-col items-center w-full gap-5 pt-10 mb-10 "
      >
        <div className="flex flex-col gap-5 sm:w-2/3">
          <h1 className="px-5 mb-3 text-4xl sm:text-center font-PlayfairDisplay">
            About Studio 7
          </h1>
          <p className="px-5 mb-5 sm:text-center indent-5 ">
            Studio 5 is a multi-purpose fitness studio situated in Bermondsey,
            London, specialising in holistic fitness and overall well-being. Our
            pay-as-you-go classes range in focus from cardiovascular health,
            medication and relaxation to martial arts. All our classes have a
            emphasis on mindfulness. Join us in our spacious class space as we
            improve ourselves together.
          </p>

          {/* Flexible box */}
          <motion.div
            ref={ref}
            animate={animationFromLeft}
            className="flex flex-col items-center w-full pb-5 bg-slate-100 "
          >
            <Image
              height="600"
              width="600"
              placeholder="blur"
              className="object-cover w-full h-48 mb-4 sm:h-80"
              src={flexible}
              alt="flexible"
            />
            <h2 className="px-8 mb-3 text-2xl text-center font-PlayfairDisplay">
              Flexible
            </h2>
            <p className="px-8 sm:w-[70%] text-center">
              No subscription, just pay for as many or as few classes as you
              like. You are only committed to the classes you have already
              booked - no strings.
            </p>
          </motion.div>
          <div className="self-center w-[8px] h-[8px] bg-gray-800 mb-3 rounded-full "></div>

          {/* Friendly box */}
          <motion.div
            ref={ref1}
            animate={animationFromRight}
            className="flex flex-col items-center w-full pb-5 bg-slate-100"
          >
            <Image
              height="600"
              width="600"
              placeholder="blur"
              className="object-cover object-top w-full h-48 mb-4 sm:h-80"
              src={friendly}
              alt="flexible"
            />
            <h2 className="px-8 mb-3 text-2xl text-center font-PlayfairDisplay">
              Friendly
            </h2>
            <p className="px-8 sm:w-[70%] text-center ">
              Our trainers are some of the nicest around. Their approachable
              manner makes all our classes feel safe and welcoming, whilst still
              challenging enough to get the best out of you.
            </p>
          </motion.div>
          <div className="self-center w-[8px] h-[8px] bg-gray-800 mb-3 rounded-full "></div>

          {/* Inclusive Box */}
          <motion.div
            ref={ref2}
            animate={animationFromLeft1}
            className="flex flex-col items-center w-full pb-5 bg-slate-100"
          >
            <Image
              height="600"
              width="600"
              placeholder="blur"
              className="object-cover object-top w-full h-48 mb-4 sm:h-80"
              src={inclusive}
              alt="flexible"
            />
            <h2 className="px-8 mb-3 text-2xl text-center font-PlayfairDisplay">
              Inclusive
            </h2>
            <p className="px-8 sm:w-[70%] text-center ">
              We believe Fitness isn’t about 6-pack abs and big muscles, it’s
              about a healthy mind and body, and that is the ideal we work
              towards here. We are all at different stages of our journey and we
              are here to help, whatever stage you are at.
            </p>
          </motion.div>
          <div className="self-center w-[8px] h-[8px] bg-gray-800 mb-3 rounded-full "></div>

          {/* Location */}
          <motion.div
            ref={ref3}
            animate={animationFromRight1}
            className="flex flex-col items-center w-full pb-5 bg-slate-100"
          >
            <Image
              height="600"
              width="600"
              placeholder="blur"
              className="object-cover object-top w-full h-48 mb-4 sm:h-80"
              src={location}
              alt="flexible"
            />
            <h2 className="px-8 mb-3 text-2xl text-center font-PlayfairDisplay">
              Location
            </h2>
            <p className="px-8 sm:w-[70%] text-center">
              Located just around the corner from Bermondsey station, you should
              have no trouble popping in before or after work for a quick
              session. We even have customers that swing by during their lunch
              breaks! Now that commitment!
            </p>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default index;
