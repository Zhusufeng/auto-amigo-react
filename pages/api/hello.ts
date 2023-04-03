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
  const [results] = await promisePool.query("SELECT * FROM USER");
  console.log(results);
  res.status(200).json({ name: "John Doe" });
}
