import React, { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription
} from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance.js";
import { USER_API_ENDPOINT } from "../utils/constant.js";
import { toast } from "sonner";
import { setUser } from '../redux/authSlice';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        bio: '',
        skills: '',
        file: null
    });

    useEffect(() => {
        if (open && user) {
            setInput({
                fullName: user.fullName || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                bio: user.profile?.bio || '',
                skills: Array.isArray(user.profile?.skills) ? user.profile.skills.join(', ') : '',
                file: null
            });
        }
    }, [open, user]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axiosInstance.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong in Updation");
        } finally {
            setLoading(false);
            setTimeout(() => setOpen(false), 100);
        }
    };

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="sm:max-w-[425px] w-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Profile</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please fill out the fields below to update your profile.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <form onSubmit={submitHandler} encType="multipart/form-data">
                        <div className="grid gap-4 py-4">
                            {[
                                { id: "fullName", label: "Name", type: "text" },
                                { id: "email", label: "Email", type: "email" },
                                { id: "phoneNumber", label: "Phone Number", type: "tel" },
                                { id: "bio", label: "Bio", type: "text" },
                                { id: "skills", label: "Skills (comma-separated)", type: "text" }
                            ].map(({ id, label, type }) => (
                                <div key={id} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                    <Label htmlFor={id} className="text-sm sm:text-right">{label}</Label>
                                    <Input
                                        id={id}
                                        name={id}
                                        type={type}
                                        value={input[id]}
                                        onChange={changeEventHandler}
                                        className="sm:col-span-3"
                                    />
                                </div>
                            ))}

                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                <Label htmlFor="file" className="text-sm sm:text-right">Resume (PDF)</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="sm:col-span-3"
                                />
                            </div>

                            {input.file && (
                                <div className="text-xs text-gray-500 sm:col-span-4">
                                    Selected file: <span className="font-semibold">{input.file.name}</span>
                                </div>
                            )}
                        </div>

                        <AlertDialogFooter>
                            <Button
                                type="submit"
                                className="w-full my-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UpdateProfileDialog;
