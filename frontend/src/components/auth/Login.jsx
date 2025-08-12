import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row  justify-between px-4 md:px-12 py-12 gap-10">
        {/* Left Section - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
  <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
    Kickstart Your Future Today
  </span>

  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 animate-fade-up">
    Job <span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">Hunt</span>
  </h1>

  <p
    className="text-gray-600 text-base animate-fade-up"
    style={{ animationDelay: "0.5s", animationFillMode: "both" }}
  >
    Connecting The Best Employees With The Best Companies...
  </p>

  {/* 👇 Image Section */}
  <div className="mt-6 animate-fade-up">
    <img
      src="https://i.postimg.cc/TwzmW9WJ/j-hunt.png"
      alt="Job Hunt Illustration"
      className="w-screen max-w-md mx-auto md:mx-0 rounded-xl shadow-md object-contain"
    />
  </div>
</div>


        {/* Right Section - Login Form */}
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="@gmail.com"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
            />
          </div>

          <RadioGroup className="flex items-center gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500  text-white my-2">
              Login
            </Button>
          )}

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#F83002] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
