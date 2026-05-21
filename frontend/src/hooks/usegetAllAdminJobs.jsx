import React, { useEffect } from 'react'
import axiosInstance from "../utils/axiosInstance.js";
import {JOB_API_ENDPOINT} from '../utils/constant.js'
import {useDispatch} from 'react-redux'
import { setAllAdminJobs } from '../redux/jobSlice.js'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs = async() => {
        try {
            const res = await axiosInstance.get(`${JOB_API_ENDPOINT}/getadminjobs`,{withCredentials:true});
            if(res.data.success){
                console.log("Jobs fetched:", res.data.jobs); 
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllAdminJobs();
  },[])
}

export default useGetAllAdminJobs
