import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      jobs: [],
      candidates: [],
      assessments: [],

      // Job actions
      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, { ...job, id: Date.now(), candidates: [] }],
        })),

      updateJob: (updatedJob) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === updatedJob.id ? updatedJob : job
          ),
        })),

      deleteJob: (jobId) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== jobId),
        })),

      // Candidate actions
      addCandidate: (jobId, candidate) =>
        set((state) => ({
          candidates: [
            ...state.candidates,
            {
              ...candidate,
              id: Date.now(),
              jobId,
              status: "Under Review",
              applicationDate: new Date().toISOString(),
            },
          ],
        })),

      updateCandidateStatus: (candidateId, status) =>
        set((state) => ({
          candidates: state.candidates.map((candidate) =>
            candidate.id === candidateId ? { ...candidate, status } : candidate
          ),
        })),

      // Assessment actions
      addAssessment: (assessment) =>
        set((state) => ({
          assessments: [
            ...state.assessments,
            {
              ...assessment,
              id: Date.now(),
            },
          ],
        })),

      updateAssessment: (updatedAssessment) =>
        set((state) => ({
          assessments: state.assessments.map((assessment) =>
            assessment.id === updatedAssessment.id
              ? updatedAssessment
              : assessment
          ),
        })),

      deleteAssessment: (assessmentId) =>
        set((state) => ({
          assessments: state.assessments.filter(
            (assessment) => assessment.id !== assessmentId
          ),
        })),

      updateCandidate: (updatedCandidate) =>
        set((state) => ({
          candidates: state.candidates.map((candidate) =>
            candidate.id === updatedCandidate.id ? updatedCandidate : candidate
          ),
        })),

      updateCandidateNotes: (candidateId, notes) =>
        set((state) => ({
          candidates: state.candidates.map((candidate) =>
            candidate.id === candidateId ? { ...candidate, notes } : candidate
          ),
        })),

      addAssessmentResult: (candidateId, results) =>
        set((state) => ({
          candidates: state.candidates.map((candidate) =>
            candidate.id === candidateId
              ? { ...candidate, assessmentResults: results }
              : candidate
          ),
        })),
    }),
    {
      name: "hiring-platform-storage",
    }
  )
);

export default useStore;
