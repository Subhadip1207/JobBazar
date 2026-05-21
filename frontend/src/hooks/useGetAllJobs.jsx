import React, { useEffect } from 'react'
import axiosInstance from "../utils/axiosInstance.js";
import {JOB_API_ENDPOINT} from '../utils/constant.js'
import {useDispatch, useSelector} from 'react-redux'
import { setAllJobs } from '../redux/jobSlice.js'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job)
  useEffect(()=>{
    const fetchAllJobs = async() => {
        try {
            const res = await axiosInstance.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs
