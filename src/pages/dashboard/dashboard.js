import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import MacroCalcDash from "../../components/macroCalcDash/macroCalcDash";
import styles from "./dashboard.css";

function Dashboard() {
  return (
    <MDBContainer fluid className="dashboard-container pb-3 px-4">
      <MDBRow>
        <h3 className="p-3 d-flex basic-header">Dashboard</h3>
      </MDBRow>
      <MacroCalcDash></MacroCalcDash>
    </MDBContainer>
  );
}

export default Dashboard;
