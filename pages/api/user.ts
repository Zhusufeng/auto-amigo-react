import { promisePool } from "../../db/config";

export const getUserIdByEmail = async (email: string): Promise<number> => {
  try {
    console.log("I am in getUserIdByEmail");
    const query = `
      SELECT id FROM USER WHERE email = "${email}";
    `;
    const [results] = await promisePool.query(query);
    console.log("getUserIdByEmail results", results);

    // If the email is not found in the db, return 0
    if (!results.length) {
      return 0;
    }
    return results[0];
  } catch (error: any) {
    console.log("getUserIdByEmail", error);
    const errorMessage = error.toString();
    throw new Error(errorMessage);
  }
};

export const createUser = async (email: string): Promise<number> => {
  try {
    console.log("I am in createUser");
    const query = `
      INSERT INTO USER (email)
      VALUES ("${email}");
    `;
    const [results] = await promisePool.query(query);
    console.log("createUser results", results);
    return results[0];
  } catch (error: any) {
    console.log("createUser", error);
    const errorMessage = error.toString();
    throw new Error(errorMessage);
  }
};
