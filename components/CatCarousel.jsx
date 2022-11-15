import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const CatCarousel = () => {
  const router = useRouter();
  function chooseCurrentPage() {
    if (router.pathname === "/catagories/cardio") {
      return "Cardio";
    } else if (router.pathname === "/catagories/combat") {
      return "Combat";
    } else if (router.pathname === "/catagories/mindfulness") {
      return "Mindfulness";
    } else if (router.pathname === "/catagories/mobility") {
      return "Mobility";
    } else if (router.pathname === "/catagories/strength") {
      return "Strength";
    } else if (router.pathname === "/catagories/all") {
      return "All";
    }
  }

  function chooseArray() {
    if (router.pathname === "/catagories/cardio") {
      return ["Cardio", "Combat", "Mindfulness", "Mobility", "Strength", "All"];
    } else if (router.pathname === "/catagories/combat") {
      return ["Combat", "Mindfulness", "Mobility", "Strength", "Cardio", "All"];
    } else if (router.pathname === "/catagories/mindfulness") {
      return ["Mindfulness", "Mobility", "Strength", "Cardio", "Combat", "All"];
    } else if (router.pathname === "/catagories/mobility") {
      return ["Mobility", "Strength", "Cardio", "Combat", "Mindfulness", "All"];
    } else if (router.pathname === "/catagories/strength") {
      return ["Strength", "Cardio", "Combat", "Mindfulness", "Mobility", "All"];
    } else if (router.pathname === "/catagories/all") {
      return ["All", "Cardio", "Combat", "Mindfulness", "Mobility", "Strength"];
    }
  }

  const currentPage = chooseCurrentPage();

  const Array = chooseArray();

  return (
    <div className="flex w-screen gap-2 px-5 my-4 overflow-scroll ">
      {Array.map((catagory) => (
        <Link href={`/catagories/${catagory.toLowerCase()}`}>
          <div>
            <p className={currentPage === catagory ? "chip-active" : "chip"}>
              {catagory}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
