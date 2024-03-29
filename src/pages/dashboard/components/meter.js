import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

import styles from "../styles/meter.css";

function Meter({ activeMacro, userMacros, userGoals }) {
  const [macroName, setMacroName] = useState("");
  const [macroPercent, setMacroPercent] = useState("");
  const [macroNum, setMacroNum] = useState(0);
  const [macroGoal, setMacroGoal] = useState(0);

  useEffect(() => {
    // changing color on meter
    const pieCenter = document.querySelector("#pie-center");
    const macroTypes = ["cal", "protein", "carbs", "fat"];
    let currentMacro = macroTypes[activeMacro];
    setMacroNum(userMacros[`${currentMacro}`]);
    setMacroGoal(userGoals[`${currentMacro}`]);
    pieCenter.classList.remove(...pieCenter.classList);
    pieCenter.classList.add(activeMacro);
    // changing display information
    const macroNames = ["Calories", "Protein", "Carbs", "Fat"];
    setMacroName(macroNames[activeMacro]);
  }, [activeMacro, userMacros]);

  useEffect(() => {
    const percent = ((macroNum / macroGoal) * 100).toFixed(0);
    if (percent >= 100) {
      setMacroPercent(100);
    } else {
      setMacroPercent(percent);
    }
  }, [macroNum, macroGoal]);

  useEffect(() => {
    const macroColors = [
      "--site-yellow",
      "--site-olivegreen",
      "--site-oceanblue",
      "--site-greyblue",
    ];

    let currentColor = macroColors[activeMacro];
    const pieCenter = document.querySelector("#pie-center");
    pieCenter.style.background = `conic-gradient(var(--site-black) ${
      macroPercent * 1.8
    }deg, var(${currentColor}) 0deg)`;

    const pieOuter = document.querySelector(".outer-circle");
    pieOuter.style.background = `conic-gradient(var(--site-black) ${
      macroPercent * 1.8
    }deg, #0000 0deg)`;
  }, [activeMacro, macroPercent]);

  return (
    <MDBContainer
      className="w-100 p-2 m-2 text-muted"
      style={{ height: "250px", backgroundColor: `var(--site-lightgrey)` }}
    >
      <MDBRow>
        <h4 className="d-flex align-left">{macroName}:</h4>
        <p className="d-flex align-left">
          {macroNum}/{macroGoal}
        </p>
      </MDBRow>
      <MDBContainer className="progress-container w-100">
        <div className="progress-circle">
          <div className="outer-circle"></div>
          <div className="pie"></div>
          <div id="pie-center"></div>
        </div>
      </MDBContainer>
      <MDBRow>
        <h4 className="mt-2">{macroPercent}%</h4>
      </MDBRow>
    </MDBContainer>
  );
}

export default Meter;
