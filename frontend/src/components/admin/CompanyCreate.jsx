import React, { useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance.js";
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { toast } from 'sonner';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axiosInstance.post(`${COMPANY_API_ENDPOINT}/register`, { companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to register company");
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 md:px-6 py-10'>
        <div className='mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>Your Company Name</h1>
          <p className='text-gray-500 text-sm md:text-base'>
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className='mb-6'>
          <Label htmlFor="companyName" className="block mb-1 font-medium">Company Name</Label>
          <Input
            id="companyName"
            type='text'
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className='w-full'
            placeholder='e.g. JobHunt, Microsoft, Techverse'
          />
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Button
            variant='outline'
            onClick={() => navigate('/admin/companies')}
            className='w-full sm:w-auto'
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className='w-full sm:w-auto bg-[#6A38C2]'
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
