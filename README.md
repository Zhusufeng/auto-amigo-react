# auto-amigo-react

## About

Auto Amigo is your car friend. This is the React version.

### Current Features

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- This uses Google OAuth using [next-auth](https://next-auth.js.org/).
- It keeps a gas log. When you go to the gas station, you enter your previous mileage (you can reference from your past entry), current mileage, gallons filled, and the price per gallon. It will give you your MPG and total spent.

### Desired Product Features

- Add ability to edit an entry to the gas log
- Add ability to delete an entry to the gas log
- Add validation to gas log form
- Add sorting to table
- Add charts using D3 or similar
- Create maintenance log (including oil change, tire rotation, etc)
- Create alert for oil change (upon insertion of gas log based on last oil change)

### Desired Tech Additions

- Add Jest to the frontend
- Add Jest to the backend
- Add API documentation
- Add logging
- Add metrics
- Add Snyk
- Change database from SQL to noSQL such as MongoDB or Firebase

## Development

### Requirements

- Docker
- MySQL 8.0
- Node.js (v18+)

### Getting Started

These are instructions to get the project running locally for development.

1. Clone the project locally.
   ```bash
   git clone https://github.com/Zhusufeng/auto-amigo-react.git
   ```
1. Get into the repo:
   ```bash
   cd auto-amigo-react
   ```
1. Download the packages.
   ```bash
   npm i
   ```
1. This uses a MySQL database. Create a database using Docker:
   ```bash
   docker create --name mysql_8.0_auto_amigo -p 3306:3306 -e MYSQL_ROOT_PASSWORD=your-password-here mysql:8.0
   ```
1. You will need to make sure you have installed the package, db-migrate, globally. (Do not use `sudo`).
   ```bash
   npm install -g db-migrate
   ```
1. Create a copy of example.env.local named .env. Fill out the file.
<!-- TODO: mysql2 or db-migrate cannot find the env variables when inside of .env.local.  -->
1. Migrate the database up (to get the structure).
   ```bash
   db-migrate up
   ```
1. Seed the database.
   ```bash
   node db/seed.js
   ```
1. Run the project
   ```bash
   npm run dev
   ```
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### APIs

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

- `/api/gas`
  - GET - gets gas log for a user
  - POST - adds a gas log entry for a user
- `/api/user`
  - GET - gets a user (to come)
  - POST - creates a user (to come)

## Deployment

TBD

<!-- The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
