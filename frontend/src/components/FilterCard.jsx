import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Sparkles,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const filterData = [
  {
    filterType: "Location",
    icon: <MapPin className="w-5 h-5 text-cyan-400" />,
    array: ["Delhi", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    icon: <Briefcase className="w-5 h-5 text-violet-400" />,
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist"
    ]
  },
  {
    filterType: "Salary",
    icon: <IndianRupee className="w-5 h-5 text-pink-400" />,
    array: ["0.1-5 LPA", "6-15 LPA", "16-36 LPA"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        w-full
        lg:w-[320px]
        md:min-w-[280px]
        rounded-[32px]
        border
        border-white/10
        bg-slate-950/90
        backdrop-blur-2xl
        p-6
        shadow-[0_0_50px_rgba(0,0,0,0.4)]
        sticky
        top-24
      "
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-violet-500/20 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <div
          className="
            p-3
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-violet-600
            shadow-lg
          "
        >
          <Filter className="text-white w-5 h-5" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-white">
            Filter Jobs
          </h1>

          <p className="text-sm text-slate-400">
            Find your perfect opportunity
          </p>
        </div>
      </div>

      {/* Filter Groups */}
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-8 relative z-10"
      >
        {filterData.map((data, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-5
              hover:bg-white/10
              transition-all
              duration-500
            "
          >
            {/* Section Heading */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="
                  p-2
                  rounded-xl
                  bg-slate-900
                  border
                  border-white/10
                "
              >
                {data.icon}
              </div>

              <h2 className="text-lg font-bold text-white">
                {data.filterType}
              </h2>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;

                return (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    key={itemId}
                    className={`
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      px-4
                      py-3
                      cursor-pointer
                      transition-all
                      duration-300
                      ${
                        selectedValue === item
                          ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/50"
                          : "bg-slate-900/60 border-white/10 hover:border-cyan-400/30"
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="
                        border-cyan-400
                        text-cyan-400
                      "
                    />

                    <Label
                      htmlFor={itemId}
                      className="
                        cursor-pointer
                        text-sm
                        font-medium
                        text-slate-200
                        group-hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      {item}
                    </Label>

                    {selectedValue === item && (
                      <Sparkles className="ml-auto w-4 h-4 text-cyan-300 animate-pulse" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </RadioGroup>

      {/* Bottom Decorative Line */}
      <div
        className="
          relative
          z-10
          mt-8
          h-[2px]
          w-full
          rounded-full
          bg-gradient-to-r
          from-cyan-500
          via-violet-500
          to-pink-500
        "
      ></div>
    </motion.div>
  );
};

export default FilterCard;