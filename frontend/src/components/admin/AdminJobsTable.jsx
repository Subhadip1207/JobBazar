import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { JOB_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import axiosInstance from "../utils/axiosInstance.js";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`${JOB_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setFilterJobs(prev => prev.filter(job => job._id !== id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    const filtered = (allAdminJobs || []).filter(job => {
      if (!searchJobByText) return true;
      return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <Table>
        <TableCaption className="text-sm text-gray-500">A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className='text-right'>
                  <Popover>
                    <PopoverTrigger aria-label="More options">
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className='w-36 p-2 space-y-2'>
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className='flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer'
                      >
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className='flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md cursor-pointer'
                      >
                        <Eye className='w-4' />
                        <span>Applicants</span>
                      </div>
                      <div
                        onClick={() => deleteHandler(job._id)}
                        className='flex items-center gap-2 hover:bg-red-100 text-red-600 px-2 py-1 rounded-md cursor-pointer'
                      >
                        <FontAwesomeIcon icon={faTrash} className='text-sm' />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
