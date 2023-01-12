import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import {
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "../../../utilities/firebase";
import styles from "./recipeList.css";
import React, { useEffect, useState } from "react";
import Recipe from "../recipe/recipe";

function RecipeList({ category }) {
  const [recipeList, setRecipeList] = useState();
  const [clickCategory, setClickCategory] = useState(false);

  // these are for weight calculations
  const [weight, setWeight] = useState(0);
  const [weightCal, setWeightCal] = useState("");

  useEffect(() => {
    const recipeRef = firebase.database().ref("recipes").child(`${category}`);
    recipeRef.on("value", (snapshot) => {
      const recipes = snapshot.val();
      const recipeList = [];
      for (let id in recipes) {
        recipeList.push({ id, ...recipes[id] });
      }

      setRecipeList(recipeList);
    });
  }, []);

  console.log(recipeList);

  return (
    <MDBContainer className="food-table mx-auto my-3">
      {clickCategory ? (
        <div
          className="d-flex justify-content-between align-items-center select"
          onClick={() => setClickCategory(false)}
        >
          <FontAwesomeIcon icon={faSquareCaretUp} className="food-caret" />
          <h3 className="p-2">{category}</h3>
          <FontAwesomeIcon icon={faSquareCaretUp} className="food-caret" />
        </div>
      ) : (
        <div
          className="d-flex justify-content-between align-items-center unselect"
          onClick={() => setClickCategory(true)}
        >
          <FontAwesomeIcon icon={faSquareCaretDown} className="food-caret" />
          <h3 className="p-2">{category}</h3>
          <FontAwesomeIcon icon={faSquareCaretDown} className="food-caret" />
        </div>
      )}

      {/* this is where recipes will be looped through */}
      {clickCategory ? (
        <MDBContainer className="p-md-4">
          {recipeList
            ? recipeList.map((recipe, index) => (
                <Recipe recipe={recipe} key={index} />
              ))
            : null}
        </MDBContainer>
      ) : null}
    </MDBContainer>
  );
}

export default RecipeList;
