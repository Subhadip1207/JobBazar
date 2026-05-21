import React from 'react';
import LatestJobCards from './LatestJobCards';

import {
  Sparkles,
  BriefcaseBusiness,
  TrendingUp,
} from 'lucide-react';

import { useSelector } from 'react-redux';
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="
      relative
      py-24
      overflow-hidden
      bg-[#030712]
    ">

      {/* Background Glow */}
      <div className="
        absolute
        top-0
        left-0
        w-80
        h-80
        bg-cyan-500/10
        blur-3xl
        rounded-full
      "></div>

      <div className="
        absolute
        bottom-0
        right-0
        w-80
        h-80
        bg-purple-500/10
        blur-3xl
        rounded-full
      "></div>

      {/* Grid Effect */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "></div>

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      ">

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
            text-cyan-300
            backdrop-blur-xl
            mb-6
          ">

            <Sparkles className="w-5 h-5" />
            Trending Opportunities

          </div>

          {/* Heading */}
          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-black
            text-white
            leading-tight
          ">

            Latest & Top
            <span className="
              bg-linear-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            ">
              {" "}Job Openings
            </span>

          </h1>

          {/* Description */}
          <p className="
            mt-6
            max-w-3xl
            mx-auto
            text-slate-400
            text-lg
            leading-8
          ">
            Discover the newest job opportunities from top companies
            around the world and take the next step in your career journey.
          </p>

          {/* Stats */}
          <div className="
            mt-12
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            max-w-4xl
            mx-auto
          ">

            {/* Stat 1 */}
            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
              backdrop-blur-xl
              shadow-xl
              hover:scale-105
              transition-all
              duration-300
            ">

              <BriefcaseBusiness className="
                w-10
                h-10
                text-cyan-400
                mx-auto
                mb-4
              " />

              <h2 className="
                text-3xl
                font-bold
                text-white
              ">
                {allJobs.length}+
              </h2>

              <p className="text-slate-400 mt-2">
                Active Jobs
              </p>

            </div>

            {/* Stat 2 */}
            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
              backdrop-blur-xl
              shadow-xl
              hover:scale-105
              transition-all
              duration-300
            ">

              <TrendingUp className="
                w-10
                h-10
                text-purple-400
                mx-auto
                mb-4
              " />

              <h2 className="
                text-3xl
                font-bold
                text-white
              ">
                95%
              </h2>

              <p className="text-slate-400 mt-2">
                Hiring Rate
              </p>

            </div>

            {/* Stat 3 */}
            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
              backdrop-blur-xl
              shadow-xl
              hover:scale-105
              transition-all
              duration-300
            ">

              <Sparkles className="
                w-10
                h-10
                text-pink-400
                mx-auto
                mb-4
              " />

              <h2 className="
                text-3xl
                font-bold
                text-white
              ">
                Top
              </h2>

              <p className="text-slate-400 mt-2">
                Companies
              </p>

            </div>

          </div>

        </motion.div>

        {/* Jobs Grid */}
        {
          allJobs.length <= 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                flex
                flex-col
                items-center
                justify-center
                py-24
                text-center
              "
            >

              <div className="
                w-24
                h-24
                rounded-full
                bg-white/5
                border
                border-white/10
                flex
                items-center
                justify-center
                mb-6
              ">

                <BriefcaseBusiness className="
                  text-slate-400
                  w-10
                  h-10
                " />

              </div>

              <h2 className="
                text-3xl
                font-bold
                text-white
              ">
                No Jobs Available
              </h2>

              <p className="
                text-slate-400
                mt-4
                max-w-md
              ">
                There are currently no job openings available.
                Please check again later.
              </p>

            </motion.div>
          ) : (
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            ">

              {
                allJobs.slice(0, 6).map((job, index) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="
                      relative
                      group
                    "
                  >

                    {/* Glow Effect */}
                    <div className="
                      absolute
                      -inset-1
                      rounded-[30px]
                      bg-linear-to-r
                      from-cyan-500/20
                      via-blue-500/20
                      to-purple-500/20
                      blur-xl
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                    "></div>

                    {/* Card */}
                    <div className="relative z-10">
                      <LatestJobCards job={job} />
                    </div>

                  </motion.div>
                ))
              }

            </div>
          )
        }

      </div>
    </section>
  );
};

export default LatestJobs;