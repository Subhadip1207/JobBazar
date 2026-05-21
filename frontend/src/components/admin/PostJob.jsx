import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import {
  Loader2,
  BriefcaseBusiness,
  Sparkles,
  Building2,
  MapPin,
  IndianRupee,
  Layers3,
  Users,
  FileText,
  Rocket,
  Wand2
} from 'lucide-react';

import { useSelector } from 'react-redux';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from 'axios';
import axiosInstance from "../../utils/axiosInstance.js";
import { JOB_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostJob = () => {

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);

  const { companies } = useSelector(store => store.company);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    if (selectedCompany) {
      setInput({
        ...input,
        companyId: selectedCompany._id
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );
      const res = await axiosInstance.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong while posting the job"
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Job Title",
      name: "title",
      icon: <BriefcaseBusiness className="w-5 h-5 text-cyan-400" />,
      placeholder: "Frontend Developer"
    },
    {
      label: "Description",
      name: "description",
      icon: <FileText className="w-5 h-5 text-violet-400" />,
      placeholder: "Describe the role..."
    },
    {
      label: "Requirements",
      name: "requirements",
      icon: <Layers3 className="w-5 h-5 text-pink-400" />,
      placeholder: "React, Node.js..."
    },
    {
      label: "Salary",
      name: "salary",
      icon: <IndianRupee className="w-5 h-5 text-emerald-400" />,
      placeholder: "12"
    },
    {
      label: "Location",
      name: "location",
      icon: <MapPin className="w-5 h-5 text-orange-400" />,
      placeholder: "Bangalore"
    },
    {
      label: "Job Type",
      name: "jobType",
      icon: <Sparkles className="w-5 h-5 text-yellow-400" />,
      placeholder: "Full Time"
    },
    {
      label: "Experience",
      name: "experience",
      icon: <Rocket className="w-5 h-5 text-cyan-400" />,
      placeholder: "2"
    },
    {
      label: "Positions",
      name: "position",
      icon: <Users className="w-5 h-5 text-violet-400" />,
      placeholder: "5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute top-40 right-0 w-[350px] h-[350px] bg-violet-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-pink-500/10 blur-3xl rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity
            }}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="px-4 py-10 relative z-10">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            max-w-6xl
            mx-auto
            mb-10
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-8
            md:p-10
            shadow-[0_0_60px_rgba(0,0,0,0.5)]
          "
        >
          <div className="absolute -top-24 -left-20 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-60 h-60 bg-violet-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            {/* Badge */}
            <div
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
              AI Recruitment Portal
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl
                md:text-6xl
                font-black
                leading-tight
                text-white
                max-w-4xl
              "
            >
              Create Your
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
                {" "}New Job{" "}
              </span>
              Posting
            </h1>

            <p
              className="
                mt-5
                text-slate-300
                text-lg
                max-w-2xl
                leading-relaxed
              "
            >
              Attract top talents with beautifully designed
              futuristic job listings.
            </p>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="
            max-w-6xl
            mx-auto
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-slate-950/80
            backdrop-blur-2xl
            shadow-[0_0_70px_rgba(0,0,0,0.6)]
            p-6
            md:p-10
          "
        >
          {/* Glow */}
          <div className="absolute -top-20 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-500/10 blur-3xl rounded-full"></div>

          {/* Heading */}
          <div className="relative z-10 flex items-center gap-4 mb-10">
            <div
              className="
                p-4
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-600
                shadow-lg
              "
            >
              <Wand2 className="w-6 h-6 text-white" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-white">
                Post New Job
              </h2>

              <p className="text-slate-400 mt-1">
                Fill the details below carefully
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {fields.map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-5
                    hover:border-cyan-400/30
                    transition-all
                    duration-300
                  "
                >
                  <Label className="text-slate-300 mb-3 block">
                    {field.label}
                  </Label>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      {field.icon}
                    </div>

                    <Input
                      type={field.name === "position" ? "number" : "text"}
                      name={field.name}
                      value={input[field.name]}
                      onChange={changeEventHandler}
                      placeholder={field.placeholder}
                      className="
                        h-14
                        pl-12
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-900/80
                        text-white
                        placeholder:text-slate-500
                        focus-visible:ring-2
                        focus-visible:ring-cyan-500
                        focus-visible:border-cyan-500
                      "
                    />
                  </div>
                </motion.div>
              ))}

              {/* Company Select */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="
                  md:col-span-2
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-5
                "
              >
                <Label className="text-slate-300 mb-3 block">
                  Select Company
                </Label>

                {companies.length > 0 ? (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger
                      className="
                        w-full
                        h-14
                        rounded-2xl
                        border
                        border-white/10
                        bg-slate-900/80
                        text-white
                      "
                    >
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>

                    <SelectContent
                      className="
                        border
                        border-white/10
                        bg-slate-900
                        text-white
                      "
                    >
                      <SelectGroup>
                        <SelectLabel className="text-slate-400">
                          Companies
                        </SelectLabel>

                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-cyan-400" />
                              {company.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-red-400 font-medium">
                    * Please register a company first.
                  </p>
                )}
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              {loading ? (
                <Button
                  disabled
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    via-violet-500
                    to-pink-500
                    text-white
                    text-lg
                    font-semibold
                  "
                >
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Posting Job...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    via-violet-500
                    to-pink-500
                    hover:opacity-90
                    text-white
                    text-lg
                    font-bold
                    shadow-[0_0_30px_rgba(139,92,246,0.5)]
                    transition-all
                    duration-300
                  "
                >
                  <Rocket className="mr-2 w-5 h-5" />
                  Post New Job
                </Button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJob;