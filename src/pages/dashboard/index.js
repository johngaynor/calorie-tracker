import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import MacroDashboard from "./dashboard";
import Log from "./log";
import styles from "./styles/index.css";

function Dashboard() {
  return (
    <>
      <MDBContainer fluid className="dashboard-container pb-3 px-4">
        <MDBRow>
          <h3 className="p-3 text-start">Dashboard</h3>
        </MDBRow>
        <MacroDashboard></MacroDashboard>
      </MDBContainer>
      <Log></Log>
    </>
  );
}

export default Dashboard;
