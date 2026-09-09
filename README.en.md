# OfferPath Frontend

[![CI](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/hachiya-saku/offerpath-frontend/actions/workflows/ci.yml)

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath is a job application management platform for organizing opportunities scattered across recruiting services and company websites. It brings application status, skill matching, and interview progress into one focused workspace.

Backend repository: [offerpath-backend](https://github.com/hachiya-saku/offerpath-backend)

Authentication, profiles, job CRUD, company data, interview management, and application status history are connected to the NestJS / PostgreSQL APIs. Japanese is the default interface language, with persistent Chinese language switching also available.

## Problems it addresses

- Job information is fragmented across multiple recruiting services
- Application and interview progress is difficult to track consistently
- Gaps between job requirements and personal skills are hard to evaluate
- There is no single view of application volume and conversion rates

## Current implementation

- Registration, login, automatic token refresh, logout, and protected routes
- Sample dashboard for tracked jobs, active processes, and average match score
- Job status visualization powered by ECharts
- Job list with keyword, status, and platform filters
- Job form covering annual, monthly, and hourly pay, fixed overtime, employment type, and work mode
- Structured recruitment content for responsibilities, qualifications, selection process, benefits, and more
- Job detail page with skill analysis and a status timeline
- Online / in-person interview scheduling linked to job status progression
- Constrained status progression, rejected/offer outcomes, and step-by-step undo
- Interview management with meeting details and Google Maps venue lookup
- Persisted company directory, search, details, related jobs, and profile editing
- Persisted personal profile editing and a sample technical skill inventory
- Japanese / Chinese language switching with persisted preferences
- Desktop sidebar and mobile drawer navigation
- Responsive dark interface

Jobs, companies, interviews, and profiles are persisted in PostgreSQL. Dashboard aggregation and personal skills currently use sample data.

## Backend integration readiness

- User registration, password login, and Access Token authentication
- Refresh Token rotation, logout, and token invalidation
- JWT-based per-user data isolation
- Current user profile retrieval and updates
- Persisted job, company, and interview APIs
- Constrained job status progression, change history, and step-by-step undo
- Prisma / PostgreSQL, unit tests, E2E tests, and GitHub Actions CI

## Application statuses

```text
Interested -> Applied -> Screening -> 1st Interview -> 2nd Interview -> 3rd Interview -> Final -> Offer
     \________________________________________________________________________________ Rejected
```

Interview stages can skip forward to match each company's process, while mistakes can only be undone one effective change at a time.

## Tech stack

| Category | Technology |
| --- | --- |
| Frontend | React 19, TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| State management | Redux Toolkit |
| UI / CSS | shadcn/ui, Tailwind CSS 4, CSS |
| Icons | Lucide React |
| Charts | ECharts |
| HTTP client | Axios |
| Static analysis | Oxlint |
| Backend | NestJS, Prisma ORM |
| Database | PostgreSQL |
| Deployment (planned) | Docker Compose |

## Routes

```text
/login       Login
/register    Registration
/            Dashboard
/jobs        Job list
/jobs/new    New job
/jobs/:id    Job detail
/jobs/:id/edit Edit job
/companies   Company directory
/companies/:id Company detail
/interviews  Interview management
/profile     Skill profile
```

## Roadmap

### MVP release target: 2026-09-13

1. `09-09`: Server-side job search, filtering, sorting, and pagination
2. `09-10`: Company suggestions, personal skill CRUD, and basic match scoring
3. `09-11`: Dashboard aggregation APIs and non-AI structured job URL parsing
4. `09-12`: Frontend integration plus Japanese/Chinese loading, empty, and error-state review
5. `09-13`: Docker Compose, production deployment, E2E acceptance, screenshots, and final documentation

Post-MVP work includes interview editing/deletion, a unified API response envelope, third-party login, and AI-assisted parsing.

## Local development

Node.js `^20.19.0 || >=22.12.0` is required.

```bash
npm install
npm run dev
```

The app starts at <http://localhost:5173> by default.

```bash
npm run build    # Type-check and build for production
npm run lint     # Run static analysis
npm run preview  # Preview the production build
```

## Project status

The main authentication, job, company, interview, and profile workflows use real APIs. Remaining MVP work centers on pagination, skills, dashboard metrics, URL parsing, and deployment.
