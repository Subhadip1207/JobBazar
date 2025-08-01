import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim() !== "") {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  return (
    <div className="text-center px-4 py-10 sm:py-16 bg-gradient-to-b from-white to-[#f9f9ff]">
      <div className="flex flex-col gap-5 max-w-5xl mx-auto">
        {/* Tagline */}
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          🚀 No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Get your dream job based on your skills, knowledge, and experience.
        </p>

        {/* Search Input */}
        <div className="w-full sm:w-[90%] lg:w-[60%] mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 shadow-md border border-gray-200 pl-4 pr-1 py-1 rounded-full bg-white">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your dream jobs"
              className="w-full sm:w-auto flex-1 px-3 py-2 text-sm sm:text-base outline-none bg-transparent"
            />
            <Button
              onClick={searchJobHandler}
              className="w-full sm:w-auto flex items-center gap-2 px-5 py-2 bg-[#6A38C2] hover:bg-[#5b2db1] active:bg-[#4c2398] text-white transition-all duration-300 rounded-full sm:rounded-r-full"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
