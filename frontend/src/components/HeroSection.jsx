import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  BriefcaseBusiness,
  TrendingUp,
  Rocket,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

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
    <section className="
      relative
      overflow-hidden
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-[#030712]
    ">

      {/* Background Glow Effects */}
      <div className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[350px]
        h-[350px]
        bg-cyan-500/20
        blur-3xl
        rounded-full
      "></div>

      <div className="
        absolute
        bottom-[-120px]
        right-[-120px]
        w-[350px]
        h-[350px]
        bg-purple-600/20
        blur-3xl
        rounded-full
      "></div>

      {/* Grid Pattern */}
      <div className="
        absolute
        inset-0
        opacity-[0.04]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "></div>

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        text-center
      ">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            inline-flex
            items-center
            gap-2
            px-6
            py-3
            rounded-full
            border
            border-cyan-500/30
            bg-white/5
            backdrop-blur-xl
            text-cyan-300
            font-medium
            shadow-lg
            mb-8
          "
        >
          <Sparkles className="w-5 h-5" />
          No. 1 AI Powered Job Hunt Platform
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            xl:text-8xl
            font-black
            leading-tight
            tracking-tight
            text-white
          "
        >
          Search, Apply & <br />

          <span className="
            bg-linear-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            bg-clip-text
            text-transparent
          ">
            Get Your Dream Job
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="
            mt-8
            max-w-3xl
            mx-auto
            text-slate-300
            text-base
            sm:text-lg
            md:text-xl
            leading-8
          "
        >
          Discover thousands of opportunities from top companies,
          explore careers tailored to your skills, and build the future
          you always dreamed of.
        </motion.p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="
            mt-14
            max-w-3xl
            mx-auto
          "
        >

          <div className="
            flex
            flex-col
            sm:flex-row
            items-center
            gap-3
            bg-white/10
            backdrop-blur-2xl
            border
            border-white/10
            rounded-2xl
            p-3
            shadow-2xl
          ">

            {/* Input */}
            <div className="
              flex
              items-center
              gap-3
              w-full
              px-4
            ">
              <Search className="text-slate-400 w-5 h-5" />

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for jobs, companies, skills..."
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-white
                  placeholder:text-slate-400
                  text-lg
                  py-3
                "
              />
            </div>

            {/* Button */}
            <Button
              onClick={searchJobHandler}
              className="
                w-full
                sm:w-auto
                px-8
                py-6
                rounded-xl
                text-base
                font-semibold
                bg-linear-to-r
                from-cyan-500
                to-blue-600
                hover:from-cyan-400
                hover:to-blue-500
                transition-all
                duration-300
                hover:scale-105
                shadow-lg
                shadow-cyan-500/20
              "
            >
              Search Jobs
            </Button>

          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="
            mt-16
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            max-w-5xl
            mx-auto
          "
        >

          {/* Card 1 */}
          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
            backdrop-blur-xl
            hover:scale-105
            transition-all
            duration-300
            shadow-xl
          ">
            <BriefcaseBusiness className="w-10 h-10 text-cyan-400 mx-auto mb-4" />

            <h2 className="text-4xl font-bold text-white">
              10K+
            </h2>

            <p className="text-slate-400 mt-2">
              Active Jobs
            </p>
          </div>

          {/* Card 2 */}
          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
            backdrop-blur-xl
            hover:scale-105
            transition-all
            duration-300
            shadow-xl
          ">
            <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-4" />

            <h2 className="text-4xl font-bold text-white">
              5K+
            </h2>

            <p className="text-slate-400 mt-2">
              Companies
            </p>
          </div>

          {/* Card 3 */}
          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
            backdrop-blur-xl
            hover:scale-105
            transition-all
            duration-300
            shadow-xl
          ">
            <Rocket className="w-10 h-10 text-purple-400 mx-auto mb-4" />

            <h2 className="text-4xl font-bold text-white">
              99%
            </h2>

            <p className="text-slate-400 mt-2">
              Success Rate
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;