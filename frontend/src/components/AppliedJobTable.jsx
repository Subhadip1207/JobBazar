import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { motion } from "framer-motion";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <Badge
            className="
              bg-emerald-500/15
              text-emerald-300
              border
              border-emerald-400/20
              hover:bg-emerald-500/25
              px-4
              py-1.5
              rounded-full
              font-semibold
              gap-1
            "
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            ACCEPTED
          </Badge>
        );

      case "pending":
        return (
          <Badge
            className="
              bg-yellow-500/15
              text-yellow-300
              border
              border-yellow-400/20
              hover:bg-yellow-500/25
              px-4
              py-1.5
              rounded-full
              font-semibold
              gap-1
            "
          >
            <Clock3 className="w-3.5 h-3.5" />
            PENDING
          </Badge>
        );

      case "rejected":
        return (
          <Badge
            className="
              bg-red-500/15
              text-red-300
              border
              border-red-400/20
              hover:bg-red-500/25
              px-4
              py-1.5
              rounded-full
              font-semibold
              gap-1
            "
          >
            <XCircle className="w-3.5 h-3.5" />
            REJECTED
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#1e1b4b]
        shadow-[0_10px_50px_rgba(124,58,237,0.25)]
        backdrop-blur-2xl
        p-6
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-72
          h-72
          bg-cyan-500/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[-120px]
          left-[-120px]
          w-72
          h-72
          bg-purple-500/20
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />

              <h1 className="text-3xl font-black text-white">
                Applied Jobs
              </h1>
            </div>

            <p className="text-slate-400 text-sm">
              Track all your job applications and their current status.
            </p>
          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              justify-center
              w-14
              h-14
              rounded-2xl
              bg-white/5
              border
              border-white/10
            "
          >
            <BriefcaseBusiness className="w-7 h-7 text-cyan-400" />
          </div>
        </div>

        {/* Table */}
        <div
          className="
            overflow-x-auto
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
          "
        >
          <Table>
            <TableCaption className="text-slate-400 py-5">
              A stylish overview of your applied jobs ✨
            </TableCaption>

            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-cyan-300 font-bold py-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Date
                  </div>
                </TableHead>

                <TableHead className="text-cyan-300 font-bold">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="w-4 h-4" />
                    Job Role
                  </div>
                </TableHead>

                <TableHead className="text-cyan-300 font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Company
                  </div>
                </TableHead>

                <TableHead className="text-right text-cyan-300 font-bold">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allAppliedJobs?.length === 0 ? (
                <TableRow className="border-white/10">
                  <TableCell
                    colSpan={4}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        className="
                          w-20
                          h-20
                          rounded-full
                          bg-white/5
                          border
                          border-white/10
                          flex
                          items-center
                          justify-center
                          mb-5
                        "
                      >
                        <BriefcaseBusiness className="w-10 h-10 text-slate-500" />
                      </div>

                      <h2 className="text-xl font-bold text-white mb-2">
                        No Applications Yet
                      </h2>

                      <p className="text-slate-400 text-sm max-w-sm">
                        Start applying to jobs and your applications
                        will appear beautifully here.
                      </p>
                    </motion.div>
                  </TableCell>
                </TableRow>
              ) : (
                allAppliedJobs.map((appliedJob, index) => (
                  <motion.tr
                    key={appliedJob?._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="
                      border-b
                      border-white/10
                      hover:bg-white/5
                      transition-all
                      duration-300
                    "
                  >
                    <TableCell className="text-slate-300 py-5 font-medium">
                      {appliedJob?.createdAt?.split("T")[0]}
                    </TableCell>

                    <TableCell className="text-white font-semibold">
                      {appliedJob?.job?.title || "N/A"}
                    </TableCell>

                    <TableCell className="text-slate-300">
                      {appliedJob?.job?.company?.name || "N/A"}
                    </TableCell>

                    <TableCell className="text-right">
                      {getStatusBadge(appliedJob?.status)}
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

export default AppliedJobTable;