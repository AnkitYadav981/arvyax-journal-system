System Overview

This project is a journaling application that allows users to:
	•	Create journal entries
	•	Analyze journal entries using an AI service
	•	Extract emotion, summary, and keywords
	•	Generate insights from past journals

The system is composed of three main components:
	1.	Frontend (React)
	2.	Backend API (Node.js + Express)
	3.	AI Service (Python)


High-Level Architecture

User
  |
  v
React Frontend
  |
  v
Node.js Backend API
  |
  v
Python AI Service
  |
  v
LLM / NLP Processing


1. How would you scale this to 100k users?

To support 100k users, the system would need improvements in infrastructure and service design.

Horizontal Scaling

The backend API would be deployed behind a load balancer and scaled horizontally using multiple instances.

Example architecture:

Users
  |
Load Balancer
  |
  |------ Backend Instance 1
  |------ Backend Instance 2
  |------ Backend Instance 3

This allows the system to distribute requests across multiple servers.

Containerization

Each service would run in containers using Docker and be managed using Kubernetes or a cloud orchestration platform.

Benefits:
	•	automatic scaling
	•	health monitoring
	•	fault tolerance

Database Scaling

MongoDB scaling strategies:
	•	Indexing frequently queried fields (userId)
	•	Read replicas for analytics queries
	•	Sharding by userId if dataset becomes very large

Queue-Based Processing

Journal analysis is AI-heavy. Instead of processing it synchronously:
	1.	Backend receives request
	2.	Job is pushed to a message queue (RabbitMQ / Redis Queue)
	3.	Worker processes handle AI analysis

This prevents blocking API requests.

⸻

2. How would you reduce LLM cost?

LLM calls are typically the most expensive part of the system.

Several strategies can reduce cost:

1. Use Smaller Models

Instead of always using large LLMs:
	•	Emotion detection → small classification model
	•	Keyword extraction → NLP pipeline
	•	Summary → small LLM

This reduces token cost significantly.

2. Batch Processing

Multiple journal analyses could be processed together in batch jobs rather than individually.

3. Prompt Optimization

Reducing unnecessary prompt tokens lowers cost.

Example improvements:
	•	remove redundant instructions
	•	reduce system prompt size
	•	avoid sending unnecessary metadata

4. Use Hybrid AI

Combine:
	•	traditional NLP (keyword extraction)
	•	lightweight ML models
	•	LLM only when necessary

⸻

3. How would you cache repeated analysis?

Many users may request analysis multiple times for the same journal entry.

To avoid repeated AI calls, we implemented caching.

Database Caching

After analysis is completed, the results are stored in the database:

    journal {
    text
    emotion
    summary
    keywords
    }


When a user requests analysis again:
	1.	Backend checks if analysis fields already exist
	2.	If yes → return cached result
	3.	If no → call AI service

In-Memory Cache

For frequently accessed entries, we could also use Redis.

Example flow:

Request
  |
Check Redis Cache
  |
Hit -> return cached analysis
Miss -> call AI service


This prevents unnecessary LLM calls.


4. How would you protect sensitive journal data?

Journal entries contain highly sensitive personal information.

Security measures must be implemented.

Encryption

Sensitive data should be encrypted:
	•	Encryption at rest (database encryption)
	•	Encryption in transit (HTTPS / TLS)

Access Control

Users should only access their own journals.

Authentication methods:
	•	JWT authentication
	•	userId validation in API

Example check:

    if journal.userId !== request.user.id
        return unauthorized

Data Minimization

The system should store only necessary data.

Avoid storing:
	•	IP addresses
	•	unnecessary metadata

Secure Environment Variables

Secrets such as database credentials or API keys must be stored in .env files and never committed to version control.

Rate Limiting

To prevent abuse of AI endpoints:
	•	API rate limiting
	•	request throttling

⸻

Conclusion

The system is designed with a modular architecture separating:
	•	frontend
	•	backend
	•	AI processing

This design allows each component to scale independently, improve cost efficiency, and maintain strong security practices while handling increasing user demand.
:::