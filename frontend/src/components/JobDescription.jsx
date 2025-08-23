import { Badge } from './ui/badge';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../utils/axiosInstance.js";
import { Application_API_ENDPOINT, JOB_API_ENDPOINT } from '../utils/constant.js';
import { setSingleJob } from '../redux/jobSlice.js';
import { toast } from "sonner";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axiosInstance.post(`${Application_API_ENDPOINT}/apply/${jobId}`, {}, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axiosInstance.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Job Title and Badges */}
                <div>
                    <h1 className="text-xl font-bold">{singleJob?.title}</h1>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <Badge className="text-blue-700 font-bold" variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className="text-[#F83002] font-bold" variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold" variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>

                {/* Apply Button */}
                <div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg w-full md:w-auto ${
                            isApplied
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-[#7209b7] hover:bg-[#a90df2]'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            <hr className="my-6 border-t border-gray-300" />

            {/* Job Details */}
            <div className="space-y-4">
                <h1 className="text-lg font-semibold">Job Description</h1>

                <div className="space-y-2 text-gray-800 text-sm sm:text-base">
                    <p><span className="font-semibold">Role:</span> {singleJob?.title}</p>
                    <p><span className="font-semibold">Location:</span> {singleJob?.location}</p>
                    <p><span className="font-semibold">Description:</span> {singleJob?.description}</p>
                    <p><span className="font-semibold">Experience:</span> {singleJob?.experienceLevel} yrs</p>
                    <p><span className="font-semibold">Salary:</span> {singleJob?.salary} LPA</p>
                    <p><span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length}</p>
                    <p><span className="font-semibold">Posted Date:</span> {singleJob?.createdAt?.split("T")[0]}</p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
