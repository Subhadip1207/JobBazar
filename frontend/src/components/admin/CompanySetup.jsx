import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Button } from '../ui/button';
import {
  ArrowLeft,
  Loader2,
  Building2,
  Globe,
  MapPin,
  FileText,
  ImagePlus,
  Sparkles,
  Save
} from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import useGetComapnyById from '../../hooks/useGetComapnyById';
import { motion } from 'framer-motion';

const CompanySetup = () => {
  const params = useParams();

  useGetComapnyById(params.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleCompany } = useSelector(
    (store) => store.company
  );

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);

    if (input?.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));

        toast.success(res.data.message);

        navigate(`/admin/companies`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Failed to setup company'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || '',
      description: singleCompany?.description || '',
      website: singleCompany?.website || '',
      location: singleCompany?.location || '',
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-[#020817] overflow-hidden relative">
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-violet-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute top-[40%] left-[50%] w-[250px] h-[250px] bg-pink-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            type="button"
            onClick={() => navigate('/admin/companies')}
            variant="outline"
            className="
              bg-white/5
              border-white/10
              text-white
              hover:bg-white/10
              hover:text-cyan-300
              rounded-2xl
              backdrop-blur-xl
              transition-all
              duration-300
            "
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Main Card */}
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 60 }}
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
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-[40px] border border-cyan-400/20 animate-pulse"></div>

          {/* Decorative Glow */}
          <div className="absolute top-[-50px] right-[-50px] w-44 h-44 bg-cyan-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-[-50px] left-[-50px] w-44 h-44 bg-violet-500/20 blur-3xl rounded-full"></div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 mb-12 text-center"
          >
            <div
              className="
                w-24
                h-24
                mx-auto
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                via-violet-500
                to-pink-500
                flex
                items-center
                justify-center
                shadow-[0_0_40px_rgba(34,211,238,0.45)]
                mb-6
              "
            >
              <Building2 className="w-12 h-12 text-white" />
            </div>

            <h1
              className="
                text-4xl
                md:text-5xl
                font-black
                text-white
                mb-4
              "
            >
              Company
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
                {" "}Setup
              </span>
            </h1>

            <p className="text-slate-400 max-w-2xl mx-auto">
              Complete your company profile to attract top talent and create a
              strong professional presence.
            </p>
          </motion.div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 relative z-10">
            {/* Company Name */}
            <div className="space-y-3">
              <Label className="text-slate-200 font-medium">
                Company Name
              </Label>

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 w-5 h-5" />

                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Microsoft"
                  className="
                    h-14
                    pl-12
                    rounded-2xl
                    bg-slate-900/70
                    border-white/10
                    text-white
                    placeholder:text-slate-500
                    focus-visible:ring-cyan-400
                  "
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label className="text-slate-200 font-medium">
                Description
              </Label>

              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400 w-5 h-5" />

                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Leading software company..."
                  className="
                    h-14
                    pl-12
                    rounded-2xl
                    bg-slate-900/70
                    border-white/10
                    text-white
                    placeholder:text-slate-500
                    focus-visible:ring-violet-400
                  "
                />
              </div>
            </div>

            {/* Website */}
            <div className="space-y-3">
              <Label className="text-slate-200 font-medium">
                Website
              </Label>

              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />

                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="https://company.com"
                  className="
                    h-14
                    pl-12
                    rounded-2xl
                    bg-slate-900/70
                    border-white/10
                    text-white
                    placeholder:text-slate-500
                    focus-visible:ring-pink-400
                  "
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <Label className="text-slate-200 font-medium">
                Location
              </Label>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 w-5 h-5" />

                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Kolkata, India"
                  className="
                    h-14
                    pl-12
                    rounded-2xl
                    bg-slate-900/70
                    border-white/10
                    text-white
                    placeholder:text-slate-500
                    focus-visible:ring-green-400
                  "
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="
              relative
              z-10
              mt-10
              rounded-3xl
              border
              border-dashed
              border-cyan-500/30
              bg-cyan-500/5
              p-8
              text-center
            "
          >
            <div
              className="
                w-20
                h-20
                mx-auto
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-500
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <ImagePlus className="w-10 h-10 text-white" />
            </div>

            <Label className="text-white text-lg font-semibold">
              Upload Company Logo
            </Label>

            <p className="text-slate-400 text-sm mt-2 mb-5">
              PNG, JPG or SVG recommended
            </p>

            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="
                max-w-md
                mx-auto
                bg-slate-900/70
                border-white/10
                text-slate-300
                rounded-xl
              "
            />

            {/* Preview */}
            <div className="mt-8 flex justify-center">
              {input.file ? (
                <motion.img
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={URL.createObjectURL(input.file)}
                  alt="Logo Preview"
                  className="
                    h-28
                    w-28
                    object-contain
                    rounded-3xl
                    border
                    border-cyan-400/30
                    bg-white
                    shadow-[0_0_25px_rgba(34,211,238,0.3)]
                    p-3
                  "
                />
              ) : singleCompany?.logo ? (
                <motion.img
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={singleCompany?.logo}
                  alt="Existing Logo"
                  className="
                    h-28
                    w-28
                    object-contain
                    rounded-3xl
                    border
                    border-violet-400/30
                    bg-white
                    shadow-[0_0_25px_rgba(139,92,246,0.3)]
                    p-3
                  "
                />
              ) : (
                <div className="text-slate-500 text-sm">
                  No logo uploaded
                </div>
              )}
            </div>
          </motion.div>

          {/* Tip Box */}
          <div
            className="
              relative
              z-10
              mt-8
              flex
              gap-3
              rounded-2xl
              border
              border-cyan-500/20
              bg-cyan-500/10
              p-5
            "
          >
            <Sparkles className="text-cyan-300 w-5 h-5 mt-1" />

            <div>
              <h3 className="text-cyan-300 font-semibold">
                Branding Tip
              </h3>

              <p className="text-slate-300 text-sm mt-1">
                Companies with complete profiles and professional logos attract
                significantly more applicants.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 mt-10"
          >
            {loading ? (
              <Button
                disabled
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-violet-500
                  text-white
                  text-base
                "
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  via-violet-500
                  to-pink-500
                  hover:scale-[1.01]
                  hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]
                  text-white
                  text-base
                  font-semibold
                  transition-all
                  duration-300
                "
              >
                <Save className="w-5 h-5 mr-2" />
                Update Company
              </Button>
            )}
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default CompanySetup;