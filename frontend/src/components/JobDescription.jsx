import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isIntiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isIntiallyApplied)

  const params = useParams()
  const navigate = useNavigate()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      })

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications.some(app => app.applicant === user?._id)
          )
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{singleJob?.title}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <Badge className="text-blue-700 font-medium" variant="ghost">
                {singleJob?.position || 1} Position{singleJob?.position > 1 ? 's' : ''}
              </Badge>
              <Badge className="text-[#F83002] font-medium" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-medium" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-2 text-white font-semibold ${
              isApplied
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        {/* Description */}
        <h1 className='border-b-2 border-b-gray-300 font-medium py-2'>Job Description</h1>
        <div className="space-y-3 text-gray-800 text-[1rem] leading-7">
          <div>
            <span className="font-semibold">Role:</span>
            <span className="ml-3">{singleJob?.title}</span>
          </div>
          <div>
            <span className="font-semibold">Location:</span>
            <span className="ml-3">{singleJob?.location}</span>
          </div>
          <div>
            <span className="font-semibold">Description:</span>
            <span className="ml-3">{singleJob?.description}</span>
          </div>
          <div>
            <span className="font-semibold">Experience:</span>
            <span className="ml-3">{singleJob?.experience} yrs</span>
          </div>
          <div>
            <span className="font-semibold">Salary:</span>
            <span className="ml-3">{singleJob?.salary} LPA</span>
          </div>
          <div>
            <span className="font-semibold">Total Applicants:</span>
            <span className="ml-3">{singleJob?.applications?.length}</span>
          </div>
          <div>
            <span className="font-semibold">Posted Date:</span>
            <span className="ml-3">{singleJob?.createdAt?.split("T")[0]}</span>
          </div>
        </div>

        {/* Browse More Button */}
        <div className="pt-2">
          <Button
            onClick={() => navigate('/browse')}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-400 text-white hover:from-orange-500 hover:to-blue-500"
          >
            Browse More Jobs
          </Button>
        </div>
      </div>
    </div>
  )
}

export default JobDescription

