import React from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiFileText } from 'react-icons/fi';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center flex-shrink-0 text-xl font-bold text-blue-600"
            >
              <FiBriefcase className="h-6 w-6 mr-2" />
              Hiring Platform
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              <FiBriefcase className="h-5 w-5 mr-1" />
              Jobs
            </Link>
            <Link
              to="/assessments"
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              <FiFileText className="h-5 w-5 mr-1" />
              Assessments
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
