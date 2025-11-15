# Todo App

A simple fullstack Todo application built with Express (Node.js) and React.

How to Run the Project

### Backend

```bash
cd backend
npm install
npx sequelize-cli db:migrate
npm start
```

Backend runs on: http://localhost:8080

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:3000


### Design Decisions

- Backend and frontend are separated into different folders.

- Backend uses Express + Sequelize + SQLite for a simple and easy setup.

- Todo API follows basic REST conventions (GET, POST, PUT, DELETE).

- Frontend uses React + clean components + API service functions.

- State is kept in the page, while item-level actions are inside individual components.


### Possible Improvements

- Add validation and error handling on both client and server.

- Add pagination or search filters.

- Add authentication (login system).

- Improve UI/UX with animations.

- Replace page reload with React state updates.
