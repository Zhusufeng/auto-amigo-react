const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  // TODO: mysql2 is unable to get password
  // This requires a fix
  // In the meantime, replace variable with actual string
  password: process.env.MYSQL_PASSWORD,
  database: "auto-amigo-react",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

async function seed() {
  const seedUSERQuery = `
    INSERT INTO USER (email, password)
    VALUES ("me@me.com", "test");
  `;
  const seedGAS_LOGQuery = `
    INSERT INTO GAS_LOG (userId, previousMileage, currentMileage, gallons, pricePerGallon)
    VALUES (1, 0, 100, 10.45, 5);
  `;
  await promisePool.query(seedUSERQuery);
  await promisePool.query(seedGAS_LOGQuery);
  console.log("Database was seeded");
  // TODO It does not close
}

seed();
