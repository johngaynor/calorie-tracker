import { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faDeleteLeft,
  faPlateWheat,
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";

import firebase from "../../utilities/firebase";
import RecipeItem from "./components/recipeItem";
// import AddIngredient from "./components/addIngredient";
import styles from "./styles/recipe.css";

function Recipe({ userRecipes, category, recipeId }) {
  const [clickRecipe, setClickRecipe] = useState(false);
  const [addIngredient, setAddIngredient] = useState(false);

  // useStates to keep track of total macros
  const [totalCal, setTotalCal] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  // console.log(userRecipes);

  const ingredientLength =
    userRecipes[`${category}`][`${recipeId}`].ingredients.length;

  const updateTotalMacros = (prevMacros, newMacros) => {
    setTotalCal((prev) => prev - prevMacros.cal + newMacros.cal);
    setTotalProtein((prev) => prev - prevMacros.protein + newMacros.protein);
    setTotalCarbs((prev) => prev - prevMacros.carbs + newMacros.carbs);
    setTotalFat((prev) => prev - prevMacros.fat + newMacros.fat);
  };

  const pushRecipe = () => {
    if (totalCal === 0) {
      alert(
        "please add at least one ingredient/weight before adding the recipe to daily log."
      );
    } else {
      const logRef = firebase.database().ref("user-log");
      const userMeal = {
        name: userRecipes[`${category}`][`${recipeId}`].name,
        cal: parseFloat(totalCal),
        protein: parseFloat(totalProtein),
        carbs: parseFloat(totalCarbs),
        fat: parseFloat(totalFat),
      };

      logRef.push(userMeal);
      alert("added to daily log!");
      window.location.reload();
    }
  };

  const deleteRecipe = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone."
      )
    ) {
      const recipeRef = firebase
        .database()
        .ref(`recipes/${category}/${recipeId}`);
      recipeRef.remove();
    }
  };

  return (
    <MDBContainer
      fluid
      className={
        clickRecipe ? "food-table each-recipe mb-5" : "each-recipe mb-2"
      }
    >
      {clickRecipe ? (
        <div
          className="d-flex justify-content-between align-items-center select"
          onClick={() => setClickRecipe(false)}
        >
          <FontAwesomeIcon icon={faSquareCaretUp} className="recipe-caret" />
          <h4 className="py-2 d-flex flex-wrap overflow-hidden">
            {userRecipes[`${category}`][`${recipeId}`].name}
          </h4>
          <FontAwesomeIcon icon={faSquareCaretUp} className="recipe-caret" />
        </div>
      ) : (
        <div
          className="d-flex justify-content-between align-items-center unselect"
          onClick={() => setClickRecipe(true)}
        >
          <FontAwesomeIcon icon={faSquareCaretDown} className="recipe-caret" />
          <h4 className="d-flex flex-wrap overflow-hidden py-2">
            {userRecipes[`${category}`][`${recipeId}`].name}
          </h4>
          <FontAwesomeIcon icon={faSquareCaretDown} className="recipe-caret" />
        </div>
      )}
      {clickRecipe ? (
        <MDBTable align="middle" className="w-100 mx-auto text-white">
          <MDBTableHead>
            <tr>
              <th scope="col" className="col-4">
                Food
              </th>
              <th scope="col" className="d-sm-table-cell d-none">
                Weight
              </th>
              <th scope="col" className="d-lg-table-cell d-none">
                Calories
              </th>
              <th scope="col" className="d-lg-table-cell d-none">
                P/C/F
              </th>
              <th scope="col" className="d-lg-none d-table-cell">
                Macros
              </th>
              <th scope="col-2" className="d-md-table-cell d-none">
                Actions
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {userRecipes[`${category}`][`${recipeId}`].ingredients
              ? userRecipes[`${category}`][`${recipeId}`].ingredients.map(
                  (ingredient, index) => (
                    <RecipeItem
                      recipeId={recipeId}
                      ingredient={ingredient}
                      updateTotalMacros={updateTotalMacros}
                      index={index}
                      category={category}
                      ingredientLength={ingredientLength}
                    />
                  )
                )
              : null}
            <tr id="recipe-totals">
              <td>
                <div className="mx-auto">
                  <p className="fw-bold mb-1">TOTAL</p>
                  {/* btns that only show <md */}
                  <div className="d-flex justify-content-evenly mx-auto my-2 d-md-none">
                    {addIngredient ? (
                      <FontAwesomeIcon
                        icon={faPlateWheat}
                        className="recipe-btns selected-btn"
                        onClick={() => setAddIngredient(false)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlateWheat}
                        className="recipe-btns"
                        onClick={() => setAddIngredient(true)}
                      />
                    )}

                    <FontAwesomeIcon
                      icon={faUpload}
                      className="recipe-btns"
                      onClick={pushRecipe}
                    />
                  </div>
                  <div className="d-md-none">
                    <FontAwesomeIcon
                      icon={faDeleteLeft}
                      className="recipe-btns selected-btn"
                      onClick={deleteRecipe}
                    />
                  </div>
                  {/* end <md btns */}
                </div>
              </td>
              <td className="d-none d-sm-table-cell">
                <span id="total-weight"></span>
              </td>
              <td className="d-lg-table-cell d-none">
                <span id="recipe-total-cal">CAL: {totalCal}</span>
              </td>
              <td id="food-macros-display" className="d-table-cell">
                <span id="recipe-total-cal" className="d-lg-none mb-1">
                  CAL: {totalCal}
                </span>
                <span id="recipe-total-p" className="mb-1">
                  P: {totalProtein}
                </span>
                <span id="recipe-total-c" className="mb-1">
                  C: {totalCarbs}
                </span>
                <span id="recipe-total-f" className="mb-1">
                  F: {totalFat}
                </span>
              </td>
              <td id="food-log-btns" className="d-none d-md-table-cell">
                <div className="d-flex justify-content-around mx-auto mb-xl-3 mb-2">
                  {addIngredient ? (
                    <FontAwesomeIcon
                      icon={faPlateWheat}
                      className="recipe-btns selected-btn"
                      onClick={() => setAddIngredient(false)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlateWheat}
                      className="recipe-btns"
                      onClick={() => setAddIngredient(true)}
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faUpload}
                    className="recipe-btns"
                    onClick={pushRecipe}
                  />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faDeleteLeft}
                    className="recipe-btns"
                    onClick={deleteRecipe}
                  />
                </div>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      ) : null}

      {addIngredient ? (
        // <AddIngredient
        //   recipe={recipe.id}
        //   category={recipe.category}
        // />
        <h1>other add ingredient</h1>
      ) : (
        ""
      )}
    </MDBContainer>
  );
}

export default Recipe;
