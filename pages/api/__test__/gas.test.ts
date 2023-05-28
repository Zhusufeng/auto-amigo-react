import { deleteGas, getGas } from "../gas";
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

test("getGas", async () => {
  const req: NextApiRequest = {
    url: "/api/gas",
    query: {
      userId: "1",
    },
  } as unknown as NextApiRequest;

  const mockedResult = [
    {
      id: 100,
      userId: 1,
      previousMileage: 100,
      currentMileage: 200,
      gallons: 10,
      pricePerGallon: 5.0,
      updatedAt: "2023-04-16T21:52:35.000Z",
      createdAt: "2023-04-16T21:52:35.000Z",
    },
  ];

  db.promisePool.query.mockImplementationOnce(async (query: string) => {
    // Spacing must also match
    const testQuery = `
      SELECT * FROM GAS_LOG WHERE userId = 1;
    `;
    expect(query).toEqual(testQuery);
    return [mockedResult];
  });

  const mockedJson = jest.fn();
  const mockedRes: jest.Mocked<NextApiResponse> = {
    status: jest.fn().mockReturnValue({ json: mockedJson }),
  } as unknown as jest.Mocked<NextApiResponse>;

  await getGas(req, mockedRes);
  expect(mockedRes.status).toHaveBeenCalledWith(200);
  expect(mockedJson).toHaveBeenCalledWith(mockedResult);
});
