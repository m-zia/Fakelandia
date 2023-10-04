import { Misdemeanour } from "../types/misdemeanours.types";

const url: string = "http://localhost:8080/api/misdemeanours/5";

type MisdemeanourResponse = {
  misdemeanours: Misdemeanour[];
};

export async function fetchMisdemeanours(): Promise<Misdemeanour[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data: MisdemeanourResponse = await response.json();
    return data.misdemeanours;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
