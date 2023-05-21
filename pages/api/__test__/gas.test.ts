import { deleteGas } from "../gas";
import type { NextApiRequest, NextApiResponse } from "next";
import * as db from "../../../db/config";

jest.mock("../../../db/config", () => {
  return {
    promisePool: {
      query: jest.fn(),
    },
  };
});

test("deleteGas", async () => {
  const req: NextApiRequest = {
    url: "/api/gas",
    body: {
      gasId: 1,
    },
  } as NextApiRequest;

  db.promisePool.query.mockImplementationOnce(async (query: string) => {
    // Spacing must also match
    const testQuery = `
      DELETE FROM GAS_LOG
      WHERE id = 1
    `;
    expect(query).toEqual(testQuery);
    return;
  });

  const mockedJson = jest.fn();
  const mockedRes: jest.Mocked<NextApiResponse> = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
  } as unknown as jest.Mocked<NextApiResponse>;

  await deleteGas(req, mockedRes);
  expect(mockedRes.status).toHaveBeenCalledWith(204);
});
