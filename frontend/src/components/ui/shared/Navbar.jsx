import React, { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../../../utils/axiosInstance.js";
import { USER_API_ENDPOINT } from "../../../utils/constant";
import { setUser } from "../../../redux/authSlice";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axiosInstance.get(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true,
            });

            if (res?.data?.success) {
                toast.success(res.data.message);
                dispatch(setUser(null));
                navigate("/");
                localStorage.removeItem("user");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(
                error?.response?.data?.message || "Server error during logout"
            );
        }
    };

    return (
        <div className="bg-blue-50 z-50 sticky top-0 shadow">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3 md:py-4">
                {/* Logo */}
                <Link to="/">
                    <h1 className="text-xl md:text-2xl font-bold">
                        <span className="text-[#2FD048]">Job</span>
                        <span className="text-[#F83002]">Bazar</span>
                    </h1>
                </Link>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <Menu
                        className="cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12">
                    {/* Links */}
                    <ul className="flex font-medium items-center gap-6">
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

                    {/* Auth Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button
                                    variant="outline"
                                    className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={
                                            user?.profile?.profilePhoto ||
                                            "https://github.com/shadcn.png"
                                        }
                                        alt="user"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="user"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullName}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.profile.bio}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-gray-600">
                                    {user?.role !== "recruiter" && (
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <User />
                                            <Button variant="link">
                                                <Link to="/profile">View Profile</Link>
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-4">
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

                    <div className="mt-4 flex flex-col gap-3">
                        {!user ? (
                            <>
                                <Link to="/login">
                                    <Button className="w-full" variant="outline">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button
                                        className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
                                        variant="outline"
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                {user?.role !== "recruiter" && (
                                    <Link to="/profile">
                                        <Button className="w-full" variant="outline">
                                            View Profile
                                        </Button>
                                    </Link>
                                )}
                                <Button
                                    className="w-full"
                                    onClick={logoutHandler}
                                    variant="outline"
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
