import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
<<<<<<< HEAD

import axios from "axios";

=======
import axiosInstance from "../../../utils/axiosInstance.js";
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9
import { USER_API_ENDPOINT } from "../../../utils/constant";

import { setUser } from "../../../redux/authSlice";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

<<<<<<< HEAD
  const dispatch = useDispatch();
=======
    const logoutHandler = async () => {
        try {
            const res = await axiosInstance.get(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true,
            });
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${USER_API_ENDPOINT}/logout`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);

        dispatch(setUser(null));

        navigate("/");

        localStorage.removeItem("user");

      } else {
        toast.error("Logout failed");
      }

    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error?.response?.data?.message ||
        "Server error during logout"
      );
    }
  };

  return (
    <header className="
      sticky
      top-0
      z-50
      border-b
      border-white/10
      bg-[#030712]/80
      backdrop-blur-2xl
      shadow-lg
    ">

      {/* Background Glow */}
      <div className="
        absolute
        top-0
        left-0
        w-60
        h-60
        bg-cyan-500/10
        blur-3xl
        rounded-full
      "></div>

      <div className="
        absolute
        top-0
        right-0
        w-60
        h-60
        bg-purple-500/10
        blur-3xl
        rounded-full
      "></div>

      {/* Navbar */}
      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      ">

        <div className="
          flex
          items-center
          justify-between
          h-20
        ">

          {/* LOGO */}
          <Link to="/">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="
                flex
                items-center
                gap-3
              "
            >

              {/* Logo Icon */}
              <div className="
                w-12
                h-12
                rounded-2xl
                bg-linear-to-r
                from-cyan-500
                to-blue-600
                flex
                items-center
                justify-center
                shadow-xl
              ">

                <BriefcaseBusiness className="
                  text-white
                  w-6
                  h-6
                " />

              </div>

              {/* Logo Text */}
              <div>

                <h1 className="
                  text-2xl
                  font-black
                  text-white
                  tracking-wide
                ">
                  Job
                  <span className="
                    bg-linear-to-r
                    from-cyan-400
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  ">
                    Bazar
                  </span>
                </h1>

                <p className="
                  text-xs
                  text-slate-400
                  tracking-widest
                ">
                  DREAM JOB PLATFORM
                </p>

              </div>

            </motion.div>

          </Link>

          {/* DESKTOP NAV */}
          <div className="
            hidden
            md:flex
            items-center
            gap-10
          ">

            {/* NAV LINKS */}
            <ul className="
              flex
              items-center
              gap-8
              text-sm
              font-medium
            ">

              {
                user?.role === "recruiter" ? (
                  <>
                    <li>
                      <Link
                        to="/admin/companies"
                        className="
                          text-slate-300
                          hover:text-cyan-400
                          transition-all
                          duration-300
                        "
                      >
                        Companies
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/jobs"
                        className="
                          text-slate-300
                          hover:text-cyan-400
                          transition-all
                          duration-300
                        "
                      >
                        Jobs
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/"
                        className="
                          text-slate-300
                          hover:text-cyan-400
                          transition-all
                          duration-300
                        "
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/jobs"
                        className="
                          text-slate-300
                          hover:text-cyan-400
                          transition-all
                          duration-300
                        "
                      >
                        Jobs
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/browse"
                        className="
                          text-slate-300
                          hover:text-cyan-400
                          transition-all
                          duration-300
                        "
                      >
                        Browse
                      </Link>
                    </li>
                  </>
                )
              }

            </ul>

            {/* AUTH SECTION */}
            {
              !user ? (
                <div className="flex items-center gap-4">

                  {/* Login */}
                  <Link to="/login">

                    <Button
                      variant="outline"
                      className="
                        border-white/10
                        bg-white/5
                        text-white
                        hover:bg-white/10
                        hover:text-white
                        rounded-xl
                        px-6
                        py-5
                        backdrop-blur-xl
                      "
                    >
                      Login
                    </Button>

                  </Link>

                  {/* Signup */}
                  <Link to="/signup">

                    <Button
                      className="
                        rounded-xl
                        px-6
                        py-5
                        font-semibold
                        bg-linear-to-r
                        from-cyan-500
                        via-blue-500
                        to-purple-600
                        hover:scale-105
                        transition-all
                        duration-300
                        shadow-xl
                      "
                    >

                      <Sparkles className="mr-2 w-4 h-4" />
                      Sign Up

                    </Button>

                  </Link>

                </div>
              ) : (
                <Popover>

                  <PopoverTrigger asChild>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer"
                    >

                      <Avatar className="
                        w-12
                        h-12
                        border-2
                        border-cyan-500
                        shadow-xl
                      ">

                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto ||
                            "https://github.com/shadcn.png"
                          }
                          alt="user"
                        />

                        <AvatarFallback>
                          {user?.fullName?.charAt(0)}
                        </AvatarFallback>

                      </Avatar>

                    </motion.div>

                  </PopoverTrigger>

                  {/* POPOVER */}
                  <PopoverContent
                    className="
                      w-80
                      border-white/10
                      bg-[#0f172a]/95
                      backdrop-blur-2xl
                      text-white
                      rounded-3xl
                      p-6
                    "
                  >

                    {/* USER INFO */}
                    <div className="
                      flex
                      items-center
                      gap-4
                      pb-5
                      border-b
                      border-white/10
                    ">

                      <Avatar className="
                        w-16
                        h-16
                        border-2
                        border-cyan-500
                      ">

                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="user"
                        />

                        <AvatarFallback>
                          {user?.fullName?.charAt(0)}
                        </AvatarFallback>

                      </Avatar>

                      <div>

                        <h4 className="
                          font-bold
                          text-lg
                        ">
                          {user?.fullName}
                        </h4>

                        <p className="
                          text-sm
                          text-slate-400
                          mt-1
                        ">
                          {user?.profile?.bio}
                        </p>

                      </div>

                    </div>

                    {/* MENU ITEMS */}
                    <div className="mt-5 space-y-3">

                      {
                        user?.role !== "recruiter" && (
                          <Link to="/profile">

                            <div className="
                              flex
                              items-center
                              justify-between
                              p-4
                              rounded-2xl
                              bg-white/5
                              border
                              border-white/10
                              hover:bg-cyan-500/10
                              transition-all
                              duration-300
                              cursor-pointer
                              group
                            ">

                              <div className="flex items-center gap-3">

                                <User className="
                                  text-cyan-400
                                  w-5
                                  h-5
                                " />

                                <span className="font-medium">
                                  View Profile
                                </span>

                              </div>

                              <ChevronRight className="
                                w-5
                                h-5
                                text-slate-400
                                group-hover:translate-x-1
                                transition-all
                              " />

                            </div>

                          </Link>
                        )
                      }

                      {/* LOGOUT */}
                      <button
                        onClick={logoutHandler}
                        className="
                          w-full
                          flex
                          items-center
                          justify-between
                          p-4
                          rounded-2xl
                          bg-red-500/10
                          border
                          border-red-500/20
                          hover:bg-red-500/20
                          transition-all
                          duration-300
                          group
                        "
                      >

                        <div className="flex items-center gap-3">

                          <LogOut className="
                            text-red-400
                            w-5
                            h-5
                          " />

                          <span className="
                            text-red-300
                            font-medium
                          ">
                            Logout
                          </span>

                        </div>

                        <ChevronRight className="
                          w-5
                          h-5
                          text-red-300
                          group-hover:translate-x-1
                          transition-all
                        " />

                      </button>

                    </div>

                  </PopoverContent>

                </Popover>
              )
            }

          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/5
                border
                border-white/10
                flex
                items-center
                justify-center
                text-white
                backdrop-blur-xl
              "
            >

              {
                isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )
              }

            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {
          isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="
                md:hidden
                border-t
                border-white/10
                bg-[#030712]/95
                backdrop-blur-2xl
              "
            >

              <div className="
                px-4
                py-6
                space-y-4
              ">

                {/* NAV LINKS */}
                {
                  user?.role === "recruiter" ? (
                    <>
                      <Link
                        to="/admin/companies"
                        className="block"
                      >
                        <div className="
                          p-4
                          rounded-2xl
                          bg-white/5
                          text-white
                        ">
                          Companies
                        </div>
                      </Link>

                      <Link
                        to="/admin/jobs"
                        className="block"
                      >
                        <div className="
                          p-4
                          rounded-2xl
                          bg-white/5
                          text-white
                        ">
                          Jobs
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/" className="block">
                        <div className="
                          p-4
                          rounded-2xl
                          bg-white/5
                          text-white
                        ">
                          Home
                        </div>
                      </Link>

                      <Link to="/jobs" className="block">
                        <div className="
                          p-4
                          rounded-2xl
                          bg-white/5
                          text-white
                        ">
                          Jobs
                        </div>
                      </Link>

                      <Link to="/browse" className="block">
                        <div className="
                          p-4
                          rounded-2xl
                          bg-white/5
                          text-white
                        ">
                          Browse
                        </div>
                      </Link>
                    </>
                  )
                }

                {/* AUTH */}
                {
                  !user ? (
                    <div className="space-y-3 pt-4">

                      <Link to="/login">

                        <Button
                          variant="outline"
                          className="
                            w-full
                            rounded-2xl
                            border-white/10
                            bg-white/5
                            text-white
                            hover:bg-white/10
                            hover:text-white
                          "
                        >
                          Login
                        </Button>

                      </Link>

                      <Link to="/signup">

                        <Button
                          className="
                            w-full
                            rounded-2xl
                            bg-linear-to-r
                            from-cyan-500
                            to-purple-600
                          "
                        >
                          Sign Up
                        </Button>

                      </Link>

                    </div>
                  ) : (
                    <div className="space-y-3 pt-4">

                      {
                        user?.role !== "recruiter" && (
                          <Link to="/profile">

                            <Button
                              variant="outline"
                              className="
                                w-full
                                rounded-2xl
                                border-white/10
                                bg-white/5
                                text-white
                                hover:bg-white/10
                                hover:text-white
                              "
                            >
                              View Profile
                            </Button>

                          </Link>
                        )
                      }

                      <Button
                        onClick={logoutHandler}
                        className="
                          w-full
                          rounded-2xl
                          bg-red-500
                          hover:bg-red-600
                        "
                      >
                        Logout
                      </Button>

                    </div>
                  )
                }

              </div>

            </motion.div>
          )
        }

      </AnimatePresence>

    </header>
  );
};

export default Navbar;