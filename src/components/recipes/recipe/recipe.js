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
import RecipeItem from "../recipeItem/recipeItem";
import AddIngredient from "../addIngredient/addIngredient";
import firebase from "../../../utilities/firebase";
import styles from "./recipe.css";
import { useEffect, useState } from "react";

function Recipe({ recipe, category, recipeID }) {
  const [deleteRecipe, setDeleteRecipe] = useState(false);
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
      // console.log(ingredientList);
    });
  }, []);

  // recipe.ingredients.forEach((ingredient) => {
  //   if (ingredient.add === true) {
  //     recipeCalTotal = recipeCalTotal + +ingredient.userCal;
  //     recipeProteinTotal = recipeProteinTotal + +ingredient.userProtein;
  //     recipeCarbsTotal = recipeCarbsTotal + +ingredient.userCarbs;
  //     recipeFatTotal = recipeFatTotal + +ingredient.userFat;
  //   }
  // });

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

  // console.log(recipe.ingredients);

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
          {/* {recipe.ingredients
            ? recipe.ingredients.map((ingredient, index) => (
                <RecipeItem
                  ingredient={ingredient}
                  key={index}
                  ingredientIndex={index}
                  recipeID={recipe.id}
                  category={recipe.category}
                />
              ))
            : ""} */}
          {/* {recipe.ingredients
            ? recipe.ingredients.map((ingredient, index) => <p>hello</p>)
            : null} */}
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
                {addIngredient ? (
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => setAddIngredient(false)}
                  >
                    Unadd Ingredient
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => setAddIngredient(true)}
                  >
                    Add Ingredient
                  </MDBBtn>
                )}
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
