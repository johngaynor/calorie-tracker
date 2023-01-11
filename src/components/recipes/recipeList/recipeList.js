import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
} from "mdb-react-ui-kit";
import firebase from "../../../utilities/firebase";
import styles from "./recipeList.css";
import React, { useEffect, useState } from "react";
import Recipe from "../recipe/recipe";

function RecipeList() {
  const [recipeList, setRecipeList] = useState();
  const [weight, setWeight] = useState(0);
  const [weightCal, setWeightCal] = useState("");

  // this ref is to access "recipes" on firebase
  // const recipeRef = firebase.database().ref("recipes");

  useEffect(() => {
    const recipeRef = firebase.database().ref("recipes");
    recipeRef.on("value", (snapshot) => {
      const recipes = snapshot.val();
      const recipeList = [];
      for (let id in recipes) {
        recipeList.push({ id, ...recipes[id] });
      }

      setRecipeList(recipeList);
    });
  }, []);

  return (
    <MDBContainer fluid>
      <h3 className="p-3 basic-header">Your Recipes</h3>
      <MDBContainer fluid className="p-3 my-auto w-75">
        {recipeList
          ? recipeList.map((recipe, index) => (
              <Recipe recipe={recipe} key={index} />
            ))
          : ""}
      </MDBContainer>
    </MDBContainer>
  );
}

export default RecipeList;
