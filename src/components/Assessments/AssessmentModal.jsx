import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
// import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function AssessmentModal({ isOpen, onClose, assessment }) {
  const [formData, setFormData] = useState({
    jobId: '',
    questions: [{ text: '', options: ['', '', '', ''], correctAnswer: 0 }],
  });

  const jobs = useStore((state) => state.jobs);
  const addAssessment = useStore((state) => state.addAssessment);
  const updateAssessment = useStore((state) => state.updateAssessment);

  useEffect(() => {
    if (assessment) {
      setFormData(assessment);
    } else {
      setFormData({
        jobId: jobs[0]?.id || '',
        questions: [{ text: '', options: ['', '', '', ''], correctAnswer: 0 }],
      });
    }
  }, [assessment, jobs]);

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { text: '', options: ['', '', '', ''], correctAnswer: 0 },
      ],
    });
  };

  const handleRemoveQuestion = (index) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    if (field === 'option') {
      newQuestions[index].options[value.index] = value.text;
    } else {
      newQuestions[index][field] = value;
    }
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.jobId ||
      formData.questions.some((q) => !q.text || q.options.some((o) => !o))
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (assessment) {
      updateAssessment(formData);
      toast.success('Assessment updated successfully');
    } else {
      addAssessment(formData);
      toast.success('Assessment created successfully');
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30"></div>

        <div className="relative bg-white rounded-lg w-full max-w-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {assessment ? 'Edit Assessment' : 'Create Assessment'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              {/* <XMarkIcon className="h-6 w-6" /> */}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Job
              </label>
              <select
                className="input"
                value={formData.jobId}
                onChange={(e) =>
                  setFormData({ ...formData, jobId: e.target.value })
                }
              >
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {formData.questions.map((question, qIndex) => (
                <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Question {qIndex + 1}
                    </h3>
                    {formData.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(qIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        {/* <TrashIcon className="h-5 w-5" /> */}
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter question"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, 'text', e.target.value)
                      }
                    />

                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={question.correctAnswer === oIndex}
                          onChange={() =>
                            handleQuestionChange(
                              qIndex,
                              'correctAnswer',
                              oIndex
                            )
                          }
                          className="h-4 w-4 text-blue-600"
                        />
                        <input
                          type="text"
                          className="input"
                          placeholder={`Option ${oIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleQuestionChange(qIndex, 'option', {
                              index: oIndex,
                              text: e.target.value,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              {/* <PlusIcon className="h-5 w-5 mr-1" /> */}
              Add Question
            </button>

            <div className="flex space-x-3">
              <button type="submit" className="btn btn-primary flex-1">
                {assessment ? 'Update Assessment' : 'Create Assessment'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssessmentModal;
