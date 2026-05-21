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
  PopoverContent,
} from "@/components/ui/popover";

import {
  Edit2,
  MoreHorizontal,
  Building2,
  CalendarDays,
  Trash2,
  Sparkles,
  SearchX
} from 'lucide-react';

import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';
import axiosInstance from "../../utils/axiosInstance.js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCompanies } from '../../redux/companySlice';

import { motion, AnimatePresence } from 'framer-motion';

const CompaniesTable = () => {
  const dispatch = useDispatch();

  const { companies, searchCompanyBytext } = useSelector(
    store => store.company
  );

  const [filterCompany, setFilterCompany] = useState(companies);

  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
<<<<<<< HEAD
      const res = await axios.delete(
        `${COMPANY_API_ENDPOINT}/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedRes = await axios.get(
          `${COMPANY_API_ENDPOINT}/get`,
          {
            withCredentials: true,
          }
        );

=======
      const res = await axiosInstance.delete(`${COMPANY_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        const updatedRes = await axiosInstance.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
>>>>>>> 84f140c1fc401277c0f3151d43d4187e8e5b21a9
        dispatch(setCompanies(updatedRes.data.companies));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to delete company"
      );
    }
  };

  useEffect(() => {
    const filteredCompany = companies.filter(company =>
      !searchCompanyBytext ||
      company?.name
        ?.toLowerCase()
        .includes(searchCompanyBytext.toLowerCase())
    );

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyBytext]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        overflow-hidden
        rounded-[35px]
        border
        border-white/10
        bg-slate-950/70
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(0,0,0,0.45)]
      "
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/10 blur-3xl rounded-full"></div>

      {/* Header */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          px-6
          py-5
          border-b
          border-white/10
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              p-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-violet-500
              shadow-lg
            "
          >
            <Building2 className="w-5 h-5 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">
              Registered Companies
            </h1>

            <p className="text-sm text-slate-400">
              Manage and organize your company list
            </p>
          </div>
        </div>

        <div
          className="
            hidden
            md:flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/5
            border
            border-white/10
          "
        >
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />

          <span className="text-sm text-slate-300">
            {filterCompany?.length} Companies
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto relative z-10">
        <Table>
          <TableCaption className="text-slate-500 py-5">
            A futuristic dashboard for your registered companies
          </TableCaption>

          {/* Header */}
          <TableHeader>
            <TableRow
              className="
                border-b
                border-white/10
                bg-white/[0.03]
                hover:bg-white/[0.03]
              "
            >
              <TableHead className="text-slate-300 font-semibold py-5">
                Logo
              </TableHead>

              <TableHead className="text-slate-300 font-semibold">
                Company Name
              </TableHead>

              <TableHead className="text-slate-300 font-semibold">
                Created
              </TableHead>

              <TableHead className="text-right text-slate-300 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            <AnimatePresence>
              {filterCompany?.length > 0 ? (
                filterCompany.map((company, index) => (
                  <motion.tr
                    key={company._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05
                    }}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/[0.04]
                      transition-all
                      duration-500
                      group
                    "
                  >
                    {/* Logo */}
                    <TableCell className="py-5">
                      <motion.div
                        whileHover={{
                          scale: 1.08,
                          rotate: 4
                        }}
                        className="flex items-center"
                      >
                        <Avatar
                          className="
                            relative
                            h-14
                            w-14
                            rounded-2xl
                            overflow-hidden
                            border
                            border-white/10
                            bg-slate-900
                            shadow-[0_0_20px_rgba(59,130,246,0.25)]
                          "
                        >
                          <AvatarImage
                            className="
                              object-cover
                              w-full
                              h-full
                            "
                            src={
                              company?.logo ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkWiPu00wbVz5jz6xBReP01GJVw5wGH_06qw&s"
                            }
                            alt="Company Logo"
                          />
                        </Avatar>
                      </motion.div>
                    </TableCell>

                    {/* Company Name */}
                    <TableCell>
                      <div>
                        <h2
                          className="
                            font-bold
                            text-white
                            text-base
                            md:text-lg
                            group-hover:text-cyan-300
                            transition-all
                            duration-300
                          "
                        >
                          {company.name}
                        </h2>

                        <p className="text-sm text-slate-400 mt-1">
                          Recruiter Dashboard Company
                        </p>
                      </div>
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-300">
                        <CalendarDays className="w-4 h-4 text-violet-300" />

                        <span>
                          {company.createdAt?.split("T")[0]}
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            whileHover={{
                              rotate: 90,
                              scale: 1.1
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="
                              p-2.5
                              rounded-xl
                              bg-white/5
                              border
                              border-white/10
                              hover:border-cyan-400/40
                              hover:bg-cyan-500/10
                              transition-all
                              duration-300
                            "
                          >
                            <MoreHorizontal className="w-5 h-5 text-slate-300" />
                          </motion.button>
                        </PopoverTrigger>

                        <PopoverContent
                          className="
                            w-44
                            p-2
                            rounded-2xl
                            border
                            border-white/10
                            bg-slate-950/95
                            backdrop-blur-2xl
                            shadow-[0_0_40px_rgba(0,0,0,0.5)]
                          "
                        >
                          {/* Edit */}
                          <motion.div
                            whileHover={{ x: 5 }}
                            onClick={() =>
                              navigate(`/admin/companies/${company._id}`)
                            }
                            className="
                              flex
                              items-center
                              gap-3
                              cursor-pointer
                              rounded-xl
                              px-3
                              py-3
                              text-slate-200
                              hover:bg-cyan-500/10
                              hover:text-cyan-300
                              transition-all
                              duration-300
                            "
                          >
                            <Edit2 className="w-4 h-4" />

                            <span className="font-medium">
                              Edit Company
                            </span>
                          </motion.div>

                          {/* Delete */}
                          <motion.div
                            whileHover={{ x: 5 }}
                            onClick={() => deleteHandler(company._id)}
                            className="
                              flex
                              items-center
                              gap-3
                              cursor-pointer
                              rounded-xl
                              px-3
                              py-3
                              text-slate-200
                              hover:bg-red-500/10
                              hover:text-red-400
                              transition-all
                              duration-300
                            "
                          >
                            <Trash2 className="w-4 h-4" />

                            <span className="font-medium">
                              Delete Company
                            </span>
                          </motion.div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-20 text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-4
                      "
                    >
                      <div
                        className="
                          w-20
                          h-20
                          rounded-full
                          bg-white/5
                          border
                          border-white/10
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <SearchX className="w-10 h-10 text-slate-500" />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-white">
                          No Companies Found
                        </h2>

                        <p className="text-slate-400 mt-2">
                          Try searching with another keyword
                        </p>
                      </div>
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Bottom Glow Line */}
      <div
        className="
          h-[2px]
          w-full
          bg-gradient-to-r
          from-cyan-500
          via-violet-500
          to-pink-500
        "
      ></div>
    </motion.div>
  );
};

export default CompaniesTable;