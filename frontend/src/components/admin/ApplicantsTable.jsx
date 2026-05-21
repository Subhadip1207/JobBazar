import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';
import {
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    FileText,
    Mail,
    Phone,
    CalendarDays,
    Sparkles,
    User2,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axiosInstance from "../../utils/axiosInstance.js";
import { Application_API_ENDPOINT } from '../../utils/constant';
import { motion } from 'framer-motion';

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
<<<<<<< HEAD

            const res = await axios.post(
                `${Application_API_ENDPOINT}/status/${id}/update`,
                { status }
            );

=======
            const res = await axiosInstance.post(`${Application_API_ENDPOINT}/status/${id}/update`, { status });
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Error updating status"
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden px-4 py-10">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-violet-600/20 blur-3xl rounded-full animate-pulse"></div>

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                ></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="
                    relative
                    z-10
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-2xl
                    shadow-[0_0_50px_rgba(0,255,255,0.12)]
                "
            >
                {/* Top Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-8 py-7 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
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
                                <Sparkles className="text-white w-5 h-5" />
                            </div>

                            <h1 className="text-3xl font-black text-white">
                                Applicants Dashboard
                            </h1>
                        </div>

                        <p className="text-slate-400">
                            Manage job applicants professionally
                        </p>
                    </div>

                    <div
                        className="
                            px-5
                            py-3
                            rounded-2xl
                            border
                            border-cyan-400/20
                            bg-cyan-500/10
                            text-cyan-300
                            font-semibold
                            backdrop-blur-xl
                        "
                    >
                        Total Applicants:{" "}
                        {applicants?.applications?.length || 0}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <Table className="min-w-[1000px]">
                        <TableCaption className="text-slate-500 py-6">
                            A stylish list of all applied candidates
                        </TableCaption>

                        <TableHeader>
                            <TableRow className="border-b border-white/10 hover:bg-transparent">
                                <TableHead className="text-cyan-300 font-bold py-5">
                                    Candidate
                                </TableHead>

                                <TableHead className="text-cyan-300 font-bold">
                                    Email
                                </TableHead>

                                <TableHead className="text-cyan-300 font-bold">
                                    Contact
                                </TableHead>

                                <TableHead className="text-cyan-300 font-bold">
                                    Resume
                                </TableHead>

                                <TableHead className="text-cyan-300 font-bold">
                                    Applied Date
                                </TableHead>

                                <TableHead className="text-right text-cyan-300 font-bold">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {applicants?.applications?.length > 0 ? (
                                applicants.applications.map((item, index) => (
                                    <motion.tr
                                        key={item?._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="
                                            border-b
                                            border-white/5
                                            hover:bg-white/5
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        {/* Candidate */}
                                        <TableCell className="py-5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="
                                                        h-12
                                                        w-12
                                                        rounded-2xl
                                                        bg-gradient-to-r
                                                        from-cyan-500
                                                        to-violet-600
                                                        flex
                                                        items-center
                                                        justify-center
                                                        shadow-lg
                                                    "
                                                >
                                                    <User2 className="text-white w-5 h-5" />
                                                </div>

                                                <div>
                                                    <h1 className="font-bold text-white">
                                                        {item?.applicant?.fullName}
                                                    </h1>

                                                    <p className="text-xs text-slate-400">
                                                        Applicant
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Email */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Mail className="w-4 h-4 text-cyan-400" />
                                                <span>
                                                    {item?.applicant?.email}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Contact */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Phone className="w-4 h-4 text-violet-400" />
                                                <span>
                                                    {item?.applicant?.phoneNumber}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Resume */}
                                        <TableCell>
                                            {item?.applicant?.profile?.resume ? (
                                                <a
                                                    href={
                                                        item?.applicant?.profile
                                                            ?.resume
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-4
                                                        py-2
                                                        rounded-xl
                                                        bg-cyan-500/10
                                                        border
                                                        border-cyan-400/20
                                                        text-cyan-300
                                                        hover:bg-cyan-500/20
                                                        transition-all
                                                        duration-300
                                                    "
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    <span className="truncate max-w-[150px]">
                                                        {
                                                            item?.applicant?.profile
                                                                ?.resumeOriginalName
                                                        }
                                                    </span>
                                                </a>
                                            ) : (
                                                <span className="text-slate-500">
                                                    No Resume
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Date */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <CalendarDays className="w-4 h-4 text-pink-400" />
                                                <span>
                                                    {item?.createdAt?.split("T")[0]}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button
                                                        className="
                                                            p-2.5
                                                            rounded-xl
                                                            bg-white/5
                                                            border
                                                            border-white/10
                                                            hover:bg-white/10
                                                            hover:rotate-90
                                                            transition-all
                                                            duration-300
                                                        "
                                                    >
                                                        <MoreHorizontal className="w-5 h-5 text-white" />
                                                    </button>
                                                </PopoverTrigger>

                                                <PopoverContent
                                                    className="
                                                        w-44
                                                        border
                                                        border-white/10
                                                        bg-[#0f172a]/95
                                                        backdrop-blur-2xl
                                                        text-white
                                                        rounded-2xl
                                                        p-2
                                                    "
                                                >
                                                    {shortListingStatus.map(
                                                        (status, index) => (
                                                            <motion.div
                                                                whileHover={{
                                                                    scale: 1.03,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.96,
                                                                }}
                                                                key={index}
                                                                onClick={() =>
                                                                    statusHandler(
                                                                        status,
                                                                        item?._id
                                                                    )
                                                                }
                                                                className={`
                                                                    flex
                                                                    items-center
                                                                    gap-3
                                                                    cursor-pointer
                                                                    px-4
                                                                    py-3
                                                                    rounded-xl
                                                                    transition-all
                                                                    duration-300
                                                                    ${
                                                                        status ===
                                                                        "Accepted"
                                                                            ? "hover:bg-green-500/20 text-green-300"
                                                                            : "hover:bg-red-500/20 text-red-300"
                                                                    }
                                                                `}
                                                            >
                                                                {status ===
                                                                "Accepted" ? (
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                ) : (
                                                                    <XCircle className="w-4 h-4" />
                                                                )}

                                                                <span className="font-medium">
                                                                    {status}
                                                                </span>
                                                            </motion.div>
                                                        )
                                                    )}
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center py-20"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div
                                                className="
                                                    h-24
                                                    w-24
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-cyan-500/20
                                                    to-violet-500/20
                                                    flex
                                                    items-center
                                                    justify-center
                                                    mb-5
                                                "
                                            >
                                                <User2 className="w-10 h-10 text-cyan-300" />
                                            </div>

                                            <h1 className="text-2xl font-bold text-white mb-2">
                                                No Applicants Yet
                                            </h1>

                                            <p className="text-slate-400">
                                                Applications will appear here once
                                                candidates apply.
                                            </p>
                                        </motion.div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </motion.div>
        </div>
    );
};

export default ApplicantsTable;