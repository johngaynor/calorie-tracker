import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
} from "mdb-react-ui-kit";
import RecipeItem from "../recipeItem/recipeItem";
import firebase from "../../../utilities/firebase";
import styles from "./recipe.css";
import { useState } from "react";

function Recipe({ recipe }) {
  const [deleteRecipe, setDeleteRecipe] = useState(false);

  let recipeCalTotal = 0;
  let recipeProteinTotal = 0;
  let recipeCarbsTotal = 0;
  let recipeFatTotal = 0;

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
      console.log(
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

  const confirmDeleteRecipe = () => {
    const recipeRef = firebase.database().ref("recipes").child(recipe.id);
    recipeRef.remove();
    alert("recipe has been deleted.");
  };

  return (
    <MDBContainer fluid className="user-form mb-5 pb-1">
      <h1>{recipe.name}</h1>
      <MDBTable align="middle" className="w-100 mx-auto text-white">
        <MDBTableHead>
          <tr>
            <th scope="col" className="col-4">
              Food
            </th>
            <th scope="col">Weight</th>
            <th scope="col">Calories</th>
            <th scope="col">P/C/F</th>
            <th scope="col" className="col-2">
              Actions
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {recipe.ingredients
            ? recipe.ingredients.map((ingredient, index) => (
                <RecipeItem
                  ingredient={ingredient}
                  key={index}
                  ingredientIndex={index}
                  recipeID={recipe.id}
                />
              ))
            : ""}
          <tr id="food-display">
            <td>
              <div className="mx-auto" id="food-meal-name-display">
                <p className="fw-bold mb-1" id="food-name-display">
                  TOTAL
                </p>
              </div>
            </td>
            <td>
              <span id="total-weight"></span>
              {/* this will get replaced later */}
            </td>
            <td>
              <span id="recipe-total-cal">CAL: {recipeCalTotal}</span>
            </td>
            <td id="food-macros-display">
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
            <td id="food-log-btns">
              <div>
                <MDBBtn color="link" rounded size="sm" onClick={pushRecipe}>
                  Push to Log
                </MDBBtn>
                {deleteRecipe ? (
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => setDeleteRecipe(false)}
                  >
                    Undelete Recipe
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => setDeleteRecipe(true)}
                  >
                    Delete Recipe
                  </MDBBtn>
                )}
              </div>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      {deleteRecipe ? (
        <MDBContainer fluid className="recipe-delete-warning bg-white w-75">
          <p className="text-black">
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </p>
          <MDBBtn color="danger" size="sm" onClick={confirmDeleteRecipe}>
            Delete Recipe
          </MDBBtn>
        </MDBContainer>
      ) : (
        ""
      )}
    </MDBContainer>
  );
}

export default Recipe;
