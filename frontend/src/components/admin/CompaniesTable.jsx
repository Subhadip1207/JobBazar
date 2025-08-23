import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
} from '../ui/table';
import React, { useEffect, useState } from 'react';
import {
  Popover, PopoverTrigger, PopoverContent,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontal } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import axiosInstance from "../utils/axiosInstance.js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCompanies } from '../../redux/companySlice';

const CompaniesTable = () => {
  const dispatch = useDispatch();
  const { companies, searchCompanyBytext } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`${COMPANY_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        const updatedRes = await axiosInstance.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        dispatch(setCompanies(updatedRes.data.companies));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete company");
    }
  };

  useEffect(() => {
    const filteredCompany = companies.filter(company =>
      !searchCompanyBytext ||
      company?.name?.toLowerCase().includes(searchCompanyBytext.toLowerCase())
    );
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyBytext]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-20">Logo</TableHead>
            <TableHead className="w-1/3">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filterCompany?.map((company) => (
              <TableRow
                key={company._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className='h-10 w-10 sm:h-12 sm:w-12'>
                      <AvatarImage
                        className='rounded-full object-cover w-full h-full'
                        src={company?.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWiPu00wbVz5jz6xBReP01GJVw5wGH_06qw&s"}
                        alt="Company Logo"
                      />
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell className="font-medium truncate max-w-xs">{company.name}</TableCell>
                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell className='text-right'>
                  <Popover>
                    <PopoverTrigger className="hover:text-gray-600 transition"><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className='w-32 p-2'>
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className='flex items-center gap-2 cursor-pointer hover:text-blue-600 p-1 rounded-md hover:bg-gray-100 transition'
                      >
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => deleteHandler(company._id)}
                        className="flex items-center gap-2 cursor-pointer hover:text-red-600 p-1 rounded-md hover:bg-gray-100 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} className='w-4' />
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

export default CompaniesTable;
