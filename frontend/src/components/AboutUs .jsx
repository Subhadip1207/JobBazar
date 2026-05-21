import React from "react";
import Navbar from "./ui/shared/Navbar";
import {
  Briefcase,
  Users,
  Rocket,
  ShieldCheck,
  Globe,
  Sparkles,
  Search,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Search className="w-8 h-8 text-cyan-400" />,
    title: "Smart Job Search",
    desc: "Find your dream jobs instantly with advanced filtering and recommendations.",
  },
  {
    icon: <Building2 className="w-8 h-8 text-violet-400" />,
    title: "Top Companies",
    desc: "Connect with trusted companies and explore thousands of opportunities.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-pink-400" />,
    title: "Secure Platform",
    desc: "Your applications and personal data stay safe and protected.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-orange-400" />,
    title: "Fast Hiring",
    desc: "Recruiters and candidates connect faster with modern workflows.",
  },
];

const stats = [
  { value: "10K+", label: "Active Jobs" },
  { value: "5K+", label: "Companies" },
  { value: "50K+", label: "Job Seekers" },
  { value: "99%", label: "Success Rate" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#050816] overflow-hidden text-white">
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/20 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-500/20 bg-white/5 backdrop-blur-xl mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">
                Welcome to JobBazar
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Connecting
              <span className="block bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
                Talent &
                Opportunities
              </span>
            </h1>

            <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-2xl">
              JobBazar is a modern job portal platform built to help job seekers
              discover amazing career opportunities and help companies find the
              best talent faster than ever.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
                <a href="/jobs">

                <button
                className="
                  px-8 py-4 rounded-2xl
                  bg-gradient-to-r from-cyan-500 to-violet-600
                  font-semibold
                  shadow-[0_10px_40px_rgba(59,130,246,0.35)]
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Explore Jobs
              </button>

                </a>
              

              <button
                className="
                  px-8 py-4 rounded-2xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  hover:bg-white/10
                  transition-all
                  duration-300
                "
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="
                relative
                rounded-[32px]
                overflow-hidden
                border border-white/10
                bg-white/5
                backdrop-blur-2xl
                p-6
                shadow-2xl
              "
            >
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
                alt="team"
                className="w-full h-[450px] object-cover rounded-3xl"
              />

              {/* Floating Card */}
              <div
                className="
                  absolute
                  bottom-10
                  left-10
                  bg-black/40
                  backdrop-blur-xl
                  border border-white/10
                  rounded-2xl
                  px-6
                  py-4
                "
              >
                <div className="flex items-center gap-3">
                  <Users className="text-cyan-400" />
                  <div>
                    <h3 className="font-bold text-lg">50,000+</h3>
                    <p className="text-sm text-slate-300">
                      Trusted Users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 lg:px-20 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="
                rounded-3xl
                bg-white/5
                border border-white/10
                backdrop-blur-2xl
                p-8
                text-center
                shadow-xl
              "
            >
              <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                {stat.value}
              </h2>

              <p className="mt-2 text-slate-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 lg:px-20 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-8"
          >
            About JobBazar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-300 leading-relaxed"
          >
            JobBazar was created with a vision to modernize recruitment and make
            job searching simple, beautiful, and efficient. Our platform
            provides seamless interaction between recruiters and candidates
            through a fast, responsive, and user-friendly experience.
            <br />
            <br />
            Whether you are a student searching for internships, a professional
            looking for career growth, or a company hiring top talent —
            JobBazar is designed for everyone.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-20 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-5">
              Why Choose Us?
            </h2>

            <p className="text-slate-400 text-lg">
              Powerful features built for modern recruitment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border border-white/10
                  bg-white/5
                  backdrop-blur-2xl
                  p-8
                  transition-all
                  duration-500
                "
              >
                <div
                  className="
                    absolute inset-0
                    opacity-0
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-cyan-500/10
                    to-violet-500/10
                    transition-all
                    duration-500
                  "
                ></div>

                <div className="relative z-10">
                  <div
                    className="
                      w-16 h-16
                      rounded-2xl
                      flex items-center justify-center
                      bg-slate-900
                      border border-white/10
                      mb-6
                    "
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 lg:px-20 py-24">
        <div
          className="
            max-w-6xl mx-auto
            rounded-[40px]
            bg-gradient-to-r
            from-cyan-500/10
            via-violet-500/10
            to-pink-500/10
            border border-white/10
            backdrop-blur-2xl
            p-12
            text-center
          "
        >
          <Globe className="mx-auto text-cyan-400 w-14 h-14 mb-6" />

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Our Mission
          </h2>

          <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Our mission is to empower people through opportunities and help
            businesses hire smarter. We believe technology can transform the
            recruitment process into something faster, more transparent, and
            more accessible for everyone.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Briefcase className="text-cyan-400" />
            <h2 className="text-xl font-black">JobBazar</h2>
          </div>

          <p className="text-slate-400 text-sm text-center">
            © 2026 JobBazar. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;