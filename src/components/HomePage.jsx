import React from "react";
import useStore from "../store/useStore";

const HomePage = () => {
  // Access the store to get the jobs, candidates, and assessments
  const { jobs, candidates, assessments } = useStore((state) => ({
    jobs: state.jobs,
    candidates: state.candidates,
    assessments: state.assessments,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <header className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Welcome back! Manage your jobs, candidates, and assessments below.
        </p>
      </header>
      <h1 className="text-3xl text-center mb-8 font-semibold">Platform Features</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {/* Job Management */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-200 transition hover:scale-125 transition-all duration-500 cursor-pointer">
          <h2 className="text-2xl font-semibold text-gray-900">Job Postings</h2>
          <p className="text-gray-600 mt-4">
            Create and manage job listings. Review and edit existing posts.
          </p>
          <div className="mt-6"></div>
        </div>

        {/* Candidate Tracking */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-200 transition hover:scale-125 transition-all duration-500 cursor-pointer">
          <h2 className="text-2xl font-semibold text-gray-900">
            Candidate Management
          </h2>
          <p className="text-gray-600 mt-4">
            View all candidates who have applied for your jobs. Review their
            profiles and application status.
          </p>
          <div className="mt-6"></div>
        </div>

        {/* Assessments */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between hover:bg-gray-200 transition hover:scale-125 transition-all duration-500 cursor-pointer">
          <h2 className="text-2xl font-semibold text-gray-900">
            Assessment Management
          </h2>
          <p className="text-gray-600 mt-4">
            Create assessments for candidates and track their results.
          </p>
          <div className="mt-6"></div>
        </div>
      </section>

      {/* Optional Stats Section */}
      <section className="mt-12 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">Active Jobs</h3>
            <p className="text-gray-600 mt-2">{jobs.length}</p>{" "}
            {/* Dynamic Job Count */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">
              Candidates Applied
            </h3>
            <p className="text-gray-600 mt-2">{candidates.length}</p>{" "}
            {/* Dynamic Candidate Count */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">
              Assessments Created
            </h3>
            <p className="text-gray-600 mt-2">{assessments.length}</p>{" "}
            {/* Dynamic Assessment Count */}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-600">
        <p>© 2024 Hiring Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
