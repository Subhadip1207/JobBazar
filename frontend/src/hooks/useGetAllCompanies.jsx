import React, { useEffect } from 'react'
import axiosInstance from "../utils/axiosInstance.js";
import {COMPANY_API_ENDPOINT, JOB_API_ENDPOINT} from '../utils/constant.js'
import {useDispatch} from 'react-redux'
import { setCompanies } from '../redux/companySlice.js'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async() => {
        try {
            const res = await axiosInstance.get(`${COMPANY_API_ENDPOINT}/get`,{withCredentials:true});
            if(res.data.success){
                dispatch(setCompanies(res.data.companies));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchCompanies();
  },[])
}

export default useGetAllCompanies
