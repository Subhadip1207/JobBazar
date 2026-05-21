import React, { useState, useEffect } from "react";

import Navbar from "./ui/shared/Navbar";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

import { Button } from "./ui/button";

import {
  Contact,
  Mail,
  Pen,
  Sparkles,
  FileText,
  Award,
  BriefcaseBusiness,
  User2,
  Phone,
  Download,
  CheckCircle2,
} from "lucide-react";

import { Badge } from './ui/badge';

import { Label } from './ui/label';

import AppliedJobTable from "./AppliedJobTable";

import UpdateProfileDialog from './UpdateProfileDialog';

import { useSelector } from "react-redux";

import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

import { motion } from "framer-motion";

const Profile = () => {

  useGetAppliedJobs();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    console.log("User changed in Profile:", user);
  }, [user]);

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

      {/* Grid */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "></div>

      {/* Glow Effects */}
      <div className="
        absolute
        top-0
        left-0
        w-[450px]
        h-[450px]
        bg-cyan-500/10
        blur-3xl
        rounded-full
      "></div>

      <div className="
        absolute
        bottom-0
        right-0
        w-[450px]
        h-[450px]
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
          top-32
          right-24
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
                PROFILE CARD
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
            shadow-2xl
          "
        >

          {/* Gradient Overlay */}
          <div className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]
          "></div>

          <div className="relative z-10">

            {/* TOP SECTION */}
            <div className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
            ">

              {/* LEFT */}
              <div className="
                flex
                flex-col
                sm:flex-row
                items-center
                sm:items-start
                gap-6
              ">

                {/* Avatar */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                    relative
                  "
                >

                  {/* Glow */}
                  <div className="
                    absolute
                    -inset-2
                    rounded-full
                    bg-linear-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-600
                    blur-xl
                    opacity-60
                  "></div>

                  <Avatar className="
                    relative
                    w-36
                    h-36
                    rounded-full
                    border-4
                    border-white/20
                    overflow-hidden
                    shadow-2xl
                  ">

                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  </Avatar>

                </motion.div>

                {/* User Info */}
                <div className="
                  text-center
                  sm:text-left
                ">

                  {/* Badge */}
                  <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    text-cyan-300
                    mb-5
                  ">

                    <Sparkles className="w-4 h-4" />

                    Professional Profile

                  </div>

                  {/* Name */}
                  <h1 className="
                    text-4xl
                    sm:text-5xl
                    font-black
                    text-white
                  ">

                    {user?.fullName || "N/A"}

                  </h1>

                  {/* Bio */}
                  <p className="
                    text-slate-300
                    text-lg
                    leading-8
                    mt-5
                    max-w-2xl
                  ">

                    {user?.profile?.bio ||
                      "No bio available."}

                  </p>

                  {/* Contact */}
                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:flex-wrap
                    gap-4
                    mt-8
                  ">

                    <div className="
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                    ">

                      <Mail className="
                        text-cyan-400
                        w-5
                        h-5
                      " />

                      <span className="
                        text-slate-300
                      ">
                        {user?.email || "N/A"}
                      </span>

                    </div>

                    <div className="
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                    ">

                      <Phone className="
                        text-purple-400
                        w-5
                        h-5
                      " />

                      <span className="
                        text-slate-300
                      ">
                        {user?.phoneNumber || "N/A"}
                      </span>

                      

                    </div>

                    <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >

                <Button

                  onClick={() => setOpen(true)}

                  className="
                    h-14
                    px-8
                    rounded-2xl
                    text-lg
                    font-semibold
                    bg-linear-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-600
                    hover:opacity-90
                    shadow-2xl
                  "
                >

                  <Pen className="
                    h-5
                    w-5
                    mr-2
                  " />

                  Edit Profile

                </Button>

              </motion.div>

                  </div>

                </div>

              </div>

              {/* EDIT BUTTON */}
              {/* <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >

                <Button

                  onClick={() => setOpen(true)}

                  className="
                    h-14
                    px-8
                    rounded-2xl
                    text-lg
                    font-semibold
                    bg-linear-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-600
                    hover:opacity-90
                    shadow-2xl
                  "
                >

                  <Pen className="
                    h-5
                    w-5
                    mr-2
                  " />

                  Edit Profile

                </Button>

              </motion.div> */}

            </div>

            {/* ===================================
                    SKILLS + RESUME
            =================================== */}

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-8
              mt-12
            ">

              {/* Skills */}
              <motion.div

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}

                className="
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-7
                "
              >

                {/* Heading */}
                <div className="
                  flex
                  items-center
                  gap-4
                  mb-6
                ">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-linear-to-r
                    from-cyan-500
                    to-blue-600
                    flex
                    items-center
                    justify-center
                  ">

                    <Award className="
                      text-white
                      w-6
                      h-6
                    " />

                  </div>

                  <div>

                    <h2 className="
                      text-2xl
                      font-bold
                      text-white
                    ">
                      Skills
                    </h2>

                    <p className="
                      text-slate-400
                    ">
                      Technologies & expertise
                    </p>

                  </div>

                </div>

                {/* Skills */}
                <div className="
                  flex
                  flex-wrap
                  gap-3
                ">

                  {
                    user?.profile?.skills?.length > 0 ? (

                      user.profile.skills.map((skill, i) => (

                        <motion.div
                          key={i}
                          whileHover={{
                            scale: 1.08,
                          }}
                        >

                          <Badge className="
                            px-5
                            py-2
                            rounded-full
                            border-0
                            bg-linear-to-r
                            from-cyan-500
                            to-blue-600
                            text-white
                            text-sm
                            shadow-lg
                          ">

                            {skill}

                          </Badge>

                        </motion.div>

                      ))

                    ) : (

                      <span className="
                        text-slate-400
                      ">
                        No skills added.
                      </span>

                    )
                  }

                </div>

              </motion.div>

              {/* Resume */}
              <motion.div

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}

                className="
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-7
                "
              >

                {/* Heading */}
                <div className="
                  flex
                  items-center
                  gap-4
                  mb-6
                ">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-linear-to-r
                    from-purple-500
                    to-pink-500
                    flex
                    items-center
                    justify-center
                  ">

                    <FileText className="
                      text-white
                      w-6
                      h-6
                    " />

                  </div>

                  <div>

                    <h2 className="
                      text-2xl
                      font-bold
                      text-white
                    ">
                      Resume
                    </h2>

                    <p className="
                      text-slate-400
                    ">
                      Your uploaded CV / Resume
                    </p>

                  </div>

                </div>

                {
                  user?.profile?.resume &&
                  user?.profile?.resumeOriginalName ? (

                    <motion.a

                      whileHover={{
                        scale: 1.02,
                      }}

                      href={user.profile.resume}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/5
                        p-5
                        hover:border-cyan-500/30
                        transition-all
                        duration-300
                      "
                    >

                      <div className="
                        flex
                        items-center
                        gap-4
                      ">

                        <div className="
                          w-12
                          h-12
                          rounded-xl
                          bg-linear-to-r
                          from-cyan-500
                          to-blue-600
                          flex
                          items-center
                          justify-center
                        ">

                          <FileText className="
                            text-white
                            w-5
                            h-5
                          " />

                        </div>

                        <div>

                          <h3 className="
                            font-semibold
                            text-white
                          ">
                            {
                              user.profile
                                .resumeOriginalName
                            }
                          </h3>

                          <p className="
                            text-slate-400
                            text-sm
                          ">
                            Click to view resume
                          </p>

                        </div>

                      </div>

                      <Download className="
                        text-cyan-400
                      " />

                    </motion.a>

                  ) : (

                    <div className="
                      rounded-2xl
                      border
                      border-dashed
                      border-white/10
                      p-8
                      text-center
                    ">

                      <FileText className="
                        w-12
                        h-12
                        text-slate-500
                        mx-auto
                        mb-4
                      " />

                      <p className="
                        text-slate-400
                      ">
                        No resume uploaded.
                      </p>

                    </div>

                  )
                }

              </motion.div>

            </div>

          </div>

        </motion.div>

        {/* ===================================
                APPLIED JOBS
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
            delay: 0.3,
          }}

          className="
            mt-10
            rounded-[35px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            p-8
            shadow-2xl
          "
        >

          {/* Heading */}
          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
            mb-8
          ">

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                rounded-2xl
                bg-linear-to-r
                from-cyan-500
                to-purple-600
                flex
                items-center
                justify-center
              ">

                <BriefcaseBusiness className="
                  text-white
                  w-6
                  h-6
                " />

              </div>

              <div>

                <h2 className="
                  text-3xl
                  font-bold
                  text-white
                ">
                  Applied Jobs
                </h2>

                <p className="
                  text-slate-400
                ">
                  Track your applications
                </p>

              </div>

            </div>

            <div className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              bg-green-500/10
              border
              border-green-500/20
              text-green-300
            ">

              <CheckCircle2 className="
                w-5
                h-5
              " />

              Active Applications

            </div>

          </div>

          {/* Table */}
          <div className="
            overflow-x-auto
          ">
            <AppliedJobTable />
          </div>

        </motion.div>

      </div>

      {/* Dialog */}
      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
      />

    </div>

  );
};

export default Profile;