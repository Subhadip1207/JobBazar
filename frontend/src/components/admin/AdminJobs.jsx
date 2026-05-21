import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/usegetAllAdminJobs';
import { setSearchJobByText } from "../../redux/jobSlice";

import {
  Search,
  BriefcaseBusiness,
  Sparkles,
  Plus,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

import { motion } from 'framer-motion';

const AdminJobs = () => {
  useGetAllAdminJobs();

  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
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
      <Navbar />

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-pink-500/10 blur-3xl rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity
            }}
            className="
              absolute
              w-1.5
              h-1.5
              bg-cyan-400
              rounded-full
            "
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10'>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-8
            md:p-10
            shadow-[0_0_60px_rgba(0,0,0,0.5)]
            mb-10
          "
        >
          {/* Hero Glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-60 h-60 bg-violet-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            {/* TOP BADGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                border
                border-cyan-400/30
                bg-cyan-500/10
                text-cyan-300
                text-sm
                font-semibold
                mb-6
              "
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              AI Powered Recruitment Dashboard
            </motion.div>

            {/* HEADING */}
            <div className="max-w-3xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="
                  text-4xl
                  md:text-6xl
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
                  {" "}Jobs{" "}
                </span>
                Like a Pro
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="
                  mt-5
                  text-slate-300
                  text-lg
                  leading-relaxed
                "
              >
                Create, manage, edit and monitor all your job
                postings with a futuristic admin experience.
              </motion.p>
            </div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-5
                mt-10
              "
            >
              {[
                {
                  icon: <BriefcaseBusiness className="w-6 h-6 text-cyan-400" />,
                  title: "Jobs Posted",
                  value: "100+"
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-violet-400" />,
                  title: "Applications",
                  value: "20K+"
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-pink-400" />,
                  title: "Verified Recruiters",
                  value: "500+"
                }
              ].map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  key={index}
                  className="
                    p-5
                    rounded-3xl
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                  "
                >
                  <div className="mb-4">
                    {item.icon}
                  </div>

                  <h2 className="text-white font-bold text-2xl">
                    {item.value}
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* SEARCH + BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-5
            mb-8
          "
        >
          {/* SEARCH BAR */}
          <div className="relative w-full lg:w-[70%]">
            <Search
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-cyan-400
                w-5
                h-5
              "
            />

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search jobs, companies, roles..."
              className="
                h-14
                rounded-2xl
                border
                border-white/10
                bg-white/5
                pl-14
                text-white
                placeholder:text-slate-400
                backdrop-blur-xl
                focus-visible:ring-2
                focus-visible:ring-cyan-500
                focus-visible:border-cyan-500
                transition-all
                duration-300
              "
            />
          </div>

          {/* NEW JOB BUTTON */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full lg:w-auto"
          >
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="
                w-full
                lg:w-auto
                h-14
                px-8
                rounded-2xl
                text-white
                font-semibold
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-pink-500
                hover:opacity-90
                shadow-[0_0_30px_rgba(139,92,246,0.5)]
                transition-all
                duration-300
                border-0
              "
            >
              <Plus className="mr-2 w-5 h-5" />
              Create New Job
            </Button>
          </motion.div>
        </motion.div>

        {/* TABLE */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <AdminJobsTable />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminJobs;