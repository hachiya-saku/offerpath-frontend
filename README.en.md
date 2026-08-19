# OfferPath

[日本語](README.md) | [简体中文](README.zh-CN.md) | [English](README.en.md)

OfferPath is a job application management platform for organizing opportunities scattered across recruiting services and company websites. It brings application status, skill matching, and interview progress into one focused workspace.

The project currently provides a static frontend prototype. A NestJS and PostgreSQL backend, authentication, and persistent data will be added as the project develops into a complete full-stack portfolio application.

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
- New job form with interactive skill tags
- Job detail page with skill analysis and a status timeline
- Personal profile and technical skill inventory
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
| Backend (planned) | NestJS |
| Database (planned) | PostgreSQL |
| Deployment (planned) | Docker Compose |

## Routes

```text
/login       Login
/            Dashboard
/jobs        Job list
/jobs/new    New job
/jobs/:id    Job detail
/profile     Skill profile
```

## Roadmap

1. NestJS and PostgreSQL backend foundation
2. Registration, login, JWT authentication, and per-user data isolation
3. Job CRUD, filtering, sorting, and pagination
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

The first static frontend prototype is complete. The next phase is to confirm the interface design and define the backend data model and API contracts.
