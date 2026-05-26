import React from 'react';

import {
  Facebook,
  Linkedin,
  Mail,
  Github,
  ArrowUpRight,
  Sparkles,
  BriefcaseBusiness,
  MapPin,
  Phone,
} from 'lucide-react';

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="
      relative
      overflow-hidden
      bg-[#030712]
      border-t
      border-white/10
    ">

      {/* Background Glow */}
      <div className="
        absolute
        top-0
        left-0
        w-80
        h-80
        bg-cyan-500/10
        blur-3xl
        rounded-full
      "></div>

      <div className="
        absolute
        bottom-0
        right-0
        w-80
        h-80
        bg-purple-500/10
        blur-3xl
        rounded-full
      "></div>

      {/* Grid Pattern */}
      <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "></div>

      <div className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-20
      ">

        {/* TOP SECTION */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-12
        ">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            {/* Logo */}
            <div className="
              flex
              items-center
              gap-3
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
                shadow-xl
              ">
                <BriefcaseBusiness className="text-white w-7 h-7" />
              </div>

              <div>
                <h1 className="
                  text-3xl
                  font-black
                  text-white
                ">
                  JobBazar
                </h1>

                <p className="text-slate-400 text-sm">
                  Dream Jobs Platform
                </p>
              </div>

            </div>

            {/* Description */}
            <p className="
              text-slate-400
              leading-8
              text-base
            ">
              Your modern job hunting platform where talent meets
              opportunity. Discover your dream role and build
              your future career today.
            </p>

            {/* Badge */}
            <div className="
              mt-6
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white/5
              border
              border-white/10
              text-cyan-300
              backdrop-blur-xl
            ">

              <Sparkles className="w-4 h-4" />
              Trusted by Developers

            </div>

          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >

            <h2 className="
              text-2xl
              font-bold
              text-white
              mb-8
            ">
              Quick Links
            </h2>

            <div className="space-y-4">

              {
                [
                  {key:"Home",url : "/"},
                  {key:"Browse Jobs", url:"/browse"},
                  {key:"About Us", url:"/about"},
                  {key:"Contact", url : "/contact"}
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group"
                  >

                    <a
                      href={item.url}
                      className="
                        flex
                        items-center
                        gap-3
                        text-slate-400
                        hover:text-cyan-400
                        transition-all
                        duration-300
                      "
                    >

                      <ArrowUpRight className="
                        w-4
                        h-4
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-all
                        duration-300
                      " />

                      {item.key}

                    </a>

                  </div>
                ))
              }

            </div>

          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <h2 className="
              text-2xl
              font-bold
              text-white
              mb-8
            ">
              Contact Info
            </h2>

            <div className="space-y-6">

              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  flex
                  items-center
                  justify-center
                ">
                  <Mail className="text-cyan-400 w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    Email
                  </h3>

                  <a
                    href="mailto:subhadip003.dutta@gmail.com"
                    className="
                      text-slate-400
                      hover:text-cyan-400
                      transition-all
                    "
                  >
                    subhadip003.dutta@gmail.com
                  </a>
                </div>

              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-purple-500/10
                  border
                  border-purple-500/20
                  flex
                  items-center
                  justify-center
                ">
                  <Phone className="text-purple-400 w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    Phone
                  </h3>

                  <p className="text-slate-400">
                    +91 8509729928
                  </p>
                </div>

              </div>

              {/* Location */}
              <div className="flex items-start gap-4">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-pink-500/10
                  border
                  border-pink-500/20
                  flex
                  items-center
                  justify-center
                ">
                  <MapPin className="text-pink-400 w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    Location
                  </h3>

                  <p className="text-slate-400">
                    Kolkata, India
                  </p>
                </div>

              </div>

            </div>

          </motion.div>

          {/* SOCIALS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >

            <h2 className="
              text-2xl
              font-bold
              text-white
              mb-8
            ">
              Follow Me
            </h2>

            <p className="
              text-slate-400
              leading-7
              mb-8
            ">
              Connect with me on social platforms and stay updated
              with my latest projects and career opportunities.
            </p>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/subhadip.dutta.52035772"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-slate-300
                  hover:bg-blue-500
                  hover:text-white
                  hover:scale-110
                  transition-all
                  duration-300
                "
              >
                <Facebook className="group-hover:rotate-12 transition-all duration-300" />
              </a>

              {/* Github */}
              <a
                href="https://github.com/Subhadip1207"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-slate-300
                  hover:bg-gray-800
                  hover:text-white
                  hover:scale-110
                  transition-all
                  duration-300
                "
              >
                <Github className="group-hover:rotate-12 transition-all duration-300" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/subhadip-dutta-4466b5296/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-slate-300
                  hover:bg-cyan-500
                  hover:text-white
                  hover:scale-110
                  transition-all
                  duration-300
                "
              >
                <Linkedin className="group-hover:rotate-12 transition-all duration-300" />
              </a>

              {/* Mail */}
              <a
                href="mailto:subhadip003.dutta@gmail.com"
                className="
                  group
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  text-slate-300
                  hover:bg-purple-500
                  hover:text-white
                  hover:scale-110
                  transition-all
                  duration-300
                "
              >
                <Mail className="group-hover:rotate-12 transition-all duration-300" />
              </a>

            </div>

          </motion.div>

        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="
            mt-20
            pt-8
            border-t
            border-white/10
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >

          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()}
            <span className="
              text-cyan-400
              font-semibold
            ">
              {" "}JobBazar
            </span>
            . All Rights Reserved.
          </p>

          <div className="
            flex
            items-center
            gap-6
            text-sm
          ">

            <a
              href="#"
              className="
                text-slate-500
                hover:text-cyan-400
                transition-all
              "
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="
                text-slate-500
                hover:text-cyan-400
                transition-all
              "
            >
              Terms & Conditions
            </a>

          </div>

        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;