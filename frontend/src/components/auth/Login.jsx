import React, { useEffect, useState } from 'react'
import Navbar from '../ui/shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { RadioGroup } from "@/components/ui/radio-group"
import { toast } from "sonner"
import Axios from "axios"
import { USER_API_ENDPOINT } from "../../utils/constant.js"
import { useDispatch, useSelector } from 'react-redux'
import {
  Loader2,
  Mail,
  Lock,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

import { setLoading, setUser } from '../../redux/authSlice'
import { motion } from "framer-motion"

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  })

  const { loading, user } = useSelector((store) => store.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    const { name, value } = e.target

    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      dispatch(setLoading(true))

      const res = await Axios.post(
        `${USER_API_ENDPOINT}/login`,
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        dispatch(setUser(res.data.user))

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        )

        navigate("/")

        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      )
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden">

      <Navbar />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 blur-3xl rounded-full"></div>

      {/* Grid Effect */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            w-full
            max-w-5xl
            grid
            lg:grid-cols-2
            rounded-[40px]
            overflow-hidden
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            shadow-2xl
          "
        >

          {/* LEFT SIDE */}
          <div className="
            hidden
            lg:flex
            flex-col
            justify-center
            p-14
            relative
            overflow-hidden
          ">

            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20"></div>

            <div className="relative z-10">

              {/* Badge */}
              <div className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                text-cyan-300
                mb-8
              ">
                <Sparkles className="w-5 h-5" />
                Welcome Back
              </div>

              {/* Heading */}
              <h1 className="
                text-5xl
                font-black
                leading-tight
                text-white
              ">
                Find Your
                <br />

                <span className="
                  bg-linear-to-r
                  from-cyan-400
                  via-blue-500
                  to-purple-500
                  bg-clip-text
                  text-transparent
                ">
                  Dream Career
                </span>
              </h1>

              {/* Description */}
              <p className="
                mt-6
                text-slate-300
                text-lg
                leading-8
              ">
                Join thousands of professionals and students
                discovering amazing opportunities every day.
              </p>

              {/* Features */}
              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">
                  <div className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-cyan-500/20
                    flex
                    items-center
                    justify-center
                  ">
                    <BriefcaseBusiness className="text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      10K+ Jobs
                    </h3>

                    <p className="text-slate-400 text-sm">
                      Top companies hiring now
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-purple-500/20
                    flex
                    items-center
                    justify-center
                  ">
                    <GraduationCap className="text-purple-400" />
                  </div>

                  <div>
                    <h3 className="text-white font-semibold">
                      Student Friendly
                    </h3>

                    <p className="text-slate-400 text-sm">
                      Internships & fresher jobs
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="p-8 sm:p-12">

            {/* Mobile Heading */}
            <div className="lg:hidden text-center mb-8">

              <h1 className="
                text-4xl
                font-black
                text-white
              ">
                Login
              </h1>

              <p className="text-slate-400 mt-3">
                Welcome back to your career journey
              </p>
            </div>

            {/* Desktop Heading */}
            <div className="hidden lg:block mb-10">

              <h1 className="
                text-4xl
                font-black
                text-white
              ">
                Log In
              </h1>

              <p className="text-slate-400 mt-3">
                Continue your journey with us
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={submitHandler}>

              {/* Email */}
              <div className="mb-6">

                <Label className="text-slate-300 mb-3 block">
                  Email Address
                </Label>

                <div className="relative">

                  <Mail className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    w-5
                    h-5
                  " />

                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="example@gmail.com"
                    className="
                      pl-12
                      h-14
                      rounded-xl
                      bg-white/5
                      border-white/10
                      text-white
                      placeholder:text-slate-500
                      focus:border-cyan-500
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">

                <Label className="text-slate-300 mb-3 block">
                  Password
                </Label>

                <div className="relative">

                  <Lock className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    w-5
                    h-5
                  " />

                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Enter your password"
                    className="
                      pl-12
                      h-14
                      rounded-xl
                      bg-white/5
                      border-white/10
                      text-white
                      placeholder:text-slate-500
                      focus:border-purple-500
                    "
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-8">

                <Label className="text-slate-300 mb-4 block">
                  Select Role
                </Label>

                <RadioGroup className="grid grid-cols-2 gap-4">

                  {/* Student */}
                  <label
                    htmlFor="student"
                    className={`
                      flex
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      border
                      p-4
                      cursor-pointer
                      transition-all
                      duration-300
                      ${input.role === "student"
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/10 bg-white/5"
                      }
                    `}
                  >

                    <Input
                      type="radio"
                      id="student"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="hidden"
                    />

                    <GraduationCap className="text-cyan-400" />

                    <span className="text-white font-medium">
                      Student
                    </span>

                  </label>

                  {/* Recruiter */}
                  <label
                    htmlFor="recruiter"
                    className={`
                      flex
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      border
                      p-4
                      cursor-pointer
                      transition-all
                      duration-300
                      ${input.role === "recruiter"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 bg-white/5"
                      }
                    `}
                  >

                    <Input
                      type="radio"
                      id="recruiter"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="hidden"
                    />

                    <BriefcaseBusiness className="text-purple-400" />

                    <span className="text-white font-medium">
                      Recruiter
                    </span>

                  </label>

                </RadioGroup>
              </div>

              {/* Submit Button */}
              <div className="mb-6">

                {
                  loading ? (
                    <Button
                      disabled
                      className="
                        w-full
                        h-14
                        rounded-xl
                        text-lg
                        bg-linear-to-r
                        from-cyan-500
                        to-blue-600
                      "
                    >
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="
                        w-full
                        h-14
                        rounded-xl
                        text-lg
                        font-semibold
                        bg-linear-to-r
                        from-cyan-500
                        via-blue-500
                        to-purple-600
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                        shadow-xl
                      "
                    >
                      Log In
                    </Button>
                  )
                }

              </div>

              {/* Signup */}
              <p className="text-center text-slate-400">

                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="
                    text-cyan-400
                    hover:text-cyan-300
                    font-semibold
                    transition-all
                  "
                >
                  Sign Up
                </Link>

              </p>

            </form>

          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Login