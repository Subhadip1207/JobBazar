import React, { useState, useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    console.log("User changed in Profile:", user);
  }, [user]);

  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 rounded-full border border-gray-300">
              <AvatarImage
                src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl">{user?.fullName || "N/A"}</h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio || "No bio available."}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="self-start sm:self-center">
            <Pen className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Contact */}
        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{user?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Contact className="w-4 h-4" />
            <span>{user?.phoneNumber || "N/A"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <Label className="text-md font-semibold">Skills</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((skill, i) => <Badge key={i}>{skill}</Badge>)
            ) : (
              <span className="text-gray-500 text-sm">No skills added.</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <Label className="text-md font-semibold">Resume</Label>
          <div className="mt-2">
            {user?.profile?.resume && user?.profile?.resumeOriginalName ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all text-sm"
              >
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500 text-sm">No resume uploaded.</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl my-8 p-6 sm:p-8">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
