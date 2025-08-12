import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector((store) => store.auth)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <Avatar className="h-16 w-16 ring-2 ring-orange-300">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{user?.fullname}</h1>
              <p className="text-sm text-gray-600 mt-1">{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2">
            <Pen className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span>{user?.phoneNumber || 'NA'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="font-semibold text-md mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0
              ? user?.profile?.skills.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {item}
                  </Badge>
                ))
              : <span className="text-gray-500">NA</span>}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-6">
          <Label className="text-md font-semibold">Resume</Label>
          <div className="mt-2">
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline break-words text-sm"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500 text-sm">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
