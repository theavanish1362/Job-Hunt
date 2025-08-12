import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-[260px] flex-shrink-0">
          <FilterCard />
        </div>

        {/* Main Content (Heading + Cards) */}
        <div className="flex-1">
          {/* Heading */}
          <div className="text-left mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 animate-fade-up">
              Browse <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Job Opportunities</span>
            </h1>
            <p
              className="text-gray-600 mt-2 text-sm md:text-base animate-fade-up"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              Filter and find your dream job from curated listings
            </p>
          </div>

          {/* Job Listings */}
          <div className="h-[75vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
            {
              filterJobs.length <= 0 ? (
                <div className="text-center text-gray-500 py-10">No jobs found matching your search.</div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        key={job?._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs


