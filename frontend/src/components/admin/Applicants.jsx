import React, { useEffect } from 'react';
import Navbar from '../ui/shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { Application_API_ENDPOINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';

import {
  Users,
  BriefcaseBusiness,
  Sparkles,
  Activity,
  ShieldCheck,
} from 'lucide-react';

import { motion } from 'framer-motion';

const Applicants = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${Application_API_ENDPOINT}/${id}/applicants`,
          {
            withCredentials: true,
          }
        );

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to fetch applicants. Please try again."
        );
      }
    };

    if (id) fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">
      {/* Navbar */}
      <Navbar />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-600/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-pink-500/10 rounded-full blur-3xl"></div>

        {/* Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-3 h-3 rounded-full bg-violet-400 animate-ping"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-8
            shadow-[0_0_60px_rgba(0,255,255,0.08)]
            mb-8
          "
        >
          {/* Glow Border */}
          <div className="absolute inset-0 rounded-[40px] border border-cyan-400/10"></div>

          {/* Decorative */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-violet-600/20 blur-3xl rounded-full"></div>

          {/* Header Content */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left */}
            <div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="
                  inline-flex
                  items-center
                  gap-3
                  px-5
                  py-2
                  rounded-full
                  bg-cyan-500/10
                  border
                  border-cyan-400/20
                  mb-5
                "
              >
                <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />

                <span className="text-cyan-300 text-sm font-semibold">
                  Recruitment Dashboard
                </span>
              </motion.div>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  leading-tight
                  bg-gradient-to-r
                  from-cyan-300
                  via-white
                  to-violet-300
                  bg-clip-text
                  text-transparent
                "
              >
                Manage Job
                <br />
                Applicants Easily
              </h1>

              <p className="text-slate-400 mt-5 max-w-2xl leading-relaxed">
                Review applicants, shortlist candidates, and manage hiring
                workflows with a modern cyberpunk recruitment experience.
              </p>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Applicants */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  backdrop-blur-xl
                  min-w-[180px]
                "
              >
                <div className="flex items-center justify-between">
                  <Users className="text-cyan-300 w-8 h-8" />

                  <Activity className="text-green-400 w-5 h-5 animate-pulse" />
                </div>

                <h2 className="text-3xl font-black text-white mt-5">
                  {applicants?.applications?.length || 0}
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Total Applicants
                </p>
              </motion.div>

              {/* Active Job */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  backdrop-blur-xl
                  min-w-[180px]
                "
              >
                <div className="flex items-center justify-between">
                  <BriefcaseBusiness className="text-violet-300 w-8 h-8" />

                  <ShieldCheck className="text-cyan-400 w-5 h-5 animate-pulse" />
                </div>

                <h2 className="text-3xl font-black text-white mt-5">
                  01
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Active Hiring
                </p>
              </motion.div>

              {/* Status */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-5
                  backdrop-blur-xl
                  min-w-[180px]
                "
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="text-pink-300 w-8 h-8 animate-pulse" />

                  <div className="h-3 w-3 rounded-full bg-green-400 animate-ping"></div>
                </div>

                <h2 className="text-3xl font-black text-white mt-5">
                  Live
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Recruitment Status
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Applicants Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-4
            shadow-[0_0_40px_rgba(168,85,247,0.12)]
          "
        >
          {/* Section Glow */}
          <div className="absolute inset-0 rounded-[36px] border border-violet-400/10"></div>

          {/* Table Header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-black text-white">
                Applicants List
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Review and manage all job applications
              </p>
            </div>

            <div
              className="
                px-5
                py-2
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500/20
                to-violet-500/20
                border
                border-white/10
                text-white
                font-semibold
              "
            >
              {applicants?.applications?.length || 0} Candidates
            </div>
          </div>

          {/* Table */}
          <div className="mt-4">
            <ApplicantsTable />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Applicants;