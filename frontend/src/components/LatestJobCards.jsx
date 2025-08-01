import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import React from 'react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-lg shadow-md bg-white border border-gray-200 cursor-pointer hover:shadow-xl transition duration-200"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-semibold text-base md:text-lg text-gray-800">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title & Description */}
      <div className="my-3">
        <h2 className="font-bold text-lg md:text-xl text-[#6A38C2] mb-1 truncate">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
