import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";

import {
  Edit2,
  Eye,
  MoreHorizontal,
  Briefcase,
  CalendarDays,
  Trash2,
  Sparkles,
  Building2
} from 'lucide-react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { motion } from 'framer-motion';
import axiosInstance from "../../utils/axiosInstance.js";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`${JOB_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        setFilterJobs(prev =>
          prev.filter(job => job._id !== id)
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to delete job"
      );
    }
  };

  useEffect(() => {
    const filtered = (allAdminJobs || []).filter(job => {
      if (!searchJobByText) return true;

      return (
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||

        job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-slate-950/95
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(0,0,0,0.6)]
      "
    >
      {/* Animated Background Glow */}
      <div className="absolute -top-32 -left-24 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* Header */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          px-6
          py-6
          border-b
          border-white/10
        "
      >
        <div>
          <div className="flex items-center gap-3">
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
              <Briefcase className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-black text-white">
                Admin Jobs
              </h1>

              <p className="text-sm text-slate-400">
                Manage all posted jobs beautifully
              </p>
            </div>
          </div>
        </div>

        {/* Total Jobs */}
        <div
          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-2xl
            bg-white/5
            border
            border-white/10
            text-white
            font-semibold
            w-fit
          "
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          Total Jobs: {filterJobs?.length}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto relative z-10">
        <Table>
          <TableCaption className="text-slate-400 py-6">
            Recently posted jobs in your dashboard
          </TableCaption>

          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-slate-300 font-bold py-5">
                Company
              </TableHead>

              <TableHead className="text-slate-300 font-bold">
                Role
              </TableHead>

              <TableHead className="text-slate-300 font-bold">
                Posted Date
              </TableHead>

              <TableHead className="text-right text-slate-300 font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-16"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="
                        p-5
                        rounded-full
                        bg-white/5
                        border
                        border-white/10
                      "
                    >
                      <Briefcase className="w-10 h-10 text-slate-500" />
                    </div>

                    <h2 className="text-xl font-bold text-white">
                      No Jobs Found
                    </h2>

                    <p className="text-slate-400 text-sm">
                      Try changing your search query
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filterJobs?.map((job, index) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition-all
                    duration-300
                    group
                  "
                >
                  {/* Company */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          p-3
                          rounded-2xl
                          bg-gradient-to-r
                          from-cyan-500/20
                          to-violet-500/20
                          border
                          border-white/10
                        "
                      >
                        <Building2 className="w-5 h-5 text-cyan-300" />
                      </div>

                      <div>
                        <h1 className="font-bold text-white text-sm md:text-base">
                          {job?.company?.name}
                        </h1>

                        <p className="text-xs text-slate-400">
                          Hiring Company
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <div>
                      <h1 className="font-semibold text-white">
                        {job?.title}
                      </h1>

                      <p className="text-xs text-slate-400">
                        Active Job Role
                      </p>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-300">
                      <CalendarDays className="w-4 h-4 text-violet-400" />

                      {job?.createdAt?.split("T")[0]}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger
                        aria-label="More options"
                        className="
                          p-2
                          rounded-xl
                          hover:bg-white/10
                          transition-all
                          duration-300
                        "
                      >
                        <MoreHorizontal className="cursor-pointer text-slate-300 group-hover:text-white" />
                      </PopoverTrigger>

                      <PopoverContent
                        className="
                          w-48
                          p-3
                          border
                          border-white/10
                          bg-slate-900/95
                          backdrop-blur-xl
                          rounded-2xl
                        "
                      >
                        <div className="space-y-2">

                          {/* Edit */}
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                              navigate(`/admin/companies/${job._id}`)
                            }
                            className="
                              flex
                              items-center
                              gap-3
                              px-3
                              py-3
                              rounded-xl
                              cursor-pointer
                              bg-white/5
                              hover:bg-cyan-500/20
                              transition-all
                              duration-300
                            "
                          >
                            <Edit2 className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-white font-medium">
                              Edit Job
                            </span>
                          </motion.div>

                          {/* Applicants */}
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                              navigate(`/admin/jobs/${job._id}/applicants`)
                            }
                            className="
                              flex
                              items-center
                              gap-3
                              px-3
                              py-3
                              rounded-xl
                              cursor-pointer
                              bg-white/5
                              hover:bg-violet-500/20
                              transition-all
                              duration-300
                            "
                          >
                            <Eye className="w-4 h-4 text-violet-400" />
                            <span className="text-sm text-white font-medium">
                              Applicants
                            </span>
                          </motion.div>

                          {/* Delete */}
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => deleteHandler(job._id)}
                            className="
                              flex
                              items-center
                              gap-3
                              px-3
                              py-3
                              rounded-xl
                              cursor-pointer
                              bg-red-500/10
                              hover:bg-red-500/20
                              transition-all
                              duration-300
                            "
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />

                            <span className="text-sm text-red-300 font-medium">
                              Delete Job
                            </span>
                          </motion.div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Neon Line */}
      <div
        className="
          h-[2px]
          w-full
          bg-gradient-to-r
          from-cyan-500
          via-violet-500
          to-pink-500
        "
      ></div>
    </motion.div>
  );
};

export default AdminJobsTable;