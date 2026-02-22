# concert-assignment

A web application for managing concerts and seat reservations.

---

## 👤 User Features

Users are able to:

- View all concerts (including sold-out concerts)
- Reserve a seat (1 seat per user)
- Cancel a reservation
- View their own reservation history

---

## Admin Features

Admins are able to:

- Create concerts
- Delete concerts
- View all users' reservation history

---

# 📦 Tech Stack

## Frontend

- **Next.js**             – React framework for building the UI
- **TypeScript**          – Static typing for better maintainability
- **Redux Toolkit**       - Manages global state (e.g., user/admin role)
- **Axios**               - Handles API requests
- **TailwindCSS**         - Utility styling
- **MUI (Material UI)**   - UI components

## Backend

- **NestJS** – Scalable Node.js framework for building RESTful APIs

## Database

- **PostgreSQL**
- **Docker** – Containerized database setup

---

## Application architecture
    project
    ├── api/                    # NestJS backend source code
    ├── db/                     # Database scripts SQL schema 
    ├── web/                    # Next.js frontend source code
    ├── docker-compose.yml      # Docker configuration for backend, frontend, and database
    ├── Makefile                # Helper commands for build and startup
    └── README.md               # Project documentation

---

# ⚙️ Setup & Configuration (Run Locally)
```bash
git clone https://github.com/hygenec2olkid/concert-assignment.git
cd concert-assignment