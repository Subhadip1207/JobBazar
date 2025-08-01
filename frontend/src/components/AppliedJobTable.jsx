import { useSelector } from 'react-redux';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';
import React from 'react';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="overflow-x-auto w-full">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title || "N/A"}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  {appliedJob?.status === "accepted" && (
                    <Badge className="bg-green-500">{appliedJob?.status.toUpperCase()}</Badge>
                  )}
                  {appliedJob?.status === "pending" && (
                    <Badge className="bg-gray-500">{appliedJob?.status.toUpperCase()}</Badge>
                  )}
                  {appliedJob?.status === "rejected" && (
                    <Badge className="bg-red-500">{appliedJob?.status.toUpperCase()}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
