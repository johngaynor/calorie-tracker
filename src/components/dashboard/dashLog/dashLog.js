import { useState, useEffect } from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTable,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import firebase from "../../../utilities/firebase";
import DashLogItem from "../dashLogItem/dashLogItem";
import styles from "./dashLog.css";

function DashLog() {
  const [itemList, setItemList] = useState("");
  const [selectMacro, setSelectMacro] = useState(0);
  const [activeName, setActiveName] = useState("");

  useEffect(() => {
    const macroNames = ["cal", "protein", "carbs", "fat"];
    setActiveName(macroNames[selectMacro]);
  }, [selectMacro]);

  const logRef = firebase.database().ref("user-log");

  useEffect(() => {
    logRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const itemList = [];
      for (let id in items) {
        itemList.push({ id, ...items[id] });
      }

      setItemList(itemList);
    });
  }, []);

  return (
    <MDBContainer fluid className="px-4 bg-white dash-log-container text-muted">
      <MDBRow>
        <MDBCol className="m-2 p-2">
          <div className="d-flex justify-content-between mb-3">
            <h4>Today's Log</h4>

            <Form.Select
              aria-label="Default select"
              size="md"
              onChange={(e) => {
                setSelectMacro(e.target.value);
              }}
            >
              <option value="0">Calories</option>
              <option value="1">Protein</option>
              <option value="2">Carbs</option>
              <option value="3">Fat</option>
            </Form.Select>
          </div>
          <MDBContainer className="dash-log-items w-100 p-0">
            <MDBTable align="middle">
              <MDBTableBody>
                <DashLogItem activeName={activeName} thingy={itemList} />
              </MDBTableBody>
            </MDBTable>
          </MDBContainer>
        </MDBCol>
        <MDBCol className="m-2 p-2 bg-success">2 of 2</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default DashLog;
