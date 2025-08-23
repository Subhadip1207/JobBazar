import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "../utils/axiosInstance.js";
import { JOB_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector(store => store.company);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong while posting the job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-6 text-center">Post a New Job</h1>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="position">Number of Positions</Label>
                <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
              </div>
              <div className="md:col-span-2">
                <Label>Select Company</Label>
                {
                  companies.length > 0 ? (
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Companies</SelectLabel>
                          {
                            companies.map((company) => (
                              <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                {company.name}
                              </SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-red-600 font-medium mt-2">
                      *Please register a company before posting a job.
                    </p>
                  )
                }
              </div>
            </div>

            {loading ? (
              <Button disabled className="w-full mt-6">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-6 bg-[#6A38C2]">
                Post New Job
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
