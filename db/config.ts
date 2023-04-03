import mysql from "mysql2";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "auto-amigo-react",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const promisePool = pool.promise();
