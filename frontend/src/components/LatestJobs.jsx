import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-1 px-4 py-12 bg-[#f9f9ff] rounded-3xl shadow-md">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          <span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">Latest & Top</span> Job Openings
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Explore your opportunities and kickstart your career journey.
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <span className="text-center text-gray-500 col-span-full">
            No Job Available
          </span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
