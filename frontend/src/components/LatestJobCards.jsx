import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import React from "react";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  ArrowUpRight,
  Building2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        scale: 1.02,
      }}
      onClick={() => navigate(`/description/${job._id}`)}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        p-[1px]
        bg-gradient-to-br
        from-cyan-400/40
        via-purple-500/40
        to-pink-500/40
        shadow-[0_10px_50px_rgba(124,58,237,0.25)]
        group
        cursor-pointer
      "
    >
      {/* Main Card */}
      <div
        className="
          relative
          h-full
          rounded-[32px]
          bg-gradient-to-br
          from-[#0f172a]
          via-[#111827]
          to-[#1e1b4b]
          backdrop-blur-2xl
          p-6
          overflow-hidden
        "
      >
        {/* Animated Glow Background */}
        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]
            w-72
            h-72
            bg-cyan-500/20
            rounded-full
            blur-3xl
            group-hover:scale-150
            transition-all
            duration-700
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            left-[-120px]
            w-72
            h-72
            bg-purple-600/20
            rounded-full
            blur-3xl
            group-hover:scale-150
            transition-all
            duration-700
          "
        />

        {/* Floating Border */}
        <div
          className="
            absolute
            inset-0
            rounded-[32px]
            border
            border-white/10
          "
        />

        <div className="relative z-10">
          {/* Top Row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 6, scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar
                  className="
                    h-16
                    w-16
                    border-2
                    border-cyan-400/40
                    shadow-[0_0_25px_rgba(34,211,238,0.4)]
                  "
                >
                  <AvatarImage
                    src={
                      job?.company?.logo ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWiPu00wbVz5jz6xBReP01GJVw5wGH_06qw&s"
                    }
                  />
                </Avatar>
              </motion.div>

              <div>
                <h1
                  className="
                    text-xl
                    font-black
                    text-white
                    group-hover:text-cyan-300
                    transition-all
                    duration-300
                  "
                >
                  {job?.company?.name}
                </h1>

                <div className="flex items-center gap-1 text-sm text-slate-300 mt-1">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{job?.location || "India"}</span>
                </div>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                text-cyan-300
                text-xs
                font-semibold
                backdrop-blur-lg
              "
            >
              <Clock3 className="w-3.5 h-3.5" />

              {daysAgoFunction(job?.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(job?.createdAt)}d ago`}
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />

              <span className="text-sm text-yellow-300 font-medium">
                Featured Opportunity
              </span>
            </div>

            <h2
              className="
                text-3xl
                font-black
                text-white
                leading-tight
                mb-4
                group-hover:text-cyan-300
                transition-all
                duration-300
              "
            >
              {job?.title}
            </h2>

            <p className="text-slate-300 text-sm leading-7 line-clamp-3">
              {job?.description}
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-md
                p-4
                text-center
              "
            >
              <BriefcaseBusiness className="w-6 h-6 mx-auto text-cyan-400 mb-2" />

              <p className="text-xs text-slate-400">Positions</p>

              <h3 className="font-bold text-cyan-300 text-lg">
                {job?.position}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-md
                p-4
                text-center
              "
            >
              <Building2 className="w-6 h-6 mx-auto text-pink-400 mb-2" />

              <p className="text-xs text-slate-400">Type</p>

              <h3 className="font-bold text-pink-300 text-sm">
                {job?.jobType}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                backdrop-blur-md
                p-4
                text-center
              "
            >
              <IndianRupee className="w-6 h-6 mx-auto text-purple-400 mb-2" />

              <p className="text-xs text-slate-400">Salary</p>

              <h3 className="font-bold text-purple-300 text-sm">
                {job?.salary} LPA
              </h3>
            </motion.div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-7">
            <Badge
              className="
                bg-cyan-500/15
                text-cyan-300
                border
                border-cyan-400/20
                rounded-full
                px-4
                py-1.5
                hover:bg-cyan-500/25
              "
            >
              {job?.position} Positions
            </Badge>

            <Badge
              className="
                bg-pink-500/15
                text-pink-300
                border
                border-pink-400/20
                rounded-full
                px-4
                py-1.5
                hover:bg-pink-500/25
              "
            >
              {job?.jobType}
            </Badge>

            <Badge
              className="
                bg-purple-500/15
                text-purple-300
                border
                border-purple-400/20
                rounded-full
                px-4
                py-1.5
                hover:bg-purple-500/25
              "
            >
              {job?.salary} LPA
            </Badge>
          </div>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-blue-500
              to-purple-600
              px-6
              py-4
              text-white
              font-bold
              shadow-[0_10px_40px_rgba(59,130,246,0.45)]
            "
          >
            <div
              className="
                absolute
                inset-0
                bg-white/10
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-500
              "
            />

            <div className="relative flex items-center justify-between">
              <span className="tracking-wide">
                Explore Opportunity
              </span>

              <ArrowUpRight
                className="
                  w-5
                  h-5
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                  transition-all
                  duration-300
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;