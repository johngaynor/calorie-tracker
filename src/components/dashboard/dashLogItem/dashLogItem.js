import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function DashLogItem(item) {
  const [activeInfo, setActiveInfo] = useState("");
  useEffect(() => {
    const macroNames = ["cal", "protein", "carbs", "fat"];
    let activeMacroName = macroNames[item.activeMacro];
    let macroStats = [
      item.item.cal,
      item.item.protein,
      item.item.carbs,
      item.item.fat,
    ];
    let activeMacroStat = macroStats[item.activeMacro];
    setActiveInfo(activeMacroName + ": " + activeMacroStat);
  }, [item]);

  const showItemInfo = () => {
    alert(`
    Name: ${item.item.name}
    Calories: ${item.item.cal}kcal
    Protein: ${item.item.protein}g
    Carbs: ${item.item.carbs}g
    Fat: ${item.item.fat}g 
    `);
  };

  return (
    <tr onClick={showItemInfo}>
      <td className="col-8 p-1">
        <p className="m-2 float-start text-start">{item.item.name}</p>
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
export default DashLogItem;
