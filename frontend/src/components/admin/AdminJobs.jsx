import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/usegetAllAdminJobs';
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 my-10'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-6'>
          <Input
            className='w-full sm:w-[60%]'
            onChange={(e) => setInput(e.target.value)}
            placeholder='Filter by job title or company'
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className='w-full sm:w-auto'
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
