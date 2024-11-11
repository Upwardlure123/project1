import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/useStore';
import CandidateModal from './CandidateModal';
import { statusColors } from '../../utils/constants';

function CandidateList() {
  const { jobId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = useStore((state) =>
    state.jobs.find((j) => j.id === parseInt(jobId))
  );

  const candidates = useStore((state) =>
    state.candidates.filter((c) => c.jobId === parseInt(jobId))
  );

  if (!job) return <div>Job not found</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600">Candidates ({candidates.length})</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Add Candidate
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </tbody>
        </table>
      </div>

      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={parseInt(jobId)}
      />
    </div>
  );
}

function CandidateRow({ candidate }) {
  const updateStatus = useStore((state) => state.updateCandidateStatus);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{candidate.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-500">{candidate.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-500">
          {new Date(candidate.applicationDate).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={candidate.status}
          onChange={(e) => updateStatus(candidate.id, e.target.value)}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusColors[candidate.status]
          }`}
        >
          <option value="Under Review">Under Review</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offered">Offered</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a
          href={candidate.resume}
          className="text-blue-600 hover:text-blue-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </a>
      </td>
    </tr>
  );
}

export default CandidateList;
