// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { promisePool } from "../../db/config";

type Data = {
  name: string;
};

const getUserId = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<number> => {
  try {
    console.log("I am in getUserId");
    const session = await getServerSession(req, res, authOptions);
    console.log("session", session);
    if (session?.user?.email) {
      const query = `
        SELECT id FROM USER WHERE email = "${session.user.email}";
      `;
      const [results] = await promisePool.query(query);
      console.log(results);
      // If empty, add user to USER table and return id
      // If not empty, return the id!
      return 1;
    } else {
      return 0;
    }
    return 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getGas = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO When we have multiple users, update to take in userId!
  // TODO add try/catch
  const id = await getUserId(req, res);
  const userId = 1;
  const query = `
    SELECT * FROM GAS_LOG WHERE userId = ${userId};
  `;
  const [results] = await promisePool.query(query);
  return res.status(200).json(results);
};

const postGas = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  // TODO add try/catch
  const { userId, previousMileage, currentMileage, gallons, pricePerGallon } =
    req.body;
  const query = `
    INSERT INTO GAS_LOG (userId, previousMileage, currentMileage, gallons, pricePerGallon)
    VALUES (${userId}, ${previousMileage}, ${currentMileage}, ${gallons}, ${pricePerGallon});
  `;
  const [results] = await promisePool.query(query);
  return res.status(200).json(results);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      await getGas(req, res);
      break;
    case "POST":
      await postGas(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
