import React, { useState, useEffect, useContext } from "react";
import { MDBContainer } from "mdb-react-ui-kit";

import firebase from "../../utilities/firebase";
import { AuthContext } from "../../utilities/auth/authContext";
import FoodList from "./foodList";

function Foods() {
  const [userFoods, setUserFoods] = useState({});
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    console.log("there is a user: " + currentUser.uid);
    console.log(userFoods);
  }

  useEffect(() => {
    let userFoodRef = firebase.database().ref("foods");

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userFoodRef = firebase.database().ref(`users/${user.uid}/foods`);
      }

      userFoodRef.on("value", (snapshot) => {
        const categories = snapshot.val();
        setUserFoods(categories);
      });
    });

    return () => {
      // unmounting listener
      unsubscribe();
    };
  }, []);

  console.log(userFoods);

  return (
    <MDBContainer fluid className="px-md-5">
      <h3 className="p-3 text-start">Your Foods</h3>
      {userFoods
        ? Object.keys(userFoods).map((category, index) => (
            <FoodList userFoods={userFoods} category={category} key={index} />
          ))
        : null}
      {userFoods == null ? (
        <p className="mb-5">You do not have any foods entered!</p>
      ) : (
        ""
      )}
    </MDBContainer>
  );
}

export default Foods;
