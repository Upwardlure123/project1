import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
// import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function JobModal({ isOpen, onClose, job }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
  });

  const addJob = useStore((state) => state.addJob);
  const updateJob = useStore((state) => state.updateJob);

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        title: '',
        description: '',
        requirements: '',
        location: '',
      });
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (job) {
      updateJob({ ...job, ...formData });
      toast.success('Job updated successfully');
    } else {
      addJob(formData);
      toast.success('Job added successfully');
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30"></div>

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {job ? 'Edit Job' : 'Add New Job'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              {/* <XMarkIcon className="h-6 w-6" /> */}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  className="input"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requirements
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button type="submit" className="btn btn-primary flex-1">
                {job ? 'Update Job' : 'Add Job'}
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

export default JobModal;
