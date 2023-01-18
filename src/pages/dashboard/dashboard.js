import { faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import MacroDash from "../../components/dashboard/macroCalcDash/macroCalcDash";
import DashLog from "../../components/dashboard/dashLog/dashLog";
import styles from "./dashboard.css";

function Dashboard() {
  return (
    <>
      <MDBContainer fluid className="dashboard-container pb-3 px-4">
        <MDBRow>
          {/* <h3 className="p-3 basic-header">Dashboard</h3> */}
          <h3 style={{ color: "#0000" }}>hello</h3>
        </MDBRow>
        <MacroDash></MacroDash>
      </MDBContainer>
      <DashLog></DashLog>
    </>
  );
}

export default Dashboard;
