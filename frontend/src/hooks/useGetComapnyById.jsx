import React, { useEffect } from 'react'
import axios from 'axios'
import {COMPANY_API_ENDPOINT} from '../utils/constant.js'
import {useDispatch} from 'react-redux'
import { setAllJobs } from '../redux/jobSlice.js'
import { setSingleCompany } from '../redux/companySlice.js'

const useGetComapnyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchSingleCompany = async() => {
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company));
            }
        } catch (error) {
            console.log(err);
            
        }
    }
    fetchSingleCompany();
  },[companyId,dispatch])
}

export default useGetComapnyById;