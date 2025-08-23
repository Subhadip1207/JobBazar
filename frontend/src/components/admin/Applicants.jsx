import React, { useEffect } from 'react';
import Navbar from '../ui/shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axiosInstance from "../../utils/axiosInstance.js";
import { Application_API_ENDPOINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axiosInstance.get(`${Application_API_ENDPOINT}/${id}/applicants`, {
          withCredentials: true
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch applicants. Please try again.");
      }
    };

    if (id) fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <h1 className='text-xl sm:text-2xl font-bold mb-5'>
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
