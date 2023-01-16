import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./macroMeter.css";

function MacroMeter() {
  let circleProgress = document.querySelector(".progress-inner");

  return (
    <MDBContainer className="progress">
      <div className="progress-inner circle"></div>
      <div className="progress-center circle"></div>
      <div className="progress-outer circle"></div>
      <span className="progress-value">50</span>
    </MDBContainer>
  );
}

export default MacroMeter;
