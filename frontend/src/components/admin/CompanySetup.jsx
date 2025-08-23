import React, { useEffect, useState } from 'react';
import Navbar from '../ui/shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import axiosInstance from "../utils/axiosInstance.js";
import { COMPANY_API_ENDPOINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import useGetComapnyById from '../../hooks/useGetComapnyById';

const CompanySetup = () => {
  const params = useParams();
  useGetComapnyById(params.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input?.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axiosInstance.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to setup company');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: null, // file preview will be handled separately
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-4 mb-6">
            <Button
              type="button"
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
            <h1 className="text-xl md:text-2xl font-semibold">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label htmlFor="logo">Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} />
              <div className="mt-3">
                {input.file ? (
                  <img
                    src={URL.createObjectURL(input.file)}
                    alt="Logo Preview"
                    className="h-20 w-20 object-contain border rounded-md"
                  />
                ) : singleCompany.logo ? (
                  <img
                    src={singleCompany.logo}
                    alt="Existing Logo"
                    className="h-20 w-20 object-contain border rounded-md"
                  />
                ) : (
                  <span className="text-sm text-gray-500">No logo uploaded</span>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-[#6A38C2]">
              Update Company
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
