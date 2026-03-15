AI Journal Backend + Minimal Frontend

This project is a simple journaling application where users can create journal entries, analyze their emotions using AI, and view insights from their past entries.

The system consists of a Node.js backend API, a Python AI service, and a React frontend used to interact with the API.

⸻

Features
	•	Create a journal entry
	•	Analyze a journal entry using AI
	•	Detect emotions from text
	•	Generate summary and keywords
	•	View insights from all journals
	•	View all journal entries
	•	Minimal frontend to test APIs

⸻

Tech Stack

Frontend
	•	React
	•	Zustand (state management)
	•	Axios
	•	React Router
	•	React Hot Toast

Backend
	•	Node.js
	•	Express.js
	•	MongoDB
	•	Mongoose

AI Service
	•	Python
	•	NLP based text analysis

Project Architecture

project-root
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   └── server.js
│
├── ai-service
│   └── ai_service.py
│
├── frontend
│   ├── pages
│   ├── store
│   ├── lib
│   └── App.jsx
│
└── README.md

API Endpoints

Create Journal

POST

/api/journal


Body:

{
  "userId": "123",
  "text": "Today was a great day",
  "ambience": "forest"
}



Get All Journals

GET

/api/journal/123


Example: 

/api/journal/123


Analyze Journal

POST

/api/journal/analyze/:journalId


Example: 

/api/journal/analyze/65f1abc123


This will return
	•	Emotion
	•	Summary
	•	Keywords


Get Insights

GET

/api/journal/insights/:userId


Example: 

/api/journal/insights/123


Returns
	•	Total entries
	•	Most used ambience
	•	Top emotion
	•	Recent keywords



Environment Variables

Backend (.env)

PORT=3000
MONGO_URI=your_mongodb_connection
AI_SERVICE_URL=http://localhost:8000
NODE_ENV=production


AI Service (.env)

GEMINI_API_KEY=your_gemini_api_key



Running the Project Locally

1 Install Dependencies

npm run build


Install Python Dependencies

cd ai-service/

python -m venv venv

source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt


2 Start AI Service

cd ai-service
uvicorn main:app --reload --port 8000

3 Start Application

npm start



Notes
	•	The .env file is not included in the repository for security reasons.
	•	The AI service must be running before calling the analysis endpoint.



Author

Backend Developer Assignment Submission
    Ankit


Desclaimer


Project Purpose

This project was built as part of a Backend Developer assignment to demonstrate API design, AI integration, and scalable system architecture.
