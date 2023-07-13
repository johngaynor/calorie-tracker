import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
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

import firebase from "../../utilities/firebase";

const Signup = ({ history }) => {
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log("email: " + email.value);
      console.log("password: " + password.value);
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        const user = firebase.auth().currentUser;
        await firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            user: user.email,
          });
        await firebase
          .database()
          .ref(`users/${user.uid}/macro-goals`)
          .set({ cal: 3500, protein: 180, carbs: 400, fat: 140 });
        navigate("/");
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <>
      <MDBBtn onClick={() => setBasicModal(!basicModal)}>Signup</MDBBtn>
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
                        <h2 className="fw-bold mb-4 text-center">Sign up</h2>
                        <form onSubmit={handleSignUp}>
                          <MDBInput
                            wrapperClass="mb-4 w-100"
                            label="Email address"
                            type="email"
                            size="lg"
                            name="email"
                          />
                          <MDBInput
                            wrapperClass="mb-4 w-100"
                            label="Password"
                            type="password"
                            size="lg"
                            name="password"
                          />
                          <MDBBtn size="lg" type="submit">
                            Sign Up
                          </MDBBtn>
                        </form>
                        <hr className="my-4" />
                        <MDBBtn
                          className="mb-2 w-100"
                          size="lg"
                          style={{ backgroundColor: "#dd4b39" }}
                          onClick={() =>
                            alert(
                              "Sorry, this functionality is not available yet. Please try again at a later date. "
                            )
                          }
                        >
                          <MDBIcon fab icon="google" className="mx-1" />
                          Sign in with google
                        </MDBBtn>
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

export default Signup;
