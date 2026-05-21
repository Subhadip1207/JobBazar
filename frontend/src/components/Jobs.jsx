import React, { useState, useEffect } from 'react';

import Navbar from './ui/shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';

import { useSelector } from 'react-redux';

import { motion, AnimatePresence } from 'framer-motion';

import {
  Sparkles,
  Search,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

const Jobs = () => {

  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {

    if (searchedQuery) {

      const filtered = allJobs.filter((job) =>
        job.title.toLowerCase().includes(
          searchedQuery.toLowerCase()
        ) ||

        job.location.toLowerCase().includes(
          searchedQuery.toLowerCase()
        )
      );

      setFilterJobs(filtered);

    } else {

      setFilterJobs(allJobs);

    }

  }, [allJobs, searchedQuery]);

  return (
    <div className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#030712]
      text-white
    ">

      {/* =========================
          BACKGROUND EFFECTS
      ========================== */}

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
        top-[30%]
        right-0
        w-[500px]
        h-[500px]
        bg-purple-500/10
        blur-3xl
        rounded-full
      "></div>

      {/* Grid */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "></div>

      {/* Floating Orb */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          top-32
          right-20
          w-10
          h-10
          rounded-full
          bg-cyan-400
          blur-sm
          opacity-30
        "
      />

      {/* =========================
              NAVBAR
      ========================== */}
      <Navbar />

      {/* =========================
              HERO SECTION
      ========================== */}
      <section className="
        relative
        z-10
        pt-16
        pb-12
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        ">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
              text-center
              max-w-4xl
              mx-auto
            "
          >

            {/* Badge */}
            <div className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-white/5
              border
              border-white/10
              backdrop-blur-xl
              text-cyan-300
              mb-8
            ">

              <Sparkles className="w-4 h-4" />
              Find Your Dream Opportunity

            </div>

            {/* Heading */}
            <h1 className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-black
              leading-tight
              text-white
            ">

              Explore
              <span className="
                bg-linear-to-r
                from-cyan-400
                via-blue-500
                to-purple-500
                bg-clip-text
                text-transparent
              ">
                {" "}Top Jobs
              </span>

            </h1>

            {/* Subheading */}
            <p className="
              text-slate-400
              text-lg
              leading-8
              max-w-2xl
              mx-auto
              mt-6
            ">

              Discover amazing career opportunities from top companies
              around the world and take your future to the next level.

            </p>

            {/* Stats */}
            <div className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-6
              mt-10
            ">

              {/* Total Jobs */}
              <div className="
                flex
                items-center
                gap-3
                px-6
                py-4
                rounded-2xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
              ">

                <div className="
                  w-12
                  h-12
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                ">

                  <BriefcaseBusiness className="
                    text-cyan-400
                    w-6
                    h-6
                  " />

                </div>

                <div className="text-left">

                  <h3 className="
                    text-2xl
                    font-bold
                    text-white
                  ">
                    {filterJobs.length}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Jobs Found
                  </p>

                </div>

              </div>

              {/* Search */}
              <div className="
                flex
                items-center
                gap-3
                px-6
                py-4
                rounded-2xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
              ">

                <div className="
                  w-12
                  h-12
                  rounded-xl
                  bg-purple-500/10
                  flex
                  items-center
                  justify-center
                ">

                  <Search className="
                    text-purple-400
                    w-6
                    h-6
                  " />

                </div>

                <div className="text-left">

                  <h3 className="
                    text-lg
                    font-bold
                    text-white
                  ">
                    {searchedQuery || "All Jobs"}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Search Query
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* =========================
              JOB SECTION
      ========================== */}
      <section className="
        relative
        z-10
        pb-20
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            gap-8
          ">

            {/* =========================
                  FILTER SIDEBAR
            ========================== */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="
                w-full
                lg:w-[320px]
                shrink-0
              "
            >
              
              <FilterCard />

            </motion.div>

            {/* =========================
                    JOB LIST
            ========================== */}
            <div className="flex-1">

              {
                filterJobs.length <= 0 ? (

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      min-h-[400px]
                      rounded-[35px]
                      border
                      border-white/10
                      bg-white/5
                      backdrop-blur-2xl
                      text-center
                      p-10
                    "
                  >

                    <div className="
                      w-24
                      h-24
                      rounded-full
                      bg-red-500/10
                      flex
                      items-center
                      justify-center
                      mb-6
                    ">

                      <Search className="
                        text-red-400
                        w-10
                        h-10
                      " />

                    </div>

                    <h2 className="
                      text-3xl
                      font-bold
                      text-white
                    ">
                      No Jobs Found
                    </h2>

                    <p className="
                      text-slate-400
                      mt-4
                      max-w-md
                      leading-7
                    ">

                      Try searching with different keywords
                      or explore other categories.

                    </p>

                  </motion.div>

                ) : (

                  <AnimatePresence>

                    <div className="
                      w-[1000px]
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      xl:grid-cols-3
                      gap-7
                    ">

                      {
                        filterJobs.map((job, index) => (

                          <motion.div
                            key={job?._id}

                            initial={{
                              opacity: 0,
                              y: 40,
                            }}

                            animate={{
                              opacity: 1,
                              y: 0,
                            }}

                            exit={{
                              opacity: 0,
                              scale: 0.9,
                            }}

                            transition={{
                              duration: 0.4,
                              delay: index * 0.05,
                            }}

                            whileHover={{
                              y: -8,
                            }}
                          >

                            <div className="
                              relative
                              h-full
                            ">

                              {/* Glow */}
                              <div className="
                                absolute
                                -inset-1
                                rounded-[35px]
                                bg-linear-to-r
                                from-cyan-500/20
                                via-blue-500/20
                                to-purple-500/20
                                blur-xl
                                opacity-0
                                hover:opacity-100
                                transition-all
                                duration-500
                              "></div>

                              {/* Card */}
                              <div className="
                                relative
                                h-full
                              ">
                                <Job job={job} />
                              </div>

                            </div>

                          </motion.div>

                        ))
                      }

                    </div>

                  </AnimatePresence>

                )
              }

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Jobs;