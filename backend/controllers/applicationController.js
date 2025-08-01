import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
export const applyJob = async (req, res) => {
    try {
        const jobId= req.params.id;
        const userId = req.id;

        // Validate input
        if (!jobId || !userId) {
            return res.status(400).json({
                message: "Job ID and User ID are required",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Create a new application
        const newApplication = new Application({ job: jobId, applicant: userId });
        await newApplication.save();

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
            data: newApplication
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

//shows the jobs that the user has already applied .
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        // Find all applications for the user
        const application = await Application.find({ applicant: userId }).populate({path:"job",options:{sort:{createdAt:-1}},populate:{path:"company",options:{sort:{createdAt:-1}}}}).sort({ createdAt: -1 });

        if (!application || application.length === 0) {
            return res.status(404).json({
                message: "No applied jobs found",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

//admin can see all the applicants that applied for the job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find all applications for the job
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            }
        });

        if (!job || job.applications.length === 0) {
            return res.status(404).json({
                message: "No applicants found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        // Validate input
        if (!applicationId || !status) {
            return res.status(400).json({
                message: "Application ID or status are required",
                success: false
            });
        }

        // Find the application and update its status
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}