import { promisePool } from "../../db/config";

export const getUserIdByEmail = async (email: string): Promise<number> => {
  try {
    const query = `
      SELECT id FROM USER WHERE email = "${email}";
    `;
    const [results] = await promisePool.query(query);
    // If the email is not found in the db, return 0
    if (!results.length) {
      return 0;
    }
    return results[0].id;
  } catch (error: any) {
    const errorMessage = error.toString();
    throw new Error(errorMessage);
  }
};

export const createUser = async (email: string): Promise<number> => {
  try {
    const query = `
      INSERT INTO USER (email)
      VALUES ("${email}");
    `;
    const [results] = await promisePool.query(query);
    return results.insertId;
  } catch (error: any) {
    const errorMessage = error.toString();
    throw new Error(errorMessage);
  }
};
