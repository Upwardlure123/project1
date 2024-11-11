import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiDownload,
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit2,
} from 'react-icons/fi';
import useStore from '../../store/useStore';
import { candidateStatuses } from '../../utils/constants';
import { toast } from 'react-hot-toast';

function CandidateDetail() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const candidate = useStore((state) =>
    state.candidates.find((c) => c.id === parseInt(candidateId))
  );

  const job = useStore((state) =>
    state.jobs.find((j) => j.id === candidate?.jobId)
  );

  const updateCandidateStatus = useStore(
    (state) => state.updateCandidateStatus
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(candidate?.notes || '');

  if (!candidate || !job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Candidate not found</p>
        <button onClick={() => navigate('/')} className="mt-4 btn btn-primary">
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateCandidateStatus(candidate.id, newStatus);
    toast.success('Candidate status updated');
  };

  const handleSaveNotes = () => {
    useStore.getState().updateCandidate({
      ...candidate,
      notes: editedNotes,
    });
    setIsEditing(false);
    toast.success('Notes updated successfully');
  };

  const getStatusColor = (status) => {
    const colors = {
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Interview Scheduled': 'bg-blue-100 text-blue-800',
      Offered: 'bg-purple-100 text-purple-800',
      Hired: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/jobs/${job.id}/candidates`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <FiArrowLeft className="h-5 w-5 mr-2" />
          Back to Candidates
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {candidate.name}
            </h1>
            <p className="text-gray-500">Applying for {job.title}</p>
          </div>

          <select
            value={candidate.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-4 py-2 rounded-full font-medium ${getStatusColor(
              candidate.status
            )}`}
          >
            {candidateStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <FiMail className="h-5 w-5 mr-2" />
                <a
                  href={`mailto:${candidate.email}`}
                  className="hover:text-blue-600"
                >
                  {candidate.email}
                </a>
              </div>

              {candidate.phone && (
                <div className="flex items-center text-gray-600">
                  <FiPhone className="h-5 w-5 mr-2" />
                  <a
                    href={`tel:${candidate.phone}`}
                    className="hover:text-blue-600"
                  >
                    {candidate.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center text-gray-600">
                <FiCalendar className="h-5 w-5 mr-2" />
                <span>
                  Applied{' '}
                  {new Date(candidate.applicationDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {candidate.resume && (
              <a
                href={candidate.resume}
                download
                className="mt-6 flex items-center justify-center btn btn-secondary w-full"
              >
                <FiDownload className="h-5 w-5 mr-2" />
                Download Resume
              </a>
            )}
          </div>
        </div>

        {/* Right Column - Notes and Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Notes</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50"
                >
                  <FiEdit2 className="h-5 w-5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div>
                <textarea
                  value={editedNotes}
                  onChange={(e) => setEditedNotes(e.target.value)}
                  className="w-full h-48 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add notes about the candidate..."
                />
                <div className="mt-4 flex space-x-3">
                  <button onClick={handleSaveNotes} className="btn btn-primary">
                    Save Notes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedNotes(candidate.notes || '');
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                {candidate.notes ? (
                  <p className="text-gray-600 whitespace-pre-line">
                    {candidate.notes}
                  </p>
                ) : (
                  <p className="text-gray-400 italic">No notes added yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Assessment Results Section */}
          {candidate.assessmentResults && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Assessment Results</h2>
              <div className="space-y-4">
                {candidate.assessmentResults.map((result, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{result.question}</span>
                      <span
                        className={
                          result.isCorrect
                            ? 'text-green-600 font-medium'
                            : 'text-red-600 font-medium'
                        }
                      >
                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="text-gray-600">Answered: {result.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateDetail;
