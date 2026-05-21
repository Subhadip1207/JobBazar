import React, { useState } from "react";
import Navbar from "./ui/shared/Navbar";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    toast.success("Message sent successfully 🚀");

    setFormData({
      fullname: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] overflow-hidden relative">
      <Navbar />

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/20 blur-[140px] rounded-full"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
            }}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              JobBazar Support Center
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Contact
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              JobBazar
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or need assistance? We’re here to help
            you build your career journey with confidence.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            {[
              {
                icon: <Mail className="w-6 h-6 text-cyan-300" />,
                title: "Email Us",
                value: "subhadip003.dutta@gmail.com",
                color: "from-cyan-500/20 to-blue-500/10",
              },
              {
                icon: <Phone className="w-6 h-6 text-violet-300" />,
                title: "Call Us",
                value: "+91 8509729928",
                color: "from-violet-500/20 to-purple-500/10",
              },
              {
                icon: <MapPin className="w-6 h-6 text-pink-300" />,
                title: "Location",
                value: "Kolkata, India",
                color: "from-pink-500/20 to-rose-500/10",
              },
              {
                icon: <Clock className="w-6 h-6 text-yellow-300" />,
                title: "Working Hours",
                value: "Mon - Sat | 9 AM - 7 PM",
                color: "from-yellow-500/20 to-orange-500/10",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                className={`
                  relative
                  overflow-hidden
                  p-6
                  rounded-3xl
                  border
                  border-white/10
                  bg-gradient-to-br
                  ${item.color}
                  backdrop-blur-xl
                  shadow-[0_0_30px_rgba(0,0,0,0.3)]
                `}
              >
                <div className="flex items-center gap-5">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center"
                  >
                    {item.icon}
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 mt-1">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Support Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-cyan-500/20
                bg-white/5
                backdrop-blur-2xl
                p-8
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-pink-500/10"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="text-cyan-300" />
                  <h2 className="text-2xl font-bold text-white">
                    Need Immediate Help?
                  </h2>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  Our support team is available to guide students, recruiters,
                  and companies with any issues related to applications, job
                  postings, or account management.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-8
              shadow-[0_0_40px_rgba(0,0,0,0.4)]
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-pink-500/5"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-4xl font-black text-white mb-3">
                  Send a Message
                </h2>

                <p className="text-slate-400">
                  Fill out the form and our team will contact you soon.
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={changeHandler}
                    placeholder="Enter your full name"
                    required
                    className="
                      w-full
                      rounded-2xl
                      bg-slate-900/80
                      border
                      border-white/10
                      px-5
                      py-4
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:border-cyan-400
                      transition-all
                    "
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter your email"
                    required
                    className="
                      w-full
                      rounded-2xl
                      bg-slate-900/80
                      border
                      border-white/10
                      px-5
                      py-4
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:border-violet-400
                      transition-all
                    "
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={changeHandler}
                    placeholder="Enter subject"
                    required
                    className="
                      w-full
                      rounded-2xl
                      bg-slate-900/80
                      border
                      border-white/10
                      px-5
                      py-4
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:border-pink-400
                      transition-all
                    "
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-slate-300 text-sm mb-2 block">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={changeHandler}
                    placeholder="Write your message..."
                    required
                    className="
                      w-full
                      rounded-2xl
                      bg-slate-900/80
                      border
                      border-white/10
                      px-5
                      py-4
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:border-cyan-400
                      transition-all
                      resize-none
                    "
                  />
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 0px 25px rgba(34,211,238,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    via-violet-500
                    to-pink-500
                    text-white
                    font-bold
                    text-lg
                    border-0
                    flex
                    items-center
                    justify-center
                    gap-3
                    transition-all
                  "
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;