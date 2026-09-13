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
- Live API dashboard with job counts, application status, matching, conversion rates, and recent jobs
- Job status visualization powered by ECharts
- Job list with keyword, status, and platform filters
- Job form covering annual, monthly, and hourly pay, fixed overtime, employment type, and work mode
- Structured recruitment content for responsibilities, qualifications, selection process, benefits, and more
- Job detail page with skill analysis and a status timeline
- Online / in-person interview scheduling linked to job status progression
- Constrained status progression, rejected/offer outcomes, and step-by-step undo
- Interview management with meeting details and Google Maps venue lookup
- Persisted company directory, search, details, related jobs, and profile editing
- Persisted personal profiles, skill CRUD, and proficiency-weighted job matching
- Japanese / Chinese language switching with persisted preferences
- Desktop sidebar and mobile drawer navigation
- Responsive dark interface

Jobs, companies, interviews, profiles, and skills are persisted in PostgreSQL. Dashboard metrics also use real APIs.

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

### Remaining MVP work

1. Japanese/Chinese, authorization, common UI-state, and workflow verification
2. Docker Compose and production deployment
3. Final E2E acceptance, screenshots, and documentation

Post-MVP work includes URL parsing (non-AI / AI), interview editing/deletion, a unified API response envelope, and third-party login.

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

Core workflows and dashboard metrics use real APIs. Remaining MVP work centers on Japanese/Chinese and workflow verification, deployment, and final documentation. URL parsing is post-MVP.
