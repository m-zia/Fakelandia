import { fetchMisdemeanours } from "./fetchMisdemeanours"; // Adjust the import path if needed
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("fetchMisdemeanours tests", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Fetches misdemeanours successfully", async () => {
    const sampleResponse = {
      misdemeanours: [
        { citizenId: 5782, misdemeanour: "vegetables", date: "14/08/2023" },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(sampleResponse));

    const result = await fetchMisdemeanours();

    expect(result).toEqual(sampleResponse.misdemeanours);
  });

  test("check server error is handled", async () => {
    console.error = jest.fn(); // Self - getting a long console error, from googling a
    //suggesting is to suppress console errors. This doesn't
    //feel right, will have to investigate further
    fetchMock.mockRejectOnce(new Error("Server error"));

    const result = await fetchMisdemeanours();

    expect(result).toEqual([]);
  });

  test("Check 404 status is handled", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });

    const result = await fetchMisdemeanours();

    expect(result).toEqual([]);
  });
});
