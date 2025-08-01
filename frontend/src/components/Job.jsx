import { Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const curr = new Date();
        const diff = curr - createdAt;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition duration-300 flex flex-col justify-between h-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 my-2">
                <Avatar>
                    <AvatarImage
                        src={
                            job?.company?.logo ||
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWiPu00wbVz5jz6xBReP01GJVw5wGH_06qw&s'
                        }
                    />
                </Avatar>
                <div>
                    <h1 className="font-semibold text-base sm:text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Description */}
            <div className="my-2">
                <h1 className="font-bold text-lg sm:text-xl">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="ghost" className="text-blue-700 font-bold">
                    {job?.position} Positions
                </Badge>
                <Badge variant="ghost" className="text-[#F83002] font-bold">
                    {job?.jobType}
                </Badge>
                <Badge variant="ghost" className="text-[#7209b7] font-bold">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="w-full sm:w-auto">
                    Details
                </Button>
                <Button className="bg-[#7209b7] w-full sm:w-auto">Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
