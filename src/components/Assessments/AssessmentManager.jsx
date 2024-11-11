import { useState } from 'react';
import useStore from '../../store/useStore';
import AssessmentModal from './AssessmentModal';
// import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function AssessmentManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const assessments = useStore((state) => state.assessments);
  const jobs = useStore((state) => state.jobs);
  const deleteAssessment = useStore((state) => state.deleteAssessment);

  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedAssessment(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Create Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => {
          const job = jobs.find((j) => j.id === assessment.jobId);
          return (
            <div key={assessment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job?.title} Assessment
                  </h3>
                  <p className="text-sm text-gray-500">
                    {assessment.questions.length} questions
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(assessment)}
                    className="p-1 text-gray-500 hover:text-blue-600"
                  >
                    {/* <PencilIcon className="h-5 w-5" /> */}
                  </button>
                  <button
                    onClick={() => deleteAssessment(assessment.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    {/* <TrashIcon className="h-5 w-5" /> */}
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Sample Questions:
                </h4>
                <ul className="space-y-2">
                  {assessment.questions.slice(0, 2).map((question, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      • {question.text}
                    </li>
                  ))}
                  {assessment.questions.length > 2 && (
                    <li className="text-sm text-gray-500 italic">
                      ...and {assessment.questions.length - 2} more
                    </li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <AssessmentModal
        isOpen={isModalOpen}
        onClose={handleClose}
        assessment={selectedAssessment}
      />
    </div>
  );
}

export default AssessmentManager;
