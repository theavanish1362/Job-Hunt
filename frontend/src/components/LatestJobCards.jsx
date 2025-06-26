import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white p-5 rounded-xl border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(106,56,194,0.25)]"
    >
      <div>
        <h1 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      <div className="mt-3">
        <h2 className="font-bold text-xl mb-1 bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-100" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className=" bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent font-semibold bg-orange-100" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold bg-purple-100" variant="ghost">
          ₹ {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;

