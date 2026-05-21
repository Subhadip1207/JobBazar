import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyBytext } from "../../redux/companySlice";

import {
  Building2,
  Plus,
  Search,
  Sparkles,
  BriefcaseBusiness
} from 'lucide-react';

import { motion } from 'framer-motion';

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyBytext(input));
  }, [input, dispatch]);

  return (
    <div
      className="
        min-h-screen
        bg-[#020617]
        relative
        overflow-hidden
      "
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/20 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      {/* Grid Overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
          bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      ></div>

      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-8
            md:p-10
            shadow-[0_0_60px_rgba(139,92,246,0.25)]
            mb-10
          "
        >
          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-violet-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Left Content */}
            <div className="max-w-2xl">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-violet-500/10
                  border
                  border-violet-400/20
                  mb-6
                "
              >
                <Sparkles className="w-4 h-4 text-violet-300 animate-pulse" />

                <span className="text-sm font-semibold text-violet-200">
                  Company Management Dashboard
                </span>
              </div>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  leading-tight
                  text-white
                "
              >
                Manage Your
                <span
                  className="
                    bg-gradient-to-r
                    from-cyan-400
                    via-violet-400
                    to-pink-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  {" "}
                  Companies
                </span>
              </h1>

              <p className="mt-5 text-slate-300 text-base md:text-lg leading-relaxed">
                Create, manage, and organize your companies with a modern
                recruiter dashboard experience.
              </p>
            </div>

            {/* Right Icon */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity
              }}
              className="
                hidden
                lg:flex
                items-center
                justify-center
                w-40
                h-40
                rounded-full
                bg-gradient-to-br
                from-violet-500/20
                to-cyan-500/20
                border
                border-white/10
                shadow-[0_0_50px_rgba(59,130,246,0.3)]
              "
            >
              <BriefcaseBusiness className="w-20 h-20 text-cyan-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Search + Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
            mb-8
          "
        >
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-xl group">
            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-pink-500
                opacity-20
                blur-xl
                group-hover:opacity-40
                transition-all
                duration-500
              "
            ></div>

            <div
              className="
                relative
                flex
                items-center
                bg-slate-900/80
                border
                border-white/10
                rounded-3xl
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <Search className="w-5 h-5 text-cyan-300 mr-3" />

              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search companies by name..."
                className="
                  border-none
                  bg-transparent
                  text-white
                  placeholder:text-slate-400
                  focus-visible:ring-0
                  focus-visible:ring-offset-0
                  text-base
                "
              />
            </div>
          </div>

          {/* New Company Button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button
              onClick={() => navigate("/admin/companies/create")}
              className="
                relative
                overflow-hidden
                h-14
                px-8
                rounded-2xl
                border
                border-white/10
                bg-gradient-to-r
                from-violet-600
                to-cyan-500
                hover:from-violet-500
                hover:to-cyan-400
                text-white
                font-semibold
                text-base
                shadow-[0_0_30px_rgba(139,92,246,0.5)]
                transition-all
                duration-500
              "
            >
              <span className="relative z-10 flex items-center gap-3">
                <Plus className="w-5 h-5" />
                New Company
              </span>

              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                  opacity-0
                  hover:opacity-100
                  transition-all
                  duration-500
                "
              ></div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            mb-10
          "
        >
          {[
            {
              title: "Total Companies",
              value: "50+",
              icon: <Building2 className="w-6 h-6 text-cyan-300" />,
              glow: "from-cyan-500/20 to-blue-500/20"
            },
            {
              title: "Active Recruiters",
              value: "120+",
              icon: <BriefcaseBusiness className="w-6 h-6 text-violet-300" />,
              glow: "from-violet-500/20 to-pink-500/20"
            },
            {
              title: "Growing Network",
              value: "24/7",
              icon: <Sparkles className="w-6 h-6 text-pink-300" />,
              glow: "from-pink-500/20 to-orange-500/20"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -6,
                scale: 1.02
              }}
              className={`
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-gradient-to-br
                ${item.glow}
                backdrop-blur-xl
                p-6
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm mb-2">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-black text-white">
                    {item.value}
                  </h2>
                </div>

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-slate-900/60
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  {item.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Companies Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="
            relative
            overflow-hidden
            rounded-[35px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-6
            md:p-8
            shadow-[0_0_40px_rgba(0,0,0,0.35)]
          "
        >
          {/* Glow Border */}
          <div
            className="
              absolute
              inset-0
              rounded-[35px]
              border
              border-cyan-400/10
              pointer-events-none
            "
          ></div>

          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="
                p-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-500
                shadow-lg
              "
            >
              <Building2 className="text-white w-5 h-5" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Companies List
              </h2>

              <p className="text-slate-400 text-sm">
                All registered companies appear here
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <CompaniesTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Companies;