# Personal Finance Tracker

A personal finance tracker built with React and Node.js/Express. It supports account registration and login, dashboard totals, monthly charts, and transaction management.

## Requirements

- Node.js 18 or newer. Download the LTS release from [nodejs.org](https://nodejs.org).
- Two terminal windows, so the backend and frontend can run at the same time.

To check your Node.js version, run:

```sh
node -v
```

## Getting started

1. Unzip `finance-tracker-react.zip` and open a terminal in the extracted project folder.
2. Start the backend in the first terminal:

   ```sh
   cd backend
   npm install
   npm start
   ```

   The backend runs at [http://localhost:5000](http://localhost:5000).

3. Start the frontend in a second terminal, from the project folder:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser, register an account, and start adding transactions.

### Optional: Set a JWT secret

For local development, the app can use its default JWT secret. To set your own secret, do this before starting the backend.

PowerShell:

```powershell
$env:JWT_SECRET="any-long-random-text"
```

macOS or Linux:

```sh
export JWT_SECRET="any-long-random-text"
```

## Features

- Passwords are hashed with bcrypt and accounts use JWT-based authentication.
- Dashboard totals and a monthly chart built with Chart.js.
- Create, edit, and delete transactions.
- Filter transactions by date range, category, and description text.

## Project structure

```text
backend/
  server.js            Starts the app
  routes.js            Maps URLs to controllers
  controllers/         Handles requests and responses
  services/            Login, transactions, and totals logic
  middleware/          JWT checks and error handling
  utils/               Logger, JSON-file database, and validators
  config/constants.js  Fixed application values
frontend/src/
  App.jsx              Login and dashboard
  api.js               Backend API calls
  components/          Login, dashboard, chart, forms, filters, and list
```

## Implementation notes

- **Storage:** The app uses a JSON file at `backend/data/db.json` instead of SQLite, so no native database installation is needed. For a production app, replace `utils/db.js` with a database suited to your needs.
- **Logging:** A small built-in logger writes to the console and `backend/logs/app.log`. It records logins, failed logins, and transaction creation, updates, and deletions.
- **JavaScript:** The project uses plain JavaScript rather than TypeScript. Validators in `utils/validators.js` check incoming data.
