# Frontend Architecture

## Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Framework  | React 19 + TypeScript         |
| Build tool | Vite                          |
| Styling    | Tailwind CSS v3               |
| Routing    | React Router v7               |
| HTTP       | Axios                         |
| Testing    | Vitest + Testing Library      |

## Folder Structure

    src/
      types/
        employee.ts          # TypeScript interfaces for all data shapes
      services/
        api.ts               # Axios base config
        employeeService.ts   # Employee CRUD API calls
        insightService.ts    # Insights API calls
      pages/
        EmployeesPage.tsx    # Employee list, add, edit, delete
        InsightsPage.tsx     # Salary insights with tabs
      components/
        employees/
          EmployeeTable.tsx  # Table with edit/delete actions
          EmployeeForm.tsx   # Add/edit form
        shared/
          Navbar.tsx         # Navigation
          Pagination.tsx     # Page controls
      tests/
        setup.ts
        services/
          employeeService.test.ts
          insightService.test.ts

## Key Decisions

### 1. Service layer separation
API calls live in `services/` — components never call axios directly.
Same separation of concerns as Rails service objects.

### 2. TypeScript interfaces
All data shapes defined in `types/employee.ts`.

### 3. Page components as coordinators
Page components manage state and orchestrate service calls.
Child components (Table, Form, Pagination) are purely presentational.

### 4. TDD on service layer
Service functions are unit tested with mocked axios.
Tests are fast, deterministic, and isolated from the backend.

## Component Responsibilities

| Component       | Responsibility                              |
|-----------------|---------------------------------------------|
| EmployeesPage   | State management, orchestrates CRUD actions |
| EmployeeTable   | Displays employee rows, emits edit/delete   |
| EmployeeForm    | Controlled form, emits submit/cancel        |
| Pagination      | Previous/next controls, emits page change   |
| InsightsPage    | Tab state, calls insight services           |
| Navbar          | Navigation links with active state          |

## Testing Strategy

Tested the service layer (functions that call Rails API) using Vitest.
Component tests skipped for assessment scope — service tests cover the
critical data-fetching logic. Component tests would be the natural next step.