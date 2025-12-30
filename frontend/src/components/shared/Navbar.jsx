import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="bg-[#f9f9ff] border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* ===== Top Bar ===== */}
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-slate-700">
            <AvatarImage src="/Jh-c.svg" alt="Logo" />
          </Avatar>
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Job
            <span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">
              Hunt
            </span>
          </Link>
        </div>

        {/* ===== Desktop Navigation ===== */}
        <nav className="hidden md:flex items-center gap-12">
          <ul className="flex gap-6 font-medium text-[#d76b53]">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#d76b53] text-white">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-slate-600">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/default-avatar.png"}
                    alt="User"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex gap-3 items-start">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "/default-avatar.png"}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 space-y-2 text-gray-600">
                  {user?.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4" />
                      <Link to="/profile">
                        <Button
                          variant="link"
                          className="text-sm px-0 text-[#6A38C2]"
                        >
                          View Profile
                        </Button>
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

        {/* ===== Mobile Menu Button ===== */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ===== Mobile Menu ===== */}
      {isOpen && (
        <div className="md:hidden bg-[#f9f9ff] border-t shadow-lg">
          <ul className="flex flex-col gap-4 p-4 text-[#d76b53] font-medium">
            {user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies" onClick={() => setIsOpen(false)}>
                  Companies
                </Link>
                <Link to="/admin/jobs" onClick={() => setIsOpen(false)}>
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link to="/jobs" onClick={() => setIsOpen(false)}>
                  Jobs
                </Link>
                <Link to="/browse" onClick={() => setIsOpen(false)}>
                  Browse
                </Link>
              </>
            )}

            <hr />

            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {user?.role === "student" && (
                  <div className="flex items-center gap-2">
                    <User2 className="h-4 w-4" />
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                    className="text-left text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
