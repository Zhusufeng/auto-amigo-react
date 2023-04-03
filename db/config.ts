import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "auto-amigo-react",
});

export const queryDb = (query: string) => {
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results) {
      if (error) reject(error);
      resolve(results);
    });
  });
};
