import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import axiosInstance from "../utils/axiosInstance.js";
import { USER_API_ENDPOINT } from "../../utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.fullName || !input.email || !input.phoneNumber || !input.password || !input.role || !input.file) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
        setInput({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
          file: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="w-full max-w-2xl border border-gray-300 p-6 rounded-md shadow-md bg-white my-10"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="mb-4">
            <Label className="mb-1 block">Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Subhadip"
              className="w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="mb-1 block">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="subhadip@gmail.com"
              className="w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label className="mb-1 block">Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="01234 56789"
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

          {/* Role + File Upload (Responsive Flex) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <RadioGroup className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  value="student"
                  id="student"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
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
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label htmlFor="file">Profile</Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mb-4">
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            )}
          </div>

          {/* Login link */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
