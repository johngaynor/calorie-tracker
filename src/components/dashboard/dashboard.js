import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import styles from "./dashboard.css";

function Dashboard() {
  return (
    <MDBContainer fluid className="dashboard-container">
    <MDBRow>
        <h1 className="p-3 d-flex">Dashboard</h1>
    </MDBRow>
    <MDBRow>
        <MDBCol className="m-2">
            <MDBRow><h2>Progress tracker</h2></MDBRow>
        </MDBCol>
        <MDBCol className="m-2">2 of 2</MDBCol>
    </MDBRow>
</MDBContainer>
  );

}

export default Dashboard;
