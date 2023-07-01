import React, { useCallback, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router";

import firebase from "../../utilities/firebase";

const Login = ({ history }) => {
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        navigate("/");

        setBasicModal(false);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <>
      <MDBBtn onClick={() => setBasicModal(!basicModal)}>Login</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="warning"
                onClick={() => setBasicModal(!basicModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <h1>Log in</h1>
                <form onSubmit={handleLogin}>
                  <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                  </label>
                  <label>
                    Password
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </label>
                  <button type="submit">Log in</button>
                </form>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setBasicModal(!basicModal)}
              >
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Login;
