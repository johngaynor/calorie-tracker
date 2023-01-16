import { useState, useEffect } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
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
  const [mealList, setMealList] = useState();
  let [totalCal, setTotalCal] = useState(0);
  let [totalProtein, setTotalProtein] = useState(0);
  let [totalCarbs, setTotalCarbs] = useState(0);
  let [totalFat, setTotalFat] = useState(0);

  const [activeMacro, setActiveMacro] = useState(0);

  useEffect(() => {
    const mealRef = firebase.database().ref("user-log");
    mealRef.on("value", (snapshot) => {
      const meals = snapshot.val();
      const mealList = [];
      for (let id in meals) {
        mealList.push({ id, ...meals[id] });
      }

      setMealList(mealList);
      // console.log(mealList);

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
    });
  }, [totalCal, totalProtein, totalCarbs, totalFat]);

  useEffect(() => {
    const macroDisplays = Array.from(
      document.querySelectorAll(".dashboard-big-display")
    );
    macroDisplays.forEach((macro, index) => {
      macro.classList.toggle("active-macro", index === activeMacro);
    });
  }, [activeMacro]);

  return (
    <MDBRow>
      <MDBCol className="m-2 p-2">
        <div className="d-flex justify-content-between pb-4">
          <h4>Progress Tracker</h4>
          <p>Daily |</p>
        </div>
        <MDBContainer className="dashboard-macro-display d-flex px-0">
          {/* big display for cal */}
          <MDBCol className="dashboard-big-display cal col-4 my-auto">
            <div className="ring-one ring-cal"></div>
            <div className="ring-two ring-cal"></div>

            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon cal-dark mt-4">
                <FontAwesomeIcon icon={faChartPie} />
              </div>
              <p className="d-flex mt-4 mb-2">Calories</p>
              <h3 className="d-flex w-50">
                {totalCal} <span>Kcl</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          {/* big display for protein */}
          <MDBCol className="dashboard-big-display protein col-4 my-auto">
            <div className="ring-one ring-protein"></div>
            <div className="ring-two ring-protein"></div>
            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon p mt-4">
                <FontAwesomeIcon icon={faCow} />
              </div>
              <p className="d-flex mt-4 mb-2">Protein</p>
              <h3 className="d-flex w-50">
                {totalProtein} <span>g</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          {/* big display for carbs */}
          <MDBCol className="dashboard-big-display carbs col-4 my-auto">
            <div className="ring-one ring-carbs"></div>
            <div className="ring-two ring-carbs"></div>
            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon c mt-4">
                <FontAwesomeIcon icon={faBreadSlice} />
              </div>
              <p className="d-flex mt-4 mb-2">Carbs</p>
              <h3 className="d-flex w-50">
                {totalCarbs} <span>g</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          {/* big display for fat */}
          <MDBCol className="dashboard-big-display fat col-4 my-auto">
            <div className="ring-one ring-fat"></div>
            <div className="ring-two ring-fat"></div>
            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon f mt-4">
                <FontAwesomeIcon icon={faEgg} />
              </div>
              <p className="d-flex mt-4 mb-2">Fat</p>
              <h3 className="d-flex w-50">
                {totalFat} <span>g</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          <MDBCol className="dashboard-macros my-auto">
            <MDBContainer className="d-flex flex-wrap">
              <div className="macro-small" onClick={() => setActiveMacro(0)}>
                <div className="macro-small-icon cal-dark">
                  <FontAwesomeIcon icon={faChartPie} />
                </div>
                <div className="macro-small-text">
                  <p>calories</p>
                  <p>{totalCal}kcal</p>
                </div>
              </div>
              <div className="macro-small" onClick={() => setActiveMacro(1)}>
                <div className="macro-small-icon protein">
                  <FontAwesomeIcon icon={faCow} />
                </div>
                <div className="macro-small-text">
                  <p>protein</p>
                  <p>{totalProtein}g</p>
                </div>
              </div>
              <div className="macro-small" onClick={() => setActiveMacro(2)}>
                <div className="macro-small-icon carbs">
                  <FontAwesomeIcon icon={faBreadSlice} />
                </div>
                <div className="macro-small-text">
                  <p>carbs</p>
                  <p>{totalCarbs}g</p>
                </div>
              </div>
              <div className="macro-small" onClick={() => setActiveMacro(3)}>
                <div className="macro-small-icon fat">
                  <FontAwesomeIcon icon={faEgg} />
                </div>
                <div className="macro-small-text">
                  <p>fat</p>
                  <p>{totalFat}g</p>
                </div>
              </div>
            </MDBContainer>
          </MDBCol>
        </MDBContainer>
      </MDBCol>
      <MDBCol className="m-2 p-2">
        <div className="d-flex justify-content-between pb-4">
          <h4>Progress Tracker</h4>
          <p>Daily |</p>
        </div>
        <MDBContainer>
          <div className="dashboard-macro-progress">
            <MDBProgress>
              <MDBProgressBar width={50} valuemin={0} valuemax={100} />
            </MDBProgress>
          </div>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
  );
}

export default MacroCalcDash;
