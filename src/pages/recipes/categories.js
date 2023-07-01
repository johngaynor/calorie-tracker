import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";

import firebase from "../../utilities/firebase";
import Recipe from "./recipe";
import styles from "./styles/categories.css";

function List({ category }) {
  const [recipeList, setRecipeList] = useState();
  const [clickCategory, setClickCategory] = useState(false);

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

  return (
    <MDBContainer fluid className="recipe-list mx-auto my-3">
      {clickCategory ? (
        <div
          className="d-flex justify-content-between align-items-center select mb-2 mb-md-0"
          onClick={() => setClickCategory(false)}
        >
          <FontAwesomeIcon icon={faSquareCaretUp} className="food-caret" />
          <h2 className="p-2">{category}</h2>
          <FontAwesomeIcon icon={faSquareCaretUp} className="food-caret" />
        </div>
      ) : (
        <div
          className="d-flex justify-content-between align-items-center unselect"
          onClick={() => setClickCategory(true)}
        >
          <FontAwesomeIcon icon={faSquareCaretDown} className="food-caret" />
          <h2 className="p-2">{category}</h2>
          <FontAwesomeIcon icon={faSquareCaretDown} className="food-caret" />
        </div>
      )}

      {/* this is where recipes will be looped through */}
      {clickCategory ? (
        <MDBContainer className="p-md-4">
          {recipeList
            ? recipeList.map((recipe, index) => (
                <Recipe
                  recipe={recipe}
                  key={index}
                  category={category}
                  recipeID={recipe.id}
                />
              ))
            : null}
        </MDBContainer>
      ) : null}
    </MDBContainer>
  );
}

export default List;
