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

## ⚙️ Setup & Configuration (Run Locally)
clone project
```bash
git clone https://github.com/hygenec2olkid/concert-assignment.git
```

cd concert-assignment then run command
```bash
make up
```

---
## Bonus task
Express your opinion about how to optimize your website in case that this
website contains intensive data and when more people access, the lower speed
you get?
    - Implementing pagination to avoid loading large datasets at once  
    - Using lazy loading when fetching data
    - Minimizing unnecessary re-renders  
    - Using proper memoization (e.g., React.memo, useMemo)  
    - Use CDN for static assets

Express your opinion about how to handle when many users want to reserve the
ticket at the same time? We want to ensure that in the concerts there is no one
that needs to stand up during the show.
- This is a race condition problem. To prevent overbooking, there are two common approaches:
    1. Use database locking (e.g., row-level lock)
    2. Use atomic conditional update

I would choose **atomic conditional update** because it performs better under high concurrency.

Using database locks can cause heavy blocking. For example, if 1,000,000 users try to reserve at the same time, many requests may be forced to wait for the lock, which reduces performance and scalability.

Instead, I would use an atomic update like:

`UPDATE concert 
 SET available_seat = available_seat - 1
 WHERE id = ? AND available_seat > 0;`

Then check the affected rows:

- If 1 row is updated → reservation successful  
- If 0 rows are updated → no seat available  

This ensures no negative seat count and prevents double booking.

- Additionally, use transaction consistency. If any step fails, the transaction will roll back to maintain data consistency.