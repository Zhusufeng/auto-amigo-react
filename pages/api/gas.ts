// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promisePool } from "../../db/config";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = `
    SELECT * FROM GAS_LOG WHERE userId = 1;
  `;
  const [results] = await promisePool.query(query);
  res.status(200).json(results);
}
