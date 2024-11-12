import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CandidateList from './components/Candidates/CandidateList';
import CandidateDetail from './components/Candidates/CandidateDetail';
import AssessmentManager from './components/Assessments/AssessmentManager';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs/:jobId/candidates" element={<CandidateList />} />
            <Route path="/candidates/:candidateId" element={<CandidateDetail />} />
            <Route path="/assessments" element={<AssessmentManager />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;