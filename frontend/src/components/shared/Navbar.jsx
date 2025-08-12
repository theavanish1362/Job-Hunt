import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <header className="bg-[#f9f9ff] border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">

       <div className='flex flex-row gap-4 items-center'>
         <Avatar className="h-12 w-12 ring-2 ring-slate-700">
                      <AvatarImage
                        src=".\Jh-c.svg"
                        alt="Logo"
                      />
                    </Avatar>
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Job<span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">
  Hunt
</span>

        </Link>
       </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-12">
          <ul className="flex gap-6 font-medium text-[#d76b53]">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies" className="hover:underline">Companies</Link></li>
                <li><Link to="/admin/jobs" className="hover:underline">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/jobs" className="hover:underline">Jobs</Link></li>
                <li><Link to="/browse" className="hover:underline">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Auth Buttons / Avatar */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="text-[#d76b53] border-[#d76b53] hover:bg-[#f2ebff]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#d76b53] hover:bg-[#d76b53] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-slate-600">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-xl shadow-lg border border-gray-200">
                <div className="flex gap-3 items-start">
                  <Avatar className="ring-1 ring-gray-300">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 space-y-2 text-gray-600">
                  {user?.role === 'student' && (
                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      <Link to="/profile">
                        <Button variant="link" className="text-sm px-0 text-[#6A38C2]">View Profile</Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-sm px-0 text-red-500"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
