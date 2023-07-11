import { useState, useEffect } from "react";
import { MDBCol, MDBRow, MDBContainer } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faChartPie,
  faCow,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";

import Meter from "./components/meter";
import styles from "./styles/dashboard.css";

function MacroCalcDash({ userMacros, userGoals }) {
  const [activeMacro, setActiveMacro] = useState(0);

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
        <MDBContainer className="dashboard-macro-display px-0">
          {/* big display for cal */}
          <MDBCol className="dashboard-big-display cal col-4 my-auto mx-auto">
            <div className="ring-one ring-cal"></div>
            <div className="ring-two ring-cal"></div>

            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon cal-dark mt-4">
                <FontAwesomeIcon icon={faChartPie} />
              </div>
              <p className="d-flex mt-4 mb-2">Calories</p>
              <h3 className="d-flex w-50">
                {userMacros.cal} <span>Kcl</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          {/* big display for protein */}
          <MDBCol className="dashboard-big-display protein col-4 my-auto mx-auto">
            <div className="ring-one ring-protein"></div>
            <div className="ring-two ring-protein"></div>
            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon p mt-4">
                <FontAwesomeIcon icon={faCow} />
              </div>
              <p className="d-flex mt-4 mb-2">Protein</p>
              <h3 className="d-flex w-50">
                {userMacros.protein} <span>g</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          {/* big display for carbs */}
          <MDBCol className="dashboard-big-display carbs col-4 my-auto mx-auto">
            <div className="ring-one ring-carbs"></div>
            <div className="ring-two ring-carbs"></div>
            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon c mt-4">
                <FontAwesomeIcon icon={faBreadSlice} />
              </div>
              <p className="d-flex mt-4 mb-2">Carbs</p>
              <h3 className="d-flex w-50">
                {userMacros.carbs} <span>g</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          {/* big display for fat */}
          <MDBCol className="dashboard-big-display fat col-4 my-auto mx-auto">
            <div className="ring-one ring-fat"></div>
            <div className="ring-two ring-fat"></div>
            <MDBContainer className="px-5 pt-5 h-100 d-flex flex-column">
              <div className="big-display-icon f mt-4">
                <FontAwesomeIcon icon={faEgg} />
              </div>
              <p className="d-flex mt-4 mb-2">Fat</p>
              <h3 className="d-flex w-50">
                {userMacros.fat} <span>g</span>
              </h3>
            </MDBContainer>
          </MDBCol>
          <MDBCol className="dashboard-macros my-auto w-100 mx-auto">
            <MDBContainer className="d-flex flex-wrap mx-md-4">
              <div
                className="macro-small mx-auto"
                onClick={() => setActiveMacro(0)}
              >
                <div className="macro-small-icon cal-dark">
                  <FontAwesomeIcon icon={faChartPie} />
                </div>
                <div className="macro-small-text">
                  <p>calories</p>
                  <p>{userMacros.cal}kcal</p>
                </div>
              </div>
              <div
                className="macro-small mx-auto"
                onClick={() => setActiveMacro(1)}
              >
                <div className="macro-small-icon protein">
                  <FontAwesomeIcon icon={faCow} />
                </div>
                <div className="macro-small-text">
                  <p>protein</p>
                  <p>{userMacros.protein}g</p>
                </div>
              </div>
              <div
                className="macro-small mx-auto"
                onClick={() => setActiveMacro(2)}
              >
                <div className="macro-small-icon carbs">
                  <FontAwesomeIcon icon={faBreadSlice} />
                </div>
                <div className="macro-small-text">
                  <p>carbs</p>
                  <p>{userMacros.carbs}g</p>
                </div>
              </div>
              <div
                className="macro-small mx-auto"
                onClick={() => setActiveMacro(3)}
              >
                <div className="macro-small-icon fat">
                  <FontAwesomeIcon icon={faEgg} />
                </div>
                <div className="macro-small-text">
                  <p>fat</p>
                  <p>{userMacros.fat}g</p>
                </div>
              </div>
            </MDBContainer>
          </MDBCol>
        </MDBContainer>
      </MDBCol>
      <MDBCol className="m-sm-2 m-3 p-2">
        <div className="d-flex justify-content-between pb-4">
          <h4>Overview</h4>
          {/* <p>{today} |</p> */}
          <p>12/12/2023 |</p>
        </div>
        <MDBContainer className="bg-white p-0 overview-container">
          <Meter
            activeMacro={activeMacro}
            userMacros={userMacros}
            userGoals={userGoals}
          ></Meter>
          <MDBContainer className="macro-percents m-2 text-muted d-lg-flex d-sm-block d-flex">
            <div className="macro-small" onClick={() => setActiveMacro(0)}>
              <div className="macro-small-icon cal">
                <FontAwesomeIcon icon={faChartPie} />
              </div>
              <div className="percent-text">
                <p className="m-0">calories</p>
                <p className="fw-bold">
                  {userMacros.cal}/{userGoals.cal}
                </p>
              </div>
            </div>
            <div className="macro-small" onClick={() => setActiveMacro(1)}>
              <div className="macro-small-icon protein">
                <FontAwesomeIcon icon={faCow} />
              </div>
              <div className="percent-text">
                <p className="m-0">protein (g)</p>
                <p className="fw-bold">
                  {userMacros.protein}/{userGoals.protein}
                </p>
              </div>
            </div>
            <div className="macro-small" onClick={() => setActiveMacro(2)}>
              <div className="macro-small-icon carbs">
                <FontAwesomeIcon icon={faBreadSlice} />
              </div>
              <div className="percent-text">
                <p className="m-0">carbs (g)</p>
                <p className="fw-bold">
                  {userMacros.carbs}/{userGoals.carbs}
                </p>
              </div>
            </div>
            <div className="macro-small" onClick={() => setActiveMacro(3)}>
              <div className="macro-small-icon fat">
                <FontAwesomeIcon icon={faEgg} />
              </div>
              <div className="percent-text">
                <p className="m-0">fat (g)</p>
                <p className="fw-bold">
                  {userMacros.fat}/{userGoals.fat}
                </p>
              </div>
            </div>
          </MDBContainer>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
  );
}

export default MacroCalcDash;
