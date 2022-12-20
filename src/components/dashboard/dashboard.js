import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import MacroCalcDash from "../macroCalcDash/macroCalcDash";
import styles from "./dashboard.css";

function Dashboard() {
  return (
    <MDBContainer fluid className="dashboard-container px-4">
      <MDBRow>
        <h3 className="p-3 d-flex basic-header">Dashboard</h3>
      </MDBRow>
      <MDBRow>
        <MDBCol className="m-2 p-2">
          <div className="random d-flex justify-content-between pb-4">
            <h4>Progress Tracker</h4>
            <p>Monthly |</p>
          </div>
          <MacroCalcDash></MacroCalcDash>
        </MDBCol>
        {/* <MDBCol className="m-2">
          2 of 2 <FontAwesomeIcon icon={faApple} />
        </MDBCol> */}
      </MDBRow>
    </MDBContainer>
  );
}

export default Dashboard;
