import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Kolkata", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist"]
  },
  {
    filterType: "Salary",
    array: ["0.1-5 LPA", "6-15 LPA", "16-36 LPA"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full lg:w-[300px] md:min-w-[260px] bg-white p-6 rounded-2xl shadow-lg border sticky top-20">
      <h1 className="font-bold text-2xl text-[#6A38C2] mb-6">Filter Jobs</h1>
      
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-semibold text-gray-800 mb-3 text-lg border-b pb-1">{data.filterType}</h2>
            <div className="space-y-3 mt-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded-md transition-all" key={itemId}>
                    <RadioGroupItem value={item} id={itemId} className="accent-[#6A38C2]" />
                    <Label htmlFor={itemId} className="cursor-pointer text-sm text-gray-700">{item}</Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
