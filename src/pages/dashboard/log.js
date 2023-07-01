import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBTable,
  MDBTableBody,
} from "mdb-react-ui-kit";

import firebase from "../../utilities/firebase";
import LogItem from "./components/logItem";
import styles from "./styles/log.css";

function Log() {
  const [logItems, setLogItems] = useState("");
  const [selectMacro, setSelectMacro] = useState(0);

  useEffect(() => {
    const logRef = firebase.database().ref("user-log");
    logRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const itemList = [];
      for (let id in items) {
        itemList.push({ id, ...items[id] });
      }

      setLogItems(itemList);
    });
  }, []);

  return (
    <MDBContainer fluid className="px-4 bg-white dash-log-container text-muted">
      <MDBRow className="d-md-flex d-block">
        <MDBCol className="m-md-2 p-md-2">
          <div className="d-flex justify-content-between mb-3 pt-3 pt-md-0">
            <h4 className="mt-1 mt-md-0">Today's Log</h4>

            <Form.Select
              aria-label="Default select"
              size="md"
              onChange={(e) => {
                setSelectMacro(e.target.value);
              }}
              id="dash-macro-selector"
            >
              <option value="0">Calories</option>
              <option value="1">Protein</option>
              <option value="2">Carbs</option>
              <option value="3">Fat</option>
            </Form.Select>
          </div>
          <MDBContainer className="dash-log-items w-100 p-0 mb-4 mb-md-0">
            <MDBTable align="middle">
              <MDBTableBody>
                {logItems
                  ? logItems.map((item, index) => (
                      <LogItem
                        item={item}
                        key={index}
                        activeMacro={selectMacro}
                      />
                    ))
                  : null}
              </MDBTableBody>
            </MDBTable>
          </MDBContainer>
        </MDBCol>
        <MDBCol className="m-md-2 p-md-2 w-100 mx-auto">
          <iframe
            className="tutorial-video"
            src="https://www.youtube.com/embed/HDsxu-zDY3Q"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Log;
