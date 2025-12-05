# 🚀 Full-Stack Blog Application  
### React + Node.js + Express + Sequelize + PostgreSQL

This project is a full-stack Blog App supporting:

- User Authentication (Login / Register)
- Create Posts
- Upload Multiple Images
- Likes & Comments
- My Posts
- Feed Page
- REST API (Node + Express)
- PostgreSQL + Sequelize (with migrations, seeds, and models)
- React Frontend (Redux Toolkit + Axios + Vite)

This guide provides **all steps** required from zero → running the complete system.

---

# 📌 1. **Prerequisites**

Before running the project, install:

### ✔ Node.js (LTS)
Download: https://nodejs.org/

Verify:
```sh
node -v
npm -v
```

---

### ✔ PostgreSQL
Download:  
https://www.postgresql.org/download/

During installation:

| Option | Value |
|--------|--------|
| Port | 5432 |
| Username | postgres |
| Password | (choose one & remember) |

After installation, create the database:

Open **psql** or **pgAdmin**:

```sql
CREATE DATABASE react_node_blog;
```

---

# 📁 2. **Project Structure**

```
project/
│
├── backend/
│   ├── migrations/
│   ├── seeders/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── uploads/
│   ├── app.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    ├── public/
    ├── vite.config.js
    └── package.json
```

---

# ⚙️ 3. **Backend Setup**

Go to backend directory:

```sh
cd backend
npm install
```

## 📌 3.2 Create uploads folder

```sh
mkdir uploads
```

---

# 🗄️ 4. **Database Setup (Migrations + Seeders)**

### Run migrations:

```sh
npm run migrate
```

### Run seeders:

```sh
npm run seed
```

If everything is correct:

```
Migrations executed successfully
Seed data inserted
```

---

# ▶️ 5. **Run Backend**

```sh
npm run dev
```

API base URL:

```
http://localhost:4000
```

Image files served from:

```
http://localhost:4000/uploads/<file>
```

---

# 🎨 6. **Frontend Setup**

Open terminal #2 (backend remains running):

```sh
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🔌 7. **API Endpoints**

## **Auth**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |

---

## **Posts**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/posts` | Public feed |
| GET | `/api/posts/:id` | Post details |
| GET | `/api/posts/me` | My posts |
| POST | `/api/posts` | Create post + upload images |
| POST | `/api/posts/:id/like` | Toggle like |
| POST | `/api/posts/:id/comments` | Add comment |

**Image upload field name:**  
```
images
```

---

# 📡 8. **Frontend Image Handling**

Backend returns paths like:

```
/uploads/17321-abc.png
```

Frontend must prepend server URL:

```js
<img src={`http://localhost:4000${src}`} />
```

---

# 🧪 9. **Common Commands**

| Action | Command |
|--------|----------|
| Install backend deps | `npm install` |
| Install frontend deps | `npm install` |
| Run migrations | `npm run migrate` |
| Run seeders | `npm run seed` |
| Start backend | `npm run dev` |
| Start frontend | `npm run dev` |
| Undo last migration | `npx sequelize db:migrate:undo` |
| Undo all migrations | `npx sequelize db:migrate:undo:all` |
