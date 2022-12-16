import { useState, useEffect } from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import firebase from "../../utilities/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faChartPie,
  faCow,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./macroCalcDash.css";

function MacroCalcDash() {
  const [foodList, setFoodList] = useState();
  let [totalCal, setTotalCal] = useState(0);
  let [totalProtein, setTotalProtein] = useState(0);
  let [totalCarbs, setTotalCarbs] = useState(0);
  let [totalFat, setTotalFat] = useState(0);

  useEffect(() => {
    const foodRef = firebase.database().ref("crud-final");
    foodRef.on("value", (snapshot) => {
      const foods = snapshot.val();
      const foodList = [];
      for (let id in foods) {
        foodList.push({ id, ...foods[id] });
      }

      setFoodList(foodList);

      let calcCalTotal = 0;
      let calcProteinTotal = 0;
      let calcCarbsTotal = 0;
      let calcFatTotal = 0;

      foodList.forEach((food) => {
        calcCalTotal = calcCalTotal + +food.cal;
        calcProteinTotal = calcProteinTotal + +food.protein;
        calcCarbsTotal = calcCarbsTotal + +food.carbs;
        calcFatTotal = calcFatTotal + +food.fat;
      });
      setTotalCal(calcCalTotal);
      setTotalProtein(calcProteinTotal);
      setTotalCarbs(calcCarbsTotal);
      setTotalFat(calcFatTotal);
    });
  }, [totalCal, totalProtein, totalCarbs, totalFat]);

  return (
    <MDBContainer className="dashboard-macro-display d-flex px-0">
      <MDBCol className="dashboard-big-display col-4">
        <div className="ring-one"></div>
        <div className="ring-two"></div>
        <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
          <div className="big-display-icon mt-4">
            <FontAwesomeIcon icon={faChartPie} />
          </div>
          <p className="d-flex mt-4 mb-2">Avg Calories</p>
          <h3 className="d-flex w-50">
            {totalCal} <span>Kcl</span>
          </h3>
        </MDBContainer>
      </MDBCol>
      <MDBCol className="dashboard-macros d-flex my-auto">
        <MDBContainer className="dashboard-macros-content">
          <div className="macro-small">
            <div className="macro-small-icon" id="macro-small-cal">
              <FontAwesomeIcon icon={faChartPie} />
            </div>
            <div className="macro-small-text">
              <p>Avg calories</p>
              <p>{totalCal}kcal</p>
            </div>
          </div>
          <div className="macro-small">
            <div className="macro-small-icon" id="macro-small-protein">
              <FontAwesomeIcon icon={faCow} />
            </div>
            <div className="macro-small-text">
              <p>Avg protein</p>
              <p>{totalProtein}g</p>
            </div>
          </div>
          <div className="macro-small">
            <div className="macro-small-icon" id="macro-small-carbs">
              <FontAwesomeIcon icon={faBreadSlice} />
            </div>
            <div className="macro-small-text">
              <p>Avg carbs</p>
              <p>{totalCarbs}g</p>
            </div>
          </div>
          <div className="macro-small">
            <div className="macro-small-icon" id="macro-small-fat">
              <FontAwesomeIcon icon={faEgg} />
            </div>
            <div className="macro-small-text">
              <p>Avg fat</p>
              <p>{totalFat}g</p>
            </div>
          </div>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
}

export default MacroCalcDash;
