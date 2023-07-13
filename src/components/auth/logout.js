import React, { useCallback, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router";

import firebase from "../../utilities/firebase";

const Logout = ({ history }) => {
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);

  const handleLogout = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await firebase.auth().signOut();
        setBasicModal(false);
        navigate("/");
        alert("Thank you for visiting our site, come again soon!");
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <>
      <MDBBtn onClick={() => setBasicModal(!basicModal)}>Logout</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setBasicModal(!basicModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-dark">
              Are you sure you want to log out?
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setBasicModal(!basicModal)}
              >
                No
              </MDBBtn>
              <MDBBtn onClick={handleLogout}>Yes, log me out!</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Logout;
