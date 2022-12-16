import { faApple, faPinterestSquare } from "@fortawesome/free-brands-svg-icons";
import {
  faBowlFood,
  faChartArea,
  faChartPie,
  faPieChart,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import styles from "./dashboard.css";

function Dashboard() {
  return (
    <MDBContainer fluid className="dashboard-container">
      <MDBRow>
        <h3 className="p-3 d-flex dashboard-header">Dashboard</h3>
      </MDBRow>
      <MDBRow>
        <MDBCol className="m-2 p-2">
          <div className="random d-flex justify-content-between pb-4">
            <h4>Progress Tracker</h4>
            <p>Monthly |</p>
          </div>
          <MDBContainer className="dashboard-macro-display d-flex px-0">
            <MDBCol className="dashboard-big-display col-4">
              <div className="ring-one"></div>
              <div className="ring-two"></div>
              <MDBContainer className="test px-5 pt-5 h-100 d-flex flex-column">
                <div className="big-display-icon mt-4">
                  <FontAwesomeIcon icon={faChartPie} />
                </div>
                <p className="d-flex mt-4 mb-2">Avg Calories</p>
                <h3 className="d-flex w-50">
                  6.778 <span>Kcl</span>
                </h3>
              </MDBContainer>
            </MDBCol>
            <MDBCol className="dashboard-macros h-75 d-flex my-auto">
              <div className="macro-small">hello</div>
              <div className="macro-small">hello</div>
              <div className="macro-small">hello</div>
              <div className="macro-small">hello</div>
            </MDBCol>
          </MDBContainer>
        </MDBCol>
        <MDBCol className="m-2">
          2 of 2 <FontAwesomeIcon icon={faApple} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Dashboard;
