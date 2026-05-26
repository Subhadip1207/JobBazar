import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';

import {
  Code2,
  Database,
  Globe,
  Palette,
  BarChart3,
  CloudCog,
  Sparkles,
} from 'lucide-react';

import { motion } from "framer-motion";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '../redux/jobSlice';

const category = [
  {
    title: "Frontend Developer",
    icon: <Globe className="w-8 h-8 text-cyan-400" />,
    gradient: "from-cyan-500 to-blue-600",
  },

  {
    title: "Backend Developer",
    icon: <Database className="w-8 h-8 text-purple-400" />,
    gradient: "from-purple-500 to-pink-600",
  },

  {
    title: "FullStack Developer",
    icon: <Code2 className="w-8 h-8 text-blue-400" />,
    gradient: "from-blue-500 to-indigo-600",
  },

  {
    title: "Data Scientist",
    icon: <BarChart3 className="w-8 h-8 text-green-400" />,
    gradient: "from-green-500 to-emerald-600",
  },

  {
    title: "Graphic Designer",
    icon: <Palette className="w-8 h-8 text-pink-400" />,
    gradient: "from-pink-500 to-rose-600",
  },

  {
    title: "DevOps Engineer",
    icon: <CloudCog className="w-8 h-8 text-orange-400" />,
    gradient: "from-orange-500 to-red-600",
  }
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

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

      <div className="relative z-10 max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            mb-6
            backdrop-blur-xl
          ">
            <Sparkles className="w-5 h-5" />
            Explore Opportunities
          </div>

          {/* Title */}
          <h2 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-black
            text-white
            leading-tight
          ">
            Browse By
            <span className="
              bg-linear-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            ">
              {" "}Category
            </span>
          </h2>

          {/* Description */}
          <p className="
            mt-6
            text-slate-400
            text-lg
            max-w-2xl
            mx-auto
            leading-8
          ">
            Explore thousands of jobs across multiple domains
            and discover opportunities tailored to your skills.
          </p>

        </motion.div>

        {/* Carousel */}
        <Carousel className="w-full">

          <CarouselContent className="-ml-2">

            {
              category.map((cat, index) => (
                <CarouselItem
                  key={index}
                  className="
                    pl-2
                    basis-[85%]
                    sm:basis-1/2
                    lg:basis-1/3
                    xl:basis-1/4
                  "
                >

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    onClick={() => searchJobHandler(cat.title)}
                    className="
                      relative
                      group
                      cursor-pointer
                      rounded-[30px]
                      overflow-hidden
                    "
                  >

                    {/* Glow */}
                    <div className={`
                      absolute
                      -inset-1
                      rounded-[30px]
                      bg-linear-to-r
                      ${cat.gradient}
                      opacity-20
                      blur-xl
                      group-hover:opacity-40
                      transition-all
                      duration-500
                    `}></div>

                    {/* Card */}
                    <div className="
                      relative
                      bg-white/5
                      border
                      border-white/10
                      backdrop-blur-2xl
                      rounded-[30px]
                      p-8
                      h-[280px] md:h-[300px]
                      flex
                      flex-col
                      justify-between
                      transition-all
                      duration-500
                      group-hover:border-white/20
                    ">

                      {/* Top Icon */}
                      <div className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-white/10
                        flex
                        items-center
                        justify-center
                        border
                        border-white/10
                        shadow-xl
                      ">
                        {cat.icon}
                      </div>

                      {/* Content */}
                      <div>

                        <h3 className="
                          text-2xl
                          font-bold
                          text-white
                          leading-snug
                        ">
                          {cat.title}
                        </h3>

                        <p className="
                          text-slate-400
                          mt-3
                          leading-7
                        ">
                          Explore jobs, internships and career
                          opportunities in {cat.title}.
                        </p>

                      </div>

                      {/* Bottom Button */}
                      <button
                        className={`
                          mt-6
                          w-full
                          py-3
                          rounded-2xl
                          text-white
                          font-semibold
                          bg-linear-to-r
                          ${cat.gradient}
                          shadow-lg
                          transition-all
                          duration-300
                          hover:scale-105
                        `}
                      >
                        Explore Jobs
                      </button>

                    </div>

                  </motion.div>

                </CarouselItem>
              ))
            }

          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious
            className="
              hidden
              md:flex
              bg-white/10
              border-white/10
              text-white
              hover:bg-white/20
              backdrop-blur-xl
            "
          />

          <CarouselNext
            className="
              hidden
              md:flex
              bg-white/10
              border-white/10
              text-white
              hover:bg-white/20
              backdrop-blur-xl
            "
          />

        </Carousel>

      </div>
    </section>
  );
};

export default CategoryCarousel;