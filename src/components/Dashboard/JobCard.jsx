import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiUsers } from 'react-icons/fi';
import useStore from '../../store/useStore';

function JobCard({ job, onEdit }) {
  const navigate = useNavigate();
  const deleteJob = useStore((state) => state.deleteJob);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => deleteJob(job.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-600 line-clamp-3">{job.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-gray-500">
          <FiUsers className="h-5 w-5 mr-1" />
          <span>{job.candidates?.length || 0} candidates</span>
        </div>

        <button
          onClick={() => navigate(`/jobs/${job.id}/candidates`)}
          className="btn btn-secondary"
        >
          View Candidates
        </button>
      </div>
    </div>
  );
}

export default JobCard;
