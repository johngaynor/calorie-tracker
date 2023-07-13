import React, { useState, useContext, useEffect } from "react";
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
} from "mdb-react-ui-kit";

import firebase from "../../../utilities/firebase";
import { AuthContext } from "../../../utilities/auth/authContext";

const SetGoalsModal = ({ userGoals }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [cal, setCal] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (
      userGoals.cal &&
      userGoals.protein &&
      userGoals.carbs &&
      userGoals.fat
    ) {
      setCal(userGoals.cal);
      setProtein(userGoals.protein);
      setCarbs(userGoals.carbs);
      setFat(userGoals.fat);
    }
  }, [userGoals]);

  const handleGoalSubmit = () => {
    if (currentUser) {
      if (cal > 0 && protein > 0 && carbs > 0 && fat > 0) {
        const goalRef = firebase
          .database()
          .ref(`users/${currentUser.uid}/macro-goals`);
        goalRef.set({
          cal: parseFloat(cal),
          protein: parseFloat(protein),
          carbs: parseFloat(carbs),
          fat: parseFloat(fat),
        });
        alert("Thank you, your goals have been recorded.");
        window.location.reload();
      } else {
        alert(
          "Please make sure all macros are positive numbers before submitting."
        );
      }
    } else {
      alert(
        "This is a demo version of Calorie Tracker. Please login or create an account to edit user goals."
      );
    }
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
                        <MDBInput
                          wrapperClass="mb-4 w-100"
                          label="Calories"
                          type="number"
                          size="lg"
                          name="cal"
                          value={cal}
                          onChange={(e) => setCal(e.target.value)}
                        />
                        <MDBInput
                          wrapperClass="mb-4 w-100"
                          label="Protein"
                          type="number"
                          size="lg"
                          name="protein"
                          value={protein}
                          onChange={(e) => setProtein(e.target.value)}
                        />
                        <MDBInput
                          wrapperClass="mb-4 w-100"
                          label="Carbs"
                          type="number"
                          size="lg"
                          name="carbs"
                          value={carbs}
                          onChange={(e) => setCarbs(e.target.value)}
                        />
                        <MDBInput
                          wrapperClass="mb-4 w-100"
                          label="Fat"
                          type="number"
                          size="lg"
                          name="fat"
                          value={fat}
                          onChange={(e) => setFat(e.target.value)}
                        />
                        <MDBBtn size="lg" onClick={handleGoalSubmit}>
                          Submit
                        </MDBBtn>
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
