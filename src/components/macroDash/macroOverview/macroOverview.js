import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faChartPie,
  faCow,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import firebase from "../../../utilities/firebase";
import MacroMeter from "../macroMeter/macroMeter";
import styles from "./macroOverview.css";

function MacroOverview({ macro }) {
  const [mealList, setMealList] = useState("");
  let [macroGoal, setMacroGoal] = useState("");
  let [macroCurrent, setMacroCurrent] = useState("");
  let [totalCal, setTotalCal] = useState(0);
  let [totalProtein, setTotalProtein] = useState(0);
  let [totalCarbs, setTotalCarbs] = useState(0);
  let [totalFat, setTotalFat] = useState(0);

  useEffect(() => {
    const mealRef = firebase.database().ref("user-log");
    mealRef.on("value", (snapshot) => {
      const meals = snapshot.val();
      const mealList = [];
      for (let id in meals) {
        mealList.push({ id, ...meals[id] });
      }

      setMealList(mealList);

      let calcCalTotal = 0;
      let calcProteinTotal = 0;
      let calcCarbsTotal = 0;
      let calcFatTotal = 0;

      mealList.forEach((food) => {
        calcCalTotal = calcCalTotal + +food.cal;
        calcProteinTotal = calcProteinTotal + +food.protein;
        calcCarbsTotal = calcCarbsTotal + +food.carbs;
        calcFatTotal = calcFatTotal + +food.fat;
      });
      setTotalCal(calcCalTotal);
      setTotalProtein(calcProteinTotal);
      setTotalCarbs(calcCarbsTotal);
      setTotalFat(calcFatTotal);

      let allMacros = [
        calcCalTotal,
        calcProteinTotal,
        calcCarbsTotal,
        calcFatTotal,
      ];
      let currentMacro = allMacros[macro];
      setMacroCurrent(currentMacro);
    });
  }, [totalCal, totalProtein, totalCarbs, totalFat, macro]);

  let userGoalCal = 4000,
    userGoalProtein = 200,
    userGoalCarbs = 505,
    userGoalFat = 185;

  useEffect(() => {
    const userGoals = [
      userGoalCal,
      userGoalProtein,
      userGoalCarbs,
      userGoalFat,
    ];
    let activeMacroGoal = userGoals[macro];
    setMacroGoal(activeMacroGoal);
  }, [macro]);

  return (
    <MDBContainer className="bg-white d-flex p-0 justify-content-center align-items-center">
      <MacroMeter
        macro={macro}
        macroGoal={macroGoal}
        macroCurrent={macroCurrent}
      ></MacroMeter>

      <MDBContainer className="macro-percents m-2 text-muted">
        <div className="macro-small">
          <div className="macro-small-icon cal">
            <FontAwesomeIcon icon={faChartPie} />
          </div>
          <div className="percent-text">
            <p className="m-0">calories</p>
            <p className="fw-bold">
              {totalCal}/{userGoalCal}
            </p>
          </div>
        </div>
        <div className="macro-small">
          <div className="macro-small-icon protein">
            <FontAwesomeIcon icon={faCow} />
          </div>
          <div className="percent-text">
            <p className="m-0">protein (g)</p>
            <p className="fw-bold">
              {totalProtein}/{userGoalProtein}
            </p>
          </div>
        </div>
        <div className="macro-small">
          <div className="macro-small-icon carbs">
            <FontAwesomeIcon icon={faBreadSlice} />
          </div>
          <div className="percent-text">
            <p className="m-0">carbs (g)</p>
            <p className="fw-bold">
              {totalCarbs}/{userGoalCarbs}
            </p>
          </div>
        </div>
        <div className="macro-small">
          <div className="macro-small-icon fat">
            <FontAwesomeIcon icon={faEgg} />
          </div>
          <div className="percent-text">
            <p className="m-0">fat (g)</p>
            <p className="fw-bold">
              {totalFat}/{userGoalFat}
            </p>
          </div>
        </div>
      </MDBContainer>
    </MDBContainer>
  );
}

export default MacroOverview;
