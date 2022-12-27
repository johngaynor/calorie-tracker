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

function Recipe({ recipe }) {
  let recipeCalTotal = 0;
  let recipeProteinTotal = 0;
  let recipeCarbsTotal = 0;
  let recipeFatTotal = 0;

  recipe.ingredients.forEach((ingredient) => {
    recipeCalTotal = recipeCalTotal + +ingredient.userCal;
    recipeProteinTotal = recipeProteinTotal + +ingredient.userProtein;
    recipeCarbsTotal = recipeCarbsTotal + +ingredient.userCarbs;
    recipeFatTotal = recipeFatTotal + +ingredient.userFat;
  });

  const pushRecipe = () => {
    alert("added to daily log!");
    window.location.reload();
    // const recipeRef = firebase.database().ref("recipes");
    // recipeRef.push(recipe);
  };

  return (
    <MDBContainer fluid className="user-form mb-5">
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
            <td></td>
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
              </div>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default Recipe;
