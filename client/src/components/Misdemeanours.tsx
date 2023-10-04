import { useState, useContext } from "react";
import { MisdemeanourContext } from "../context/MisdemeanourContext";
import MisdemeanoursList from "./MisdemeanoursList";

const Misdemeanours: React.FC = () => {
  const { misdemeanours: allMisdemeanours } = useContext(MisdemeanourContext);
  const [filter, setFilter] = useState("");

  const misdemeanoursToDisplay = filter
    ? allMisdemeanours.filter((m) => m.misdemeanour === filter)
    : allMisdemeanours;

  return (
    <div>
      <MisdemeanoursList
        misdemeanours={misdemeanoursToDisplay}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default Misdemeanours;
