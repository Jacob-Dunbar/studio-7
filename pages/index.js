import Link from "next/link";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
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
        x: -30,
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
        x: 30,
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

  // Animate in diverse box
  useEffect(() => {
    if (inView2) {
      animationFromLeft1.start({
        x: -30,
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
        x: 30,
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

  // const showBanner = () => {
  //   setTimeout;
  // };

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
      <div className="w-full relative sm:-mt-[1vh] sm:h-[91vh] h-[93vh]">
        {/* <img
        className="object-cover object-right h-screen"
        src="/images/home-bg2.jpg"
        alt="background"
      /> */}
        <div className="absolute top-0 z-10 w-full bg-black bg-opacity-50 sm:h-full"></div>

        <img
          src="/images/homeImage.jpg"
          alt="Background image"
          className="object-cover object-right h-full sm:hidden"
        />
        <video
          className="hidden object-cover w-full sm:h-full sm:block sm:mb-5"
          autoPlay
          loop
          muted
          playsinline
          src="/studio7Video.mp4"
        />

        <div className="absolute top-0 flex flex-col h-[93vh] sm:h-full items-center justify-center w-full z-10  bottom-[10%]">
          <h1 className="mb-16 font-medium text-center text-gray-300 text-7xl sm:pt-8 sm:mt-auto sm:text-8xl font-PlayfairDisplay">
            Training : Mind & Body
          </h1>
          {/* <p className="hidden mb-10 text-white sm:block">
          Pay as you go classes taught by world class trainers in their fields.
          Let's do this.
        </p> */}
          {/* <button
          className="button-sec flex justify-center items-center gap-3 text-white sm:border-2 sm:hover:border-[#e4816b] sm:hover:text-[#e4816b] sm:w-fit px-6 font-bold sm:font-semibold tracking-wide  border-white w-[70%]"
          type="button"
        >
          <Link href="/classes">Explore Our Classes</Link>
          <AiOutlineArrowRight className="w-5 h-5 -mr-1" />
        </button> */}
          <div className="absolute flex flex-col items-center gap-1 text-gray-300 sm:block bottom-6 sm:pb-3 sm:mt-auto mt-60">
            {/* <HiOutlineChevronDoubleDown className="w-6 h-6" /> */}
            <h1 className="text-xl ">Learn More</h1>
            <AiOutlineArrowDown className="w-6 h-6" />
          </div>
        </div>
      </div>
      {/* <button className=" absolute  bottom-40 button w-[80%]" type="button">
        <Link href="/api/auth/login">login</Link>
      </button> */}
      <section
        id="about"
        className="flex flex-col items-center self-center w-full gap-5 pt-10 mb-10 overflow-x-hidden sm:w-full "
      >
        <div className="flex flex-col gap-5 px-5 sm:px-24 sm:w-full">
          <h1 className="px-5 mb-3 text-4xl text-center sm:mt-14 font-PlayfairDisplay">
            About Studio 7
          </h1>
          <p className="px-5 mb-10 text-center sm:px-44 sm:mb-16 indent-5 ">
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
            className="flex ml-5 sm:ml-0 flex-col items-center  shadow-lg rounded-lg overflow-clip w-[95%] pb-5 sm:mr-2 sm:w-[50%] bg-slate-100 "
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
            <p className="px-8 text-center">
              No subscription, just pay for as many or as few classes as you
              like. You are only committed to the classes you have already
              booked - no strings.
            </p>
          </motion.div>

          {/* Friendly box */}
          <motion.div
            ref={ref1}
            animate={animationFromRight}
            className="flex  flex-col sm:w-[50%] sm:min-w-[370px] w-[95%] shadow-lg rounded-lg overflow-clip sm:-mt-80 sm:self-end  items-center  pb-5 bg-slate-100"
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
            <p className="px-8 text-center ">
              Our trainers are some of the nicest around. Their approachable
              manner makes all our classes feel safe and welcoming, whilst still
              challenging enough to get the best out of you.
            </p>
          </motion.div>

          {/* Inclusive Box */}
          <motion.div
            ref={ref2}
            animate={animationFromLeft1}
            className="flex flex-col ml-5 sm:ml-0 rounded-lg sm:min-w-[370px] shadow-lg overflow-clip  sm:-mt-36     sm:w-[50%] items-center w-[95%] pb-5 bg-slate-100"
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
            <p className="px-8 text-center ">
              We believe Fitness isn’t about 6-pack abs and big muscles, it’s
              about a healthy mind and body, and that is the ideal we work
              towards here. We are all at different stages of our journey and we
              are here to help, whatever stage you are at.
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            ref={ref3}
            animate={animationFromRight1}
            className="flex rounded-lg  overflow-clip sm:min-w-[370px] shadow-lg flex-col sm:mt-[-345px] sm:w-[50%] sm:self-end items-center w-[95%] pb-5 bg-slate-100"
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
            <p className="px-8 text-center">
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
