import { useState, useEffect, createContext } from "react";
import { fetchMisdemeanours } from "../hooks/fetchMisdemeanours";
import { Misdemeanour } from "../types/misdemeanours.types";

export type MisdemeanourContextType = {
  misdemeanours: Misdemeanour[];
  addMisdemeanour: (misdemeanour: Misdemeanour) => void;
};

export const MisdemeanourContext = createContext<MisdemeanourContextType>({
  misdemeanours: [],
  addMisdemeanour: () => {},
});

interface Props {
  children: React.ReactNode;
}

// FYI - In React 18 the FunctionComponent interface has changed, PropsWithChildren has been removed
// this means the children prop needs to be included manually.

export const MisdemeanourProvider: React.FC<Props> = ({ children }) => {
  const [misdemeanourData, setMisdemeanourData] = useState<Misdemeanour[]>([]);

  useEffect(() => {
    fetchMisdemeanours().then((data) => {
      console.log("Fetched misdemeanours:", data); // Debug line
      setMisdemeanourData(data);
    });
  }, []);

  const addMisdemeanour = (misdemeanour: Misdemeanour) => {
    setMisdemeanourData([...misdemeanourData, misdemeanour]);
  };

  return (
    <MisdemeanourContext.Provider
      value={{ misdemeanours: misdemeanourData, addMisdemeanour }}
    >
      {children}
    </MisdemeanourContext.Provider>
  );
};
