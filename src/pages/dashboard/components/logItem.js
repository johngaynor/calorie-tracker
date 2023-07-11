import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function LogItem({ item, activeMacro }) {
  const [activeInfo, setActiveInfo] = useState("");

  useEffect(() => {
    const macroNames = ["cal", "protein", "carbs", "fat"];
    let activeMacroName = macroNames[activeMacro];
    let macroStats = [item.cal, item.protein, item.carbs, item.fat];
    let activeMacroStat = macroStats[activeMacro];
    setActiveInfo(activeMacroName + ": " + activeMacroStat);
  }, [activeMacro]);

  const showItemInfo = () => {
    alert(`
    Name: ${item.name}
    Calories: ${item.cal}kcal
    Protein: ${item.protein}g
    Carbs: ${item.carbs}g
    Fat: ${item.fat}g
    `);
  };

  return (
    <tr onClick={showItemInfo}>
      <td className="col-8 p-1">
        <p className="m-2 float-start text-start">{item.name}</p>
      </td>
      <td className="col-4">{activeInfo}</td>

      <td className="col-2 d-none d-lg-table-cell">
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{ height: "20px" }}
          className="mt-1"
        />
      </td>
    </tr>
  );
}
export default LogItem;
