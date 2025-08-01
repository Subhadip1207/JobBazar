import React, { useEffect } from 'react';
import Navbar from './ui/shared/Navbar';
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAllJobs from '../hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear search query when component unmounts
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 my-10">
        <h1 className="font-bold text-xl mb-6">
          Search Results ({allJobs?.length})
        </h1>

        {
          allJobs?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No jobs found. Try adjusting your search criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Browse;
