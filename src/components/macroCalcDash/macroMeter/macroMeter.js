import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./macroMeter.css";

function MacroMeter() {
  //   let circleProgress = document.querySelector(".progress-inner");

  return (
    <MDBContainer>
      <div className="progress">
        {/* // <div className="progress-inner circle"></div>
        // <div className="progress-center circle"></div>
        // <div className="progress-outer circle"></div>
        // <span className="progress-value"></span> */}
        <div className="pie text-black animate">60%</div>
        <div className="progress-center"></div>
      </div>
    </MDBContainer>
  );
}

export default MacroMeter;
