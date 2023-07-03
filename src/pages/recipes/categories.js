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

function List({ category, userRecipes }) {
  const [clickCategory, setClickCategory] = useState(false);

  console.log("category: " + category);
  console.log(userRecipes[`${category}`]);
  console.log("----------------");

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

      {clickCategory ? (
        <MDBContainer className="p-md-4">
          {userRecipes[`${category}`]
            ? Object.keys(userRecipes[`${category}`]).map((recipe, index) => (
                <Recipe
                  userRecipes={userRecipes}
                  category={category}
                  recipeId={recipe}
                />
              ))
            : null}
        </MDBContainer>
      ) : null}
    </MDBContainer>
  );
}

export default List;
