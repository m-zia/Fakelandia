import { Misdemeanour } from "../types/misdemeanours.types";
import "../styles/misdemeanoursList.css";

type MisdemeanoursListProps = {
  misdemeanours: Misdemeanour[];
  filter: string;
  setFilter: (filter: string) => void;
};

const MisdemeanoursList: React.FC<MisdemeanoursListProps> = ({
  misdemeanours,
  filter,
  setFilter,
}) => {
  const uniqueMisdemeanours = [
    ...new Set(misdemeanours.map((m) => m.misdemeanour)),
  ];

  const getLongName = (misdemeanourType: string) => {
    switch (misdemeanourType) {
      case "rudeness":
        return "🤪 Mild Public Rudeness";
      case "lift":
        return "🗣 Speaking in a Lift";
      case "vegetables":
        return "🥗 Not Eating Your Vegetables";
      case "united":
        return "😈 Supporting Manchester United";
      default:
        return misdemeanourType;
    }
  };

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th className="table__header-cell">Citizen ID</th>
          <th className="table__header-cell">Date</th>
          <th className="table__header-cell">
            Misdemeanour{" "}
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="">All</option>
              {uniqueMisdemeanours.map((misdemeanour, index) => (
                <option key={index} value={misdemeanour}>
                  {getLongName(misdemeanour)} {/* Using the long name here */}
                </option>
              ))}
            </select>
          </th>
          <th className="table__header-cell">Punishment</th>
        </tr>
      </thead>
      <tbody>
        {misdemeanours.map((misdemeanour, index) => (
          <tr
            key={index}
            className={
              index % 2 === 0 ? "table__row table__row--even" : "table__row"
            }
          >
            <td className="table__cell">{misdemeanour.citizenId || "XXXX"}</td>
            <td className="table__cell">{misdemeanour.date}</td>
            <td className="table__cell">
              {getLongName(misdemeanour.misdemeanour)}
            </td>

            <td className="table__cell">
              <img
                src={`https://picsum.photos/100/100?random=${index}`}
                alt={`Punishement Image for Citizen ${misdemeanour.citizenId}`}
                width={50}
                height={50}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MisdemeanoursList;
