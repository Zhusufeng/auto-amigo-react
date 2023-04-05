// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promisePool } from "../../db/config";

type Data = {
  name: string;
};

const getGas = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // TODO When we have multiple users, update to take in userId!
  const userId = 1;
  const query = `
    SELECT * FROM GAS_LOG WHERE userId = ${userId};
  `;
  const [results] = await promisePool.query(query);
  return res.status(200).json(results);
};

const postGas = async (req: NextApiRequest, res: NextApiResponse<any>) => {
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
