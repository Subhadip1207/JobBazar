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
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '../../redux/authSlice'

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
    setInput(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      dispatch(setLoading(true))
      const res = await Axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        localStorage.setItem("user", JSON.stringify(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
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
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md md:max-w-xl lg:max-w-2xl border border-gray-200 p-6 rounded-md shadow-md bg-white my-10"
        >
          <h1 className="font-bold text-2xl text-center mb-6">Log In</h1>

          {/* Email */}
          <div className="mb-4">
            <Label className="mb-1 block">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="w-full"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="mb-1 block">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-5">
            <RadioGroup className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  value="student"
                  id="student"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  value="recruiter"
                  id="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Log In
              </Button>
            )}
          </div>

          {/* Signup Link */}
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
