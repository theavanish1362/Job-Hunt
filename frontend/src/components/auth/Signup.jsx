import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (key === "file" && value) {
        formData.append("file", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between px-4 md:px-12 py-12 gap-10">
        {/* Left Section - Info */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
            Kickstart Your Future Today
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 animate-fade-up">
            Join <span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">Job Hunt</span>
          </h1>
          <p
            className="text-gray-600 text-base animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            Create your profile, get matched with top companies, and start your journey.
          </p>
          <div className="mt-6 animate-fade-up">
            <img
              src="https://i.postimg.cc/TwzmW9WJ/j-hunt.png"
              alt="Signup Illustration"
              className="w-full max-w-md mx-auto md:mx-0 rounded-xl shadow-md object-contain"
            />
          </div>
        </div>

        {/* Right Section - Signup Form */}
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 border border-gray-200 bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>

          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Full name"
            />
          </div>

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
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="+91"
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

          <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
            <RadioGroup className="flex gap-4">
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

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white my-2">
              Signup
            </Button>
          )}

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F83002] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
