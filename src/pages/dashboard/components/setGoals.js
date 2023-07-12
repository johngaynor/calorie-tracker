import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

import firebase from "../../../utilities/firebase";

const SetGoalsModal = ({ userGoals }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [cal, setCal] = useState(userGoals.cal);
  const [protein, setProtein] = useState(userGoals.protein);
  const [carbs, setCarbs] = useState(userGoals.carbs);
  const [fat, setFat] = useState(userGoals.fat);

  const handleGoalSubmit = () => {
    console.log("attempted to submit goals");
  };

  return (
    <>
      <MDBBtn onClick={() => setBasicModal(!basicModal)}>
        Set Macro Goals
      </MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="danger"
                onClick={() => setBasicModal(!basicModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer fluid>
                <MDBRow className="d-flex justify-content-center align-items-center h-100">
                  <MDBCol col="12">
                    <MDBCard
                      className="bg-white my-5 mx-auto"
                      style={{ borderRadius: "1rem", maxWidth: "500px" }}
                    >
                      <MDBCardBody className="p-5 w-100 d-flex flex-column">
                        <h2 className="fw-bold mb-4 text-center">
                          Set Macro Goals
                        </h2>
                        <form onSubmit={handleGoalSubmit}>
                          <MDBInput
                            wrapperClass="mb-4 w-100"
                            label="Calories"
                            type=""
                            size="lg"
                            name="calories"
                            defaultValue={userGoals.cal}
                            onChange={(e) => setCal(e.target.value)}
                          />
                          <MDBInput
                            wrapperClass="mb-4 w-100"
                            label="Protein"
                            type=""
                            size="lg"
                            name="protein"
                            defaultValue={userGoals.protein}
                            onChange={(e) => setProtein(e.target.value)}
                          />
                          <MDBInput
                            wrapperClass="mb-4 w-100"
                            label="Carbs"
                            type=""
                            size="lg"
                            name="carbs"
                            defaultValue={userGoals.carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                          />
                          <MDBInput
                            wrapperClass="mb-4 w-100"
                            label="Fat"
                            type=""
                            size="lg"
                            name="fat"
                            defaultValue={userGoals.fat}
                            onChange={(e) => setFat(e.target.value)}
                          />
                          <MDBBtn size="lg" type="submit">
                            Submit
                          </MDBBtn>
                        </form>
                        <hr className="my-4" />
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default SetGoalsModal;
