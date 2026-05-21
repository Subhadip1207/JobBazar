import React, { useEffect, useState } from 'react';

import {
    MapPin,
    BriefcaseBusiness,
    IndianRupee,
    Users,
    CalendarDays,
    Clock3,
    Sparkles,
    CheckCircle2,
    Building2,
    BadgeCheck,
    ArrowRight,
} from "lucide-react";

import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD

import axios from 'axios';

import {
    Application_API_ENDPOINT,
    JOB_API_ENDPOINT
} from '../utils/constant.js';

=======
import axiosInstance from "../utils/axiosInstance.js";
import { Application_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant.js';
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9
import { setSingleJob } from '../redux/jobSlice.js';

import { toast } from "sonner";

import { motion } from "framer-motion";

const JobDescription = () => {

    const { singleJob } = useSelector(store => store.job);

    const { user } = useSelector(store => store.auth);

    const isInitiallyApplied =
        singleJob?.applications?.some(
            application =>
                application.applicant === user?._id
        ) || false;

    const [isApplied, setIsApplied] = useState(
        isInitiallyApplied
    );

    const params = useParams();

    const jobId = params.id;

    const dispatch = useDispatch();

    // =========================================
    // APPLY JOB
    // =========================================
    const applyJobHandler = async () => {

        try {
<<<<<<< HEAD

            const res = await axios.post(
                `${Application_API_ENDPOINT}/apply/${jobId}`,
                {},
                { withCredentials: true }
            );

=======
            const res = await axiosInstance.post(`${Application_API_ENDPOINT}/apply/${jobId}`, {}, { withCredentials: true });
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9
            if (res.data.success) {

                setIsApplied(true);

                const updatedJob = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ],
                };

                dispatch(setSingleJob(updatedJob));

                toast.success(res.data.message);

            }

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Something went wrong!"
            );

        }

    };

    // =========================================
    // FETCH JOB
    // =========================================
    useEffect(() => {

        const fetchSingleJob = async () => {

            try {
<<<<<<< HEAD

                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/get/${jobId}`,
                    { withCredentials: true }
                );

=======
                const res = await axiosInstance.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9
                if (res.data.success) {

                    dispatch(setSingleJob(res.data.job));

                    setIsApplied(
                        res.data.job.applications.some(
                            app =>
                                app.applicant === user?._id
                        )
                    );

                }

            } catch (error) {

                console.error(error);

            }

        };

        fetchSingleJob();

    }, [jobId, dispatch, user?._id]);

    return (

        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-[#030712]
            text-white
            py-16
        ">

            {/* ===================================
                    BACKGROUND EFFECTS
            =================================== */}

            {/* Cyan Glow */}
            <div className="
                absolute
                top-0
                left-0
                w-[450px]
                h-[450px]
                bg-cyan-500/10
                blur-3xl
                rounded-full
            "></div>

            {/* Purple Glow */}
            <div className="
                absolute
                bottom-0
                right-0
                w-[450px]
                h-[450px]
                bg-purple-500/10
                blur-3xl
                rounded-full
            "></div>

            {/* Grid */}
            <div className="
                absolute
                inset-0
                opacity-[0.03]
                bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                bg-[size:70px_70px]
            "></div>

            {/* Floating Orb */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                }}
                className="
                    absolute
                    top-40
                    right-24
                    w-10
                    h-10
                    rounded-full
                    bg-cyan-400
                    blur-sm
                    opacity-30
                "
            />

            {/* ===================================
                    MAIN CONTAINER
            =================================== */}

            <div className="
                relative
                z-10
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
            ">

                {/* ===================================
                        TOP CARD
                =================================== */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        duration: 0.6,
                    }}

                    className="
                        relative
                        overflow-hidden
                        rounded-[35px]
                        border
                        border-white/10
                        bg-white/5
                        backdrop-blur-2xl
                        p-8
                        shadow-2xl
                    "
                >

                    {/* Gradient Overlay */}
                    <div className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]
                    "></div>

                    {/* Header */}
                    <div className="
                        relative
                        z-10
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-8
                    ">

                        {/* Left */}
                        <div>

                            {/* Badge */}
                            <div className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-cyan-500/10
                                border
                                border-cyan-500/20
                                text-cyan-300
                                mb-6
                            ">

                                <Sparkles className="w-4 h-4" />

                                Featured Job Opportunity

                            </div>

                            {/* Title */}
                            <h1 className="
                                text-4xl
                                sm:text-5xl
                                font-black
                                leading-tight
                                text-white
                            ">

                                {singleJob?.title}

                            </h1>

                            {/* Company + Location */}
                            <div className="
                                flex
                                flex-wrap
                                items-center
                                gap-5
                                mt-5
                                text-slate-300
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <Building2 className="
                                        w-5
                                        h-5
                                        text-cyan-400
                                    " />

                                    {singleJob?.company?.name}

                                </div>

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <MapPin className="
                                        w-5
                                        h-5
                                        text-purple-400
                                    " />

                                    {singleJob?.location}

                                </div>

                            </div>

                            {/* Badges */}
                            <div className="
                                flex
                                flex-wrap
                                gap-3
                                mt-8
                            ">

                                <Badge className="
                                    px-5
                                    py-2
                                    rounded-full
                                    border-0
                                    bg-cyan-500/10
                                    text-cyan-300
                                ">

                                    <BriefcaseBusiness className="
                                        w-4
                                        h-4
                                        mr-2
                                    " />

                                    {singleJob?.position} Positions

                                </Badge>

                                <Badge className="
                                    px-5
                                    py-2
                                    rounded-full
                                    border-0
                                    bg-orange-500/10
                                    text-orange-300
                                ">

                                    <BadgeCheck className="
                                        w-4
                                        h-4
                                        mr-2
                                    " />

                                    {singleJob?.jobType}

                                </Badge>

                                <Badge className="
                                    px-5
                                    py-2
                                    rounded-full
                                    border-0
                                    bg-purple-500/10
                                    text-purple-300
                                ">

                                    <IndianRupee className="
                                        w-4
                                        h-4
                                        mr-1
                                    " />

                                    {singleJob?.salary} LPA

                                </Badge>

                            </div>

                        </div>

                        {/* Apply Button */}
                        <div>

                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >

                                <Button

                                    onClick={
                                        isApplied
                                            ? null
                                            : applyJobHandler
                                    }

                                    disabled={isApplied}

                                    className={`
                                        h-14
                                        px-8
                                        rounded-2xl
                                        text-lg
                                        font-semibold
                                        shadow-2xl
                                        transition-all
                                        duration-300

                                        ${isApplied
                                            ? 'bg-green-600 hover:bg-green-600 cursor-not-allowed'
                                            : 'bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 hover:scale-105'
                                        }
                                    `}
                                >

                                    {
                                        isApplied ? (
                                            <>
                                                <CheckCircle2 className="
                                                    w-5
                                                    h-5
                                                    mr-2
                                                " />

                                                Already Applied
                                            </>
                                        ) : (
                                            <>
                                                Apply Now

                                                <ArrowRight className="
                                                    w-5
                                                    h-5
                                                    ml-2
                                                " />
                                            </>
                                        )
                                    }

                                </Button>

                            </motion.div>

                        </div>

                    </div>

                </motion.div>

                {/* ===================================
                        DETAILS SECTION
                =================================== */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 40,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        duration: 0.7,
                        delay: 0.1,
                    }}

                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-8
                        mt-10
                    "
                >

                    {/* LEFT SIDE */}
                    <div className="
                        lg:col-span-2
                    ">

                        <div className="
                            rounded-[35px]
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-2xl
                            p-8
                            shadow-2xl
                            h-full
                        ">

                            {/* Heading */}
                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-8
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
                                ">

                                    <BriefcaseBusiness className="
                                        text-white
                                        w-6
                                        h-6
                                    " />

                                </div>

                                <div>

                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        text-white
                                    ">
                                        Job Description
                                    </h2>

                                    <p className="
                                        text-slate-400
                                    ">
                                        Detailed overview about this role
                                    </p>

                                </div>

                            </div>

                            {/* Description */}
                            <p className="
                                text-slate-300
                                leading-9
                                text-lg
                            ">

                                {singleJob?.description}

                            </p>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <div className="
                            rounded-[35px]
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-2xl
                            p-8
                            shadow-2xl
                        ">

                            {/* Title */}
                            <h2 className="
                                text-2xl
                                font-bold
                                text-white
                                mb-8
                            ">
                                Job Overview
                            </h2>

                            {/* DETAILS */}
                            <div className="
                                space-y-6
                            ">

                                {/* Experience */}
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <Clock3 className="
                                            text-cyan-400
                                            w-5
                                            h-5
                                        " />

                                        <span className="
                                            text-slate-300
                                        ">
                                            Experience
                                        </span>

                                    </div>

                                    <span className="
                                        font-semibold
                                        text-white
                                    ">
                                        {singleJob?.experienceLevel} yrs
                                    </span>

                                </div>

                                {/* Applicants */}
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <Users className="
                                            text-purple-400
                                            w-5
                                            h-5
                                        " />

                                        <span className="
                                            text-slate-300
                                        ">
                                            Applicants
                                        </span>

                                    </div>

                                    <span className="
                                        font-semibold
                                        text-white
                                    ">
                                        {singleJob?.applications?.length}
                                    </span>

                                </div>

                                {/* Salary */}
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <IndianRupee className="
                                            text-green-400
                                            w-5
                                            h-5
                                        " />

                                        <span className="
                                            text-slate-300
                                        ">
                                            Salary
                                        </span>

                                    </div>

                                    <span className="
                                        font-semibold
                                        text-white
                                    ">
                                        {singleJob?.salary} LPA
                                    </span>

                                </div>

                                {/* Posted Date */}
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <CalendarDays className="
                                            text-orange-400
                                            w-5
                                            h-5
                                        " />

                                        <span className="
                                            text-slate-300
                                        ">
                                            Posted
                                        </span>

                                    </div>

                                    <span className="
                                        font-semibold
                                        text-white
                                    ">
                                        {
                                            singleJob?.createdAt?.split("T")[0]
                                        }
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>

        </div>

    );
};

export default JobDescription;