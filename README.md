# 🛡 QA Risk Engine

A full-stack **QA Risk Analysis Platform** built using **Django (DRF)** and **React + TypeScript**.

This system analyzes code changes, calculates weighted regression risk, and prioritizes QA efforts using a custom scoring engine.

---

## 🚀 Tech Stack

### 🔹 Backend
- Django
- Django REST Framework
- PostgreSQL (configurable)
- JWT Authentication (structure ready)
- Modular App Architecture

### 🔹 Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Context API (Auth Architecture)
- Protected Route System

---

## 🧠 Core Features

### ✅ Risk Scoring Engine
- Weighted scoring based on:
  - Service Criticality
  - Change Type
  - Test Coverage
  - High Priority Impact
- Auto Risk Level Classification:
  - HIGH
  - MEDIUM
  - LOW

### ✅ Project Management
- Create & manage projects
- Service mapping
- Modular architecture

### ✅ Risk Registry
- Track active risks
- Severity classification
- Status tracking

### ✅ Testcase Management
- Add & manage test cases
- Priority & execution status
- Service mapping

### ✅ Authentication Architecture
- Centralized AuthContext
- ProtectedRoute wrapper
- Persistent login session
- Scalable for JWT integration

