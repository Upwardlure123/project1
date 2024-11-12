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
   git clone https://github.com/Upwardlure123/project1.git
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start

## File structure
project1/ <br>
├── public/ <br>
│   ├── index.html <br>
├── src/ <br>
│   ├── App.js <br>
│   ├── App.css <br>
│   ├── index.js <br>
│   ├── index.css <br>
│   ├── components/ <br>
│   │   ├── Assessments <br>
│   │   │   ├── AssessmentManager.js <br>
│   │   │   ├── AssessmentModal.js <br>
│   ├── ├── Candidates <br>
│   ├── │      ├── CandidateDetail.jsx <br>
│   ├── │      ├── CandidateList.jsx <br>
│   ├── │      ├── CandidateModal.jsx <br>
├── ├── │    Dashboard <br>
│   ├── │      ├── index.jsx <br>
│   ├── │      ├── JobCard.jsx <br>
│   ├── │      ├── JobModal.jsx <br>
│   ├── HomePage.jsx <br>
│   ├── Navbar.jsx <br>
│   ├── utils/ <br>
│   │   ├── constants.js <br>
├── .gitignore <br>
├── package.json <br>
├── README.md <br>
└── ...
