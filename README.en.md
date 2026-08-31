# OfferPath Frontend

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath is a job application management platform for organizing opportunities scattered across recruiting services and company websites. It brings application status, skill matching, and interview progress into one focused workspace.

Backend repository: [offerpath-backend](https://github.com/hachiya-saku/offerpath-backend)

The main frontend screens and a NestJS / PostgreSQL backend API are now being developed in parallel. Japanese is the default interface language, with persistent Chinese language switching also available.

## Problems it addresses

- Job information is fragmented across multiple recruiting services
- Application and interview progress is difficult to track consistently
- Gaps between job requirements and personal skills are hard to evaluate
- There is no single view of application volume and conversion rates

## Current implementation

- Login page
- Dashboard for tracked jobs, active processes, and average match score
- Job status visualization powered by ECharts
- Job list with keyword, status, and platform filters
- Job form covering annual, monthly, and hourly pay, fixed overtime, employment type, and work mode
- Structured recruitment content for responsibilities, qualifications, selection process, benefits, and more
- Job detail page with skill analysis and a status timeline
- Online / in-person interview scheduling linked to job status progression
- Job status correction, mistaken progression undo, and change timeline
- Interview management with meeting details and Google Maps venue lookup
- Company directory, search, company detail, and related job views
- Personal profile and technical skill inventory
- Japanese / Chinese language switching with persisted preferences
- Desktop sidebar and mobile drawer navigation
- Responsive dark interface

All current data is static sample data. Login, persistence, editing, and deletion are not connected to a backend yet.

## Application statuses

```text
Interested -> Applied -> Screening -> 1st Interview -> 2nd Interview -> 3rd Interview -> Final -> Offer
     \________________________________________________________________________________ Rejected
```

Because recruitment processes differ between companies, the final product will allow users to move freely between statuses.

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
/            Dashboard
/jobs        Job list
/jobs/new    New job
/jobs/:id    Job detail
/companies   Company directory
/companies/:id Company detail
/interviews  Interview management
/profile     Skill profile
```

## Roadmap

1. Connect the frontend to the existing NestJS / PostgreSQL APIs
2. Registration, login, JWT authentication, and per-user data isolation
3. Complete job and company APIs, filtering, sorting, and pagination
4. Application status history
5. Personal skill management and weighted match scoring
6. Dashboard aggregation APIs and conversion metrics
7. AI-assisted structured extraction from job descriptions
8. Docker Compose and production deployment

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

The main static screens and responsive layouts are complete. Current work focuses on completing the backend APIs and replacing sample content with persisted data.
