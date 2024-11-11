import { useState } from 'react';
import useStore from '../../store/useStore';
import JobCard from './JobCard';
import JobModal from './JobModal';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobs = useStore((state) => state.jobs);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Add New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onEdit={() => handleEdit(job)} />
        ))}
      </div>

      <JobModal isOpen={isModalOpen} onClose={handleClose} job={selectedJob} />
    </div>
  );
}

export default Dashboard;
