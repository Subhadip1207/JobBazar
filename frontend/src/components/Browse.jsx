import React, { useEffect } from 'react';

import Navbar from './ui/shared/Navbar';
import Job from './Job';

import { useSelector, useDispatch } from 'react-redux';

import { setSearchedQuery } from '../redux/jobSlice';

import useGetAllJobs from '../hooks/useGetAllJobs';

import {
  Search,
  Sparkles,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

const Browse = () => {

  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector(
    store => store.job
  );

  const dispatch = useDispatch();

  // =========================================
  // CLEAR SEARCH QUERY
  // =========================================
  useEffect(() => {

    return () => {
      dispatch(setSearchedQuery(""));
    };

  }, [dispatch]);

  return (

    <div className="
      min-h-screen
      bg-[#030712]
      overflow-hidden
      relative
      text-white
    ">

      {/* ===================================
              BACKGROUND EFFECTS
      =================================== */}

      {/* Grid Background */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "></div>

      {/* Cyan Glow */}
      <div className="
        absolute
        top-0
        left-0
        w-[500px]
        h-[500px]
        bg-cyan-500/10
        blur-3xl
        rounded-full
      "></div>

      {/* Purple Glow */}
      <div className="
        absolute
        bottom-0
        right-0
        w-[500px]
        h-[500px]
        bg-purple-500/10
        blur-3xl
        rounded-full
      "></div>

      {/* Floating Orb */}
      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          top-40
          right-20
          w-8
          h-8
          rounded-full
          bg-cyan-400
          blur-sm
          opacity-30
        "
      />

      {/* Navbar */}
      <Navbar />

      {/* ===================================
              MAIN CONTENT
      =================================== */}

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-12
      ">

        {/* ===================================
                HERO HEADER
        =================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
          }}

          className="
            relative
            overflow-hidden
            rounded-[35px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-8
            sm:p-10
            shadow-2xl
            mb-12
          "
        >

          {/* Gradient Overlay */}
          <div className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]
          "></div>

          <div className="
            relative
            z-10
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-8
          ">

            {/* LEFT */}
            <div>

              {/* Badge */}
              <div className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-cyan-500/10
                border
                border-cyan-500/20
                text-cyan-300
                mb-6
              ">

                <Sparkles className="w-4 h-4" />

                Discover New Opportunities

              </div>

              {/* Title */}
              <h1 className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                leading-tight
                text-white
              ">

                Browse Your <br />

                <span className="
                  bg-linear-to-r
                  from-cyan-400
                  via-blue-500
                  to-purple-500
                  bg-clip-text
                  text-transparent
                ">
                  Dream Jobs
                </span>

              </h1>

              {/* Description */}
              <p className="
                text-slate-300
                text-lg
                leading-8
                mt-6
                max-w-2xl
              ">

                Explore top opportunities from leading companies.
                Find jobs based on your skills, interests,
                and career goals.

              </p>

            </div>

            {/* RIGHT */}
            <motion.div

              animate={{
                y: [0, -15, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
              }}

              className="
                hidden
                lg:flex
                items-center
                justify-center
              "
            >

              <div className="
                relative
                w-[260px]
                h-[260px]
                rounded-full
                bg-linear-to-r
                from-cyan-500
                via-blue-500
                to-purple-600
                p-[2px]
                shadow-2xl
              ">

                <div className="
                  w-full
                  h-full
                  rounded-full
                  bg-[#030712]
                  flex
                  items-center
                  justify-center
                ">

                  <BriefcaseBusiness className="
                    w-28
                    h-28
                    text-cyan-400
                  " />

                </div>

              </div>

            </motion.div>

          </div>

        </motion.div>

        {/* ===================================
                SEARCH INFO
        =================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
            delay: 0.1,
          }}

          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
          "
        >

          {/* LEFT */}
          <div>

            <h2 className="
              text-3xl
              font-bold
              text-white
            ">

              Search Results

            </h2>

            <p className="
              text-slate-400
              mt-2
            ">

              Showing {allJobs?.length} available jobs

            </p>

          </div>

          {/* RIGHT */}
          <div className="
            flex
            flex-wrap
            items-center
            gap-4
          ">

            {/* Search Query */}
            {
              searchedQuery && (

                <div className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  text-cyan-300
                ">

                  <Search className="w-5 h-5" />

                  {searchedQuery}

                </div>

              )
            }

            {/* Trending */}
            <div className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              border
              border-purple-500/20
              bg-purple-500/10
              text-purple-300
            ">

              <TrendingUp className="w-5 h-5" />

              Trending Jobs

            </div>

          </div>

        </motion.div>

        {/* ===================================
                JOBS GRID
        =================================== */}

        {
          allJobs?.length === 0 ? (

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.9,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.5,
              }}

              className="
                flex
                flex-col
                items-center
                justify-center
                text-center
                py-28
                rounded-[35px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
                shadow-2xl
              "
            >

              <div className="
                w-24
                h-24
                rounded-full
                bg-linear-to-r
                from-cyan-500
                to-purple-600
                flex
                items-center
                justify-center
                mb-8
              ">

                <Search className="
                  text-white
                  w-10
                  h-10
                " />

              </div>

              <h2 className="
                text-3xl
                font-bold
                text-white
                mb-4
              ">

                No Jobs Found

              </h2>

              <p className="
                text-slate-400
                text-lg
                max-w-xl
                leading-8
              ">

                Try adjusting your search criteria or explore
                different categories to discover more
                opportunities.

              </p>

            </motion.div>

          ) : (

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-8
            ">

              {
                allJobs.map((job, index) => (

                  <motion.div

                    key={job._id}

                    initial={{
                      opacity: 0,
                      y: 50,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}

                    whileHover={{
                      y: -8,
                    }}
                  >

                    <Job job={job} />

                  </motion.div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>

  );
};

export default Browse;