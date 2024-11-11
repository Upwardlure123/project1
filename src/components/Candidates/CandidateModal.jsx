import { useState } from 'react';
import useStore from '../../store/useStore';
// import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

function CandidateModal({ isOpen, onClose, jobId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });

  const addCandidate = useStore((state) => state.addCandidate);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload this to a server
      // Here we'll just create a local URL
      setFormData({ ...formData, resume: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.resume) {
      toast.error('Please fill in all required fields');
      return;
    }

    addCandidate(jobId, formData);
    toast.success('Candidate added successfully');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-30"></div>

        <div className="relative bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Candidate</h2>
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
                  Full Name *
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume *
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="input"
                />
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button type="submit" className="btn btn-primary flex-1">
                Add Candidate
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

export default CandidateModal;
