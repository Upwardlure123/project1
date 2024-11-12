# Admin Job Portal

## Project Overview

The **Admin Job Portal** is a web application built to streamline the hiring process for administrators. This platform allows administrators to add and manage job listings, create assessments for candidates, and track candidate status throughout the recruitment process.

### Key Features
- **Add Jobs**: Admins can post new job openings with detailed descriptions.
- **Create Assessments**: Custom assessments can be created for candidates applying to specific jobs.
- **Manage Candidates**: Admins can add candidate profiles and track applications.
- **Status Tracking**: Candidate status can be set to "Hired," "Under Review," etc., allowing for easy follow-up on the recruitment pipeline.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url/admin-job-portal.git
   cd admin-job-portal
2. Install dependencies:
   ```bash
  npm install
3. Start the development server:
  ```bash
  npm start

## File structure
project1/
├── public/
│   ├── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   ├── Assessments
│   │   │   ├── AssessmentManager.js
│   │   │   ├── AssessmentModal.js
│   ├── ├── Candidates
│   ├── │      ├── CandidateDetail.jsx
│   ├── │      ├── CandidateList.jsx
│   ├── │      ├── CandidateModal.jsx
├── ├── │    Dashboard
│   ├── │      ├── index.jsx
│   ├── │      ├── JobCard.jsx
│   ├── │      ├── JobModal.jsx
│   ├── HomePage.jsx
│   ├── Navbar.jsx
│   ├── utils/
│   │   ├── constants.js
├── .gitignore
├── package.json
├── README.md
└── ...
