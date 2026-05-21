import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "./ui/alert-dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2, UploadCloud, Sparkles, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    file: null
  });

  useEffect(() => {
    if (open && user) {
      setInput({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: Array.isArray(user.profile?.skills)
          ? user.profile.skills.join(", ")
          : "",
        file: null
      });
    }
  }, [open, user]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await Axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

<<<<<<< HEAD
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong in Updation"
      );
    } finally {
      setLoading(false);
      setTimeout(() => setOpen(false), 200);
    }
  };
=======
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axiosInstance.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong in Updation");
        } finally {
            setLoading(false);
            setTimeout(() => setOpen(false), 100);
        }
    };
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9

  const fields = [
    {
      id: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name"
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email"
    },
    {
      id: "phoneNumber",
      label: "Phone",
      type: "tel",
      placeholder: "Enter your phone number"
    },
    {
      id: "bio",
      label: "Bio",
      type: "text",
      placeholder: "Write something about yourself"
    },
    {
      id: "skills",
      label: "Skills",
      type: "text",
      placeholder: "React, Node.js, MongoDB..."
    }
  ];

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent
        className="
          w-[95vw]
          sm:max-w-2xl
          border
          border-white/10
          bg-slate-950/95
          backdrop-blur-2xl
          rounded-[32px]
          overflow-hidden
          p-0
          shadow-[0_0_80px_rgba(59,130,246,0.25)]
        "
      >
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 p-8 sm:p-10">
          {/* Header */}
          <AlertDialogHeader className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <div
                className="
                  p-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  shadow-lg
                "
              >
                <UserCircle2 className="text-white w-8 h-8" />
              </div>

              <div>
                <AlertDialogTitle className="text-3xl font-black text-white">
                  Update Profile
                </AlertDialogTitle>

                <AlertDialogDescription className="text-slate-400 mt-1">
                  Customize your profile and showcase your skills beautifully.
                </AlertDialogDescription>
              </div>
            </motion.div>
          </AlertDialogHeader>

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="
              absolute
              top-5
              right-5
              w-10
              h-10
              rounded-full
              bg-white/5
              border
              border-white/10
              text-slate-300
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-300
            "
          >
            ✕
          </button>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className="space-y-6">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="space-y-2"
                >
                  <Label className="text-slate-200 text-sm font-medium">
                    {field.label}
                  </Label>

                  <Input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    value={input[field.id]}
                    onChange={changeEventHandler}
                    placeholder={field.placeholder}
                    className="
                      h-12
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      text-white
                      placeholder:text-slate-500
                      focus:border-cyan-400
                      focus:ring-2
                      focus:ring-cyan-500/30
                      transition-all
                      duration-300
                    "
                  />
                </motion.div>
              ))}

              {/* File Upload */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="
                  border-2
                  border-dashed
                  border-cyan-500/30
                  rounded-2xl
                  p-6
                  bg-white/5
                  hover:border-cyan-400
                  transition-all
                  duration-300
                "
              >
                <Label className="text-slate-200 flex items-center gap-2 mb-4">
                  <UploadCloud className="w-5 h-5 text-cyan-400" />
                  Upload Resume (PDF)
                </Label>

                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    text-slate-300
                    file:bg-cyan-500
                    file:text-white
                    file:border-0
                    file:px-4
                    file:py-2
                    file:rounded-lg
                    file:mr-4
                    hover:file:bg-cyan-600
                    cursor-pointer
                  "
                />

                {input.file && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm text-cyan-300"
                  >
                    Selected File:{" "}
                    <span className="font-semibold">
                      {input.file.name}
                    </span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Footer */}
            <AlertDialogFooter className="mt-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    text-lg
                    font-semibold
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-600
                    hover:from-cyan-400
                    hover:to-purple-500
                    shadow-[0_0_30px_rgba(59,130,246,0.5)]
                    transition-all
                    duration-500
                  "
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 w-5 h-5" />
                      Update Profile
                    </>
                  )}
                </Button>
              </motion.div>
            </AlertDialogFooter>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateProfileDialog;