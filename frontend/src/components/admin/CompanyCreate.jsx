import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { toast } from 'sonner';
import {
  Building2,
  ArrowRight,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to register company"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] overflow-hidden relative">
      <Navbar />

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-violet-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute top-[40%] left-[50%] w-[250px] h-[250px] bg-pink-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-14">
        {/* Top Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/admin/companies')}
            className="
              border-white/10
              bg-white/5
              text-white
              hover:bg-white/10
              hover:text-cyan-300
              rounded-xl
              backdrop-blur-xl
            "
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-white/5
            backdrop-blur-2xl
            shadow-[0_0_80px_rgba(0,0,0,0.45)]
            p-8
            md:p-12
          "
        >
          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-[40px] border border-cyan-400/20 animate-pulse"></div>

          {/* Floating Decorative Orbs */}
          <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-[-40px] left-[-40px] w-40 h-40 bg-violet-500/20 blur-3xl rounded-full"></div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 text-center mb-10"
          >
            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-600
                flex
                items-center
                justify-center
                shadow-[0_0_40px_rgba(34,211,238,0.5)]
                mb-6
              "
            >
              <Building2 className="w-10 h-10 text-white" />
            </div>

            <h1
              className="
                text-4xl
                md:text-5xl
                font-black
                text-white
                mb-4
                leading-tight
              "
            >
              Create Your
              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  via-violet-400
                  to-pink-400
                  bg-clip-text
                  text-transparent
                "
              >
                {" "}Company
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
              Build your brand identity and start posting amazing opportunities
              for talented candidates.
            </p>
          </motion.div>

          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="relative z-10"
          >
            <Label
              htmlFor="companyName"
              className="
                text-slate-200
                font-semibold
                text-base
                mb-3
                block
              "
            >
              Company Name
            </Label>

            <div className="relative">
              <Input
                id="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Microsoft, Google, JobBazar"
                className="
                  h-14
                  rounded-2xl
                  bg-slate-900/70
                  border
                  border-white/10
                  text-white
                  placeholder:text-slate-500
                  focus-visible:ring-2
                  focus-visible:ring-cyan-400
                  focus-visible:border-cyan-400
                  text-lg
                  pl-14
                  transition-all
                  duration-300
                "
              />

              <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />
            </div>


          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="
              relative
              z-10
              flex
              flex-col
              sm:flex-row
              gap-4
              mt-10
            "
          >
            <Button
              variant="outline"
              onClick={() => navigate('/admin/companies')}
              className="
                flex-1
                h-14
                rounded-2xl
                border-white/10
                bg-white/5
                text-white
                hover:bg-white/10
                hover:text-cyan-300
                text-base
                transition-all
                duration-300
              "
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="
                flex-1
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-pink-500
                hover:scale-[1.02]
                hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]
                text-white
                font-semibold
                text-base
                transition-all
                duration-300
              "
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyCreate;