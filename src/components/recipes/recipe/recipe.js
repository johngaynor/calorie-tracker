import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import RecipeItem from "../recipeItem/recipeItem";
import AddIngredient from "../addIngredient/addIngredient";
import firebase from "../../../utilities/firebase";
import styles from "./recipe.css";
import {
  faUpload,
  faDeleteLeft,
  faPlateWheat,
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Recipe({ recipe, category, recipeID }) {
  const [clickRecipe, setClickRecipe] = useState(false);
  const [addIngredient, setAddIngredient] = useState(false);
  const [ingredientList, setIngredientList] = useState("");

  let recipeCalTotal = 0;
  let recipeProteinTotal = 0;
  let recipeCarbsTotal = 0;
  let recipeFatTotal = 0;

  useEffect(() => {
    const ingredientRef = firebase
      .database()
      .ref("recipes")
      .child(category)
      .child(recipeID)
      .child("ingredients");

    ingredientRef.on("value", (snapshot) => {
      const ingredients = snapshot.val();
      const ingredientList = [];
      for (let id in ingredients) {
        ingredientList.push({ id, ...ingredients[id] });
      }

      setIngredientList(ingredientList);
    });
  }, []);

  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.add === true) {
      recipeCalTotal = recipeCalTotal + +ingredient.userCal;
      recipeProteinTotal = recipeProteinTotal + +ingredient.userProtein;
      recipeCarbsTotal = recipeCarbsTotal + +ingredient.userCarbs;
      recipeFatTotal = recipeFatTotal + +ingredient.userFat;
    }
  });

  const pushRecipe = () => {
    if (recipeCalTotal === 0) {
      alert(
        "please add at least one ingredient/weight before adding the recipe to daily log."
      );
    } else {
      const userLogRef = firebase.database().ref("user-log");
      const userMeal = {
        name: recipe.name,
        cal: recipeCalTotal,
        protein: recipeProteinTotal,
        carbs: recipeCarbsTotal,
        fat: recipeFatTotal,
      };

      userLogRef.push(userMeal);
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
        .ref("recipes")
        .child(category)
        .child(recipeID);
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
            {recipe.name}
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
            {recipe.name}
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
            {ingredientList
              ? ingredientList.map((ingredient, index) => (
                  <RecipeItem
                    ingredient={ingredient}
                    key={index}
                    category={category}
                    recipeID={recipeID}
                    ingredientID={index}
                  />
                ))
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
                <span id="recipe-total-cal">CAL: {recipeCalTotal}</span>
              </td>
              <td id="food-macros-display" className="d-table-cell">
                <span id="recipe-total-cal" className="d-lg-none mb-1">
                  CAL: {recipeCalTotal}
                </span>
                <span id="recipe-total-p" className="mb-1">
                  P: {recipeProteinTotal}
                </span>
                <span id="recipe-total-c" className="mb-1">
                  C: {recipeCarbsTotal}
                </span>
                <span id="recipe-total-f" className="mb-1">
                  F: {recipeFatTotal}
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
        <AddIngredient
          recipe={recipe.id}
          category={recipe.category}
        ></AddIngredient>
      ) : (
        ""
      )}
    </MDBContainer>
  );
}

export default Recipe;
