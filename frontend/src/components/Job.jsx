import React from 'react';

import {
    Bookmark,
    MapPin,
    Clock3,
    BriefcaseBusiness,
    IndianRupee,
    ArrowRight,
    Sparkles
} from 'lucide-react';

import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

import { useNavigate } from 'react-router-dom';

import { motion } from "framer-motion";

const Job = ({ job }) => {

    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const curr = new Date();
        const diff = curr - createdAt;

        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 30,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.5,
            }}

            whileHover={{
                y: -10,
                scale: 1.02,
            }}

            className="
                group
                relative
                h-full
            "
        >

            {/* Glow Border */}
            <div className="
                absolute
                -inset-[1px]
                rounded-[32px]
                bg-linear-to-r
                from-cyan-500/30
                via-blue-500/30
                to-purple-500/30
                blur-xl
                opacity-0
                group-hover:opacity-100
                transition-all
                duration-700
            "></div>

            {/* Main Card */}
            <div className="
                relative
                h-full
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-2xl
                shadow-2xl
                p-6
                flex
                flex-col
                justify-between
            ">

                {/* Background Gradient */}
                <div className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]
                "></div>

                {/* Floating Orb */}
                <div className="
                    absolute
                    top-0
                    right-0
                    w-32
                    h-32
                    bg-cyan-500/10
                    rounded-full
                    blur-3xl
                "></div>

                {/* ======================
                        TOP BAR
                ====================== */}
                <div className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                    mb-5
                ">

                    {/* Posted Time */}
                    <div className="
                        flex
                        items-center
                        gap-2
                        text-slate-400
                        text-sm
                    ">

                        <Clock3 className="w-4 h-4" />

                        <span>

                            {
                                daysAgoFunction(job?.createdAt) === 0
                                    ? "Posted Today"
                                    : `${daysAgoFunction(job?.createdAt)} days ago`
                            }

                        </span>

                    </div>

                    {/* Bookmark */}
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                    >

                        <Button
                            variant="ghost"
                            size="icon"
                            className="
                                rounded-full
                                border
                                border-white/10
                                bg-white/5
                                hover:bg-cyan-500/20
                                hover:text-cyan-300
                                transition-all
                                duration-300
                            "
                        >

                            <Bookmark className="w-5 h-5" />

                        </Button>

                    </motion.div>

                </div>

                {/* ======================
                     COMPANY SECTION
                ====================== */}
                <div className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-4
                ">

                    {/* Logo */}
                    <div className="
                        relative
                    ">

                        <div className="
                            absolute
                            inset-0
                            rounded-full
                            bg-cyan-500/20
                            blur-lg
                        "></div>

                        <Avatar className="
                            relative
                            w-16
                            h-16
                            border
                            border-white/10
                            shadow-xl
                        ">

                            <AvatarImage
                                src={
                                    job?.company?.logo ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWiPu00wbVz5jz6xBReP01GJVw5wGH_06qw&s"
                                }
                            />

                        </Avatar>

                    </div>

                    {/* Company Info */}
                    <div>

                        <h1 className="
                            text-xl
                            font-bold
                            text-white
                            line-clamp-1
                        ">
                            {job?.company?.name}
                        </h1>

                        <div className="
                            flex
                            items-center
                            gap-2
                            text-slate-400
                            text-sm
                            mt-1
                        ">

                            <MapPin className="w-4 h-4" />

                            <span>
                                {job?.location || "India"}
                            </span>

                        </div>

                    </div>

                </div>

                {/* ======================
                       JOB DETAILS
                ====================== */}
                <div className="
                    relative
                    z-10
                    mt-6
                    flex-1
                ">

                    {/* Job Title */}
                    <h1 className="
                        text-2xl
                        font-black
                        text-white
                        leading-tight
                        mb-4
                        group-hover:text-cyan-300
                        transition-all
                        duration-300
                    ">

                        {job?.title}

                    </h1>

                    {/* Description */}
                    <p className="
                        text-slate-400
                        text-sm
                        leading-7
                        line-clamp-4
                    ">

                        {job?.description}

                    </p>

                </div>

                {/* ======================
                          TAGS
                ====================== */}
                <div className="
                    relative
                    z-10
                    flex
                    flex-wrap
                    gap-3
                    mt-6
                ">

                    {/* Position */}
                    <Badge className="
                        px-4
                        py-2
                        rounded-full
                        border-0
                        bg-cyan-500/10
                        text-cyan-300
                        hover:bg-cyan-500/20
                        transition-all
                        duration-300
                    ">

                        <BriefcaseBusiness className="w-4 h-4 mr-2" />

                        {job?.position} Positions

                    </Badge>

                    {/* Job Type */}
                    <Badge className="
                        px-4
                        py-2
                        rounded-full
                        border-0
                        bg-orange-500/10
                        text-orange-300
                        hover:bg-orange-500/20
                        transition-all
                        duration-300
                    ">

                        <Sparkles className="w-4 h-4 mr-2" />

                        {job?.jobType}

                    </Badge>

                    {/* Salary */}
                    <Badge className="
                        px-4
                        py-2
                        rounded-full
                        border-0
                        bg-purple-500/10
                        text-purple-300
                        hover:bg-purple-500/20
                        transition-all
                        duration-300
                    ">

                        <IndianRupee className="w-4 h-4 mr-1" />

                        {job?.salary} LPA

                    </Badge>

                </div>

                {/* ======================
                        ACTION BUTTONS
                ====================== */}
                <div className="
                    relative
                    z-10
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    mt-8
                ">

                    {/* Details Button */}
                    <Button

                        onClick={() =>
                            navigate(`/description/${job?._id}`)
                        }

                        className="
                            flex-1
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            hover:bg-white/10
                            text-white
                            h-12
                            backdrop-blur-xl
                            transition-all
                            duration-300
                        "
                    >

                        View Details

                        <ArrowRight className="
                            ml-2
                            w-4
                            h-4
                        " />

                    </Button>

                    {/* Save Button */}
                    <Button
                        className="
                            flex-1
                            h-12
                            rounded-2xl
                            bg-linear-to-r
                            from-cyan-500
                            via-blue-500
                            to-purple-600
                            hover:scale-105
                            text-white
                            font-semibold
                            shadow-xl
                            transition-all
                            duration-300
                        "
                    >

                        <Bookmark className="
                            w-4
                            h-4
                            mr-2
                        " />

                        Save Job

                    </Button>

                </div>

            </div>

        </motion.div>

    );
};

export default Job;