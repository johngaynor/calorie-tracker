import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBreadSlice,
  faChartPie,
  faCow,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./macroMeter.css";

function MacroMeter() {
  //   let circleProgress = document.querySelector(".progress-inner");

  return (
    <MDBContainer className="bg-white d-flex p-0 justify-content-center align-items-center">
      <MDBContainer className="progress-container w-50">
        <div className="progress-circle">
          <div className="pie"></div>
          <div className="pie-center"></div>
        </div>
      </MDBContainer>
      <MDBContainer className="macro-percents my-2 text-muted">
        <div className="macro-small">
          <div className="macro-small-icon cal">
            <FontAwesomeIcon icon={faChartPie} />
          </div>
          <div className="percent-text">
            <p className="m-0">calories</p>
            <p className="fw-bold">100/200</p>
          </div>
        </div>
        <div className="macro-small">
          <div className="macro-small-icon protein">
            <FontAwesomeIcon icon={faCow} />
          </div>
          <div className="percent-text">
            <p className="m-0">protein (g)</p>
            <p className="fw-bold">100/200</p>
          </div>
        </div>
        <div className="macro-small">
          <div className="macro-small-icon carbs">
            <FontAwesomeIcon icon={faBreadSlice} />
          </div>
          <div className="percent-text">
            <p className="m-0">carbs (g)</p>
            <p className="fw-bold">100/200</p>
          </div>
        </div>
        <div className="macro-small">
          <div className="macro-small-icon fat">
            <FontAwesomeIcon icon={faEgg} />
          </div>
          <div className="percent-text">
            <p className="m-0">fat (g)</p>
            <p className="fw-bold">100/200</p>
          </div>
        </div>
      </MDBContainer>
    </MDBContainer>
  );
}

export default MacroMeter;
