import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 animate-fade-up">
            Search <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">Results</span>
          </h1>
          <p
            className="text-gray-600 mt-2 text-sm md:text-base animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            Showing {allJobs.length} job(s) based on your query
          </p>
        </div>

        {/* Job Cards */}
        {
          allJobs.length <= 0 ? (
            <div className="text-center text-gray-500 py-10">
              No jobs found. Try a different search.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Browse
