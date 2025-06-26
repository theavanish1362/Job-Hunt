import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "./CategoryCarousel";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-[#f9f9ff] rounded-3xl shadow-md">
      <div className="w-full md:w-1/2 text-left space-y-6">
        <span className="inline-block px-4 py-2 bg-[#eee5ff] text-[#d76b53] text-sm font-semibold rounded-full shadow-sm">
          Kickstart Your Future Today
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-950 to-violet-600 bg-clip-text text-transparent animate-fade-up">
          Search, Apply & <br />
          Get Your <span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">Dream Jobs</span>
        </h1>

        <p
          className="text-gray-600 text-base animate-fade-up"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          Connecting The Best Employees With The Best Companies...
        </p>

        <div className="flex w-5/6 max-w-xl shadow-lg border border-gray-200 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 bg-white focus:outline-none"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-gradient-to-r from-red-500 to-orange-300 -5 py-3 rounded-none text-white flex items-center"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <CategoryCarousel/>
      </div>

      {/* Optional: Illustrative image or mascot here if you want */}
      <div className="hidden md:grid grid-cols-2 gap-4 w-1/2 pl-10">
  <img
    src="https://i.postimg.cc/mDNQHn7N/intern.png"
    alt="Visual 1"
    className="rounded-xl border-2 border-gray-400 shadow-md object-cover w-full h-28 transition-all duration-500 hover:scale-105"
  />
  <img
    src="https://i.postimg.cc/PrK2cCpz/train.jpg"
    alt="Visual 2"
    className="rounded-xl border-2 border-gray-400 shadow-md object-cover w-full h-28 transition-all duration-500 hover:scale-105"
  />
  <img
    src="https://i.postimg.cc/Prnghv5g/jobs.jpg"
    alt="Visual 3"
    className="rounded-xl border-2 border-gray-400 shadow-md object-cover w-full h-28 transition-all duration-500 hover:scale-105"
  />
  <img
    src="https://i.postimg.cc/Px9k16hJ/practice.jpg"
    alt="Visual 4"
    className="rounded-xl border-2 border-gray-400 shadow-md object-cover w-full h-28 transition-all duration-500 hover:scale-105"
  />
  <img
    src="https://i.postimg.cc/jj8TSxFz/cmpt.jpg"
    alt="Visual 5"
    className="rounded-xl border-2 border-gray-400 shadow-md object-cover w-full h-28 transition-all duration-500 hover:scale-105"
  />
  <img
    src="https://i.postimg.cc/vBcs1JJC/easy.jpg"
    alt="Visual 6"
    className="rounded-xl border-2 border-gray-400 shadow-md object-cover w-full h-28 transition-all duration-500 hover:scale-105"
  />
</div>

    </div>
  );
};

export default HeroSection;
