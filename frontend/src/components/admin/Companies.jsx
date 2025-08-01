import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyBytext } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyBytext(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 px-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5'>
          <Input
            className='w-full sm:max-w-sm'
            onChange={(e) => setInput(e.target.value)}
            placeholder='Filter by company name'
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className='w-full sm:w-auto'
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
