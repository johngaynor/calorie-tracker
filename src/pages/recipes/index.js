import React, { useState, useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";

import firebase from "../../utilities/firebase";
import List from "./categories";

function Recipes() {
  const [userRecipes, setUserRecipes] = useState({});

  useEffect(() => {
    let userRecipeRef = firebase.database().ref("recipes");

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userRecipeRef = firebase.database().ref(`users/${user.uid}/recipes`);
        console.log("there is a user, routing ref to user's recipes");
      }

      userRecipeRef.on("value", (snapshot) => {
        const categories = snapshot.val();
        setUserRecipes(categories);
      });
    });

    return () => {
      // unmounting listener
      unsubscribe();
    };
  }, []);

  return (
    <MDBContainer fluid className="px-md-5">
      <h3 className="p-3 text-start">Your Recipes</h3>

      {userRecipes
        ? Object.keys(userRecipes).map((category, index) => (
            <List userRecipes={userRecipes} category={category} key={index} />
          ))
        : null}
      {userRecipes == null ? (
        <p className="mb-5">You do not have any recipes entered!</p>
      ) : (
        ""
      )}
    </MDBContainer>
  );
}

export default Recipes;
