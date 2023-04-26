// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promisePool } from "../../db/config";

type Data = {
  name: string;
};

const deleteGas = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { gasId } = req.body;
    const query = `
      DELETE FROM GAS_LOG
      WHERE id = ${gasId}
    `;
    const [results] = await promisePool.query(query);
    return res.status(204).json(results);
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

const getGas = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw new Error(
        "Incomplete call. This API requires the userId as a parameter."
      );
    }
    const query = `
      SELECT * FROM GAS_LOG WHERE userId = ${userId};
    `;
    const [results] = await promisePool.query(query);
    return res.status(200).json(results);
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

const patchGas = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { gasId, previousMileage, currentMileage, gallons, pricePerGallon } =
      req.body;
    const query = `
      UPDATE GAS_LOG
      SET 
        previousMileage = ${previousMileage}
        currentMileage = ${currentMileage}
        gallons = ${gallons}
        pricePerGallon = ${pricePerGallon}
      WHERE id = ${gasId}
    `;
    const [results] = await promisePool.query(query);
    return res.status(200).json(results);
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

const postGas = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { userId, previousMileage, currentMileage, gallons, pricePerGallon } =
      req.body;
    const query = `
      INSERT INTO GAS_LOG (userId, previousMileage, currentMileage, gallons, pricePerGallon)
      VALUES (${userId}, ${previousMileage}, ${currentMileage}, ${gallons}, ${pricePerGallon});
    `;
    const [results] = await promisePool.query(query);
    return res.status(201).json(results);
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "DELETE":
      await deleteGas(req, res);
      break;
    case "GET":
      await getGas(req, res);
      break;
    case "PATCH":
      await patchGas(req, res);
      break;
    case "POST":
      await postGas(req, res);
      break;
    default:
      res.setHeader("Allow", ["DELETE", "GET", "PATCH", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
