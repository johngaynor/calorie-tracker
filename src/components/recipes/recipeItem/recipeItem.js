import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Recipes from "../../../pages/recipes/recipes";
import Recipe from "../recipe/recipe";
import styles from "./recipeItem.css";
import firebase from "../../../utilities/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faXmarkCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareCheck,
  faSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import AddIngredient from "../addIngredient/addIngredient";

function RecipeItem({ ingredient, recipeID, category, ingredientID }) {
  const [weight, setWeight] = useState("");
  const [calcCal, setCalcCal] = useState(0);
  const [calcProtein, setCalcProtein] = useState(0);
  const [calcCarbs, setCalcCarbs] = useState(0);
  const [calcFat, setCalcFat] = useState(0);
  const [ingredientList, setIngredientList] = useState("");

  const [deleteIngredient, setDeleteIngredient] = useState(false);

  // creating local list of ingredients for removing them
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

  // removing item from calculator
  const removeRecipeItem = () => {
    const ingredientRef = firebase
      .database()
      .ref("recipes")
      .child(category)
      .child(recipeID)
      .child("ingredients")
      .child(ingredientID);

    ingredientRef.update({
      add: false,
    });
  };

  // deleting item from recipe
  const confirmDeleteIngredient = () => {
    ingredientList.splice(ingredientID, 1);

    const ingredientRef = firebase
      .database()
      .ref("recipes")
      .child(category)
      .child(recipeID);
    ingredientRef.update({
      ingredients: ingredientList,
    });
  };

  // adds recipe item back to calculator
  const addRecipeItem = () => {
    const ingredientRef = firebase
      .database()
      .ref("recipes")
      .child(category)
      .child(recipeID)
      .child("ingredients")
      .child(ingredientID);

    ingredientRef.update({
      add: true,
    });
  };

  // console.log(ingredient);

  // useEffect(() => {
  //   const ingredientRef = firebase
  //     .database()
  //     .ref("recipes")
  //     .child(recipeID)
  //     .child("ingredients")
  //     .child(ingredientIndex);
  //   let calcCal = (weight * ingredient.cal).toFixed(0);
  //   let calcProtein = (weight * ingredient.protein).toFixed(1);
  //   let calcCarbs = (weight * ingredient.carbs).toFixed(1);
  //   let calcFat = (weight * ingredient.fat).toFixed(1);

  //   setCalcCal(calcCal);
  //   setCalcProtein(calcProtein);
  //   setCalcCarbs(calcCarbs);
  //   setCalcFat(calcFat);

  //   ingredientRef.update({
  //     userCal: calcCal,
  //     userProtein: calcProtein,
  //     userCarbs: calcCarbs,
  //     userFat: calcFat,
  //   });

  // I want to figure out how to show just 0 instead of 0.0
  // }, [weight]);

  const alertIngredientInfo = () => {
    window.confirm(`
    Name: ${ingredient.name}
    Serving Size: ${ingredient.size} ${ingredient.unit}
    Calories (per serving): ${ingredient.cal}
    Protein (per serving): ${ingredient.protein}
    Carbs (per serving): ${ingredient.carbs}
    Fat (per serving): ${ingredient.fat}
    `);
  };

  return (
    <>
      {ingredient.add ? (
        <tr id="food-display">
          <td>
            <div className="mx-auto" id="food-meal-name-display">
              <p className="fw-bold mb-1" id="food-name-display">
                {ingredient.name}
              </p>
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="food-info"
                onClick={alertIngredientInfo}
              />
              <div className="d-flex d-md-none justify-content-evenly mx-auto">
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  onClick={removeRecipeItem}
                  className="recipe-item-btns"
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="recipe-item-btns"
                  onClick={() => setDeleteIngredient(true)}
                />
              </div>
              {deleteIngredient ? (
                <div className="mt-2 delete-btn-container mx-auto">
                  <p>delete food?</p>
                  <div>
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="delete-btns cancel"
                      onClick={() => setDeleteIngredient(false)}
                    />
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="delete-btns confirm"
                      onClick={confirmDeleteIngredient}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </td>
          <td>
            <input
              id="edit-weight-input"
              type="number"
              className="food-input-boxes"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              placeholder="0"
            />
            <p className="text-muted mb-0">in {ingredient.unit}</p>
          </td>
          <td className="d-lg-table-cell d-none">
            <MDBBadge
              color="success"
              pill
              className="d-flex"
              id="food-cal-display"
            >
              {calcCal}
            </MDBBadge>
          </td>
          <td id="food-macros-display" className="d-sm-table-cell d-none">
            <input
              id="edit-weight-input"
              type="number"
              className="food-input-boxes d-sm-none"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              placeholder="0"
            />
            <p className="text-muted mb-0 d-sm-none">in {ingredient.unit}</p>
            <MDBBadge
              color="success"
              pill
              className="d-lg-none"
              id="food-cal-display"
            >
              {calcCal}
            </MDBBadge>
            <p className="my-auto">
              {calcProtein}/{calcCarbs}/{calcFat}
            </p>
          </td>
          <td id="food-log-btns" className="d-md-table-cell d-none">
            <div className="d-flex justify-content-around mx-auto">
              <FontAwesomeIcon
                icon={faSquareCheck}
                onClick={removeRecipeItem}
                className="recipe-item-btns"
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="recipe-item-btns"
                onClick={() => setDeleteIngredient(true)}
              />
            </div>
            {deleteIngredient ? (
              <div className="mt-2 delete-btn-container mx-auto">
                <p>delete food?</p>
                <div>
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className="delete-btns cancel"
                    onClick={() => setDeleteIngredient(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="delete-btns confirm"
                    onClick={confirmDeleteIngredient}
                  />
                </div>
              </div>
            ) : null}
          </td>
        </tr>
      ) : (
        // when ingredient is removed
        <tr id="food-display" className="text-muted">
          <td>
            <div className="mx-auto" id="food-meal-name-display">
              <p className="fw-bold mb-1" id="food-name-display">
                {ingredient.name}
              </p>
              <div className="d-flex d-md-none justify-content-evenly mx-auto">
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  onClick={addRecipeItem}
                  className="recipe-item-btns"
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="recipe-item-btns"
                  onClick={() => setDeleteIngredient(true)}
                />
              </div>
              {deleteIngredient ? (
                <div className="mt-2 delete-btn-container mx-auto">
                  <p>delete food?</p>
                  <div>
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="delete-btns cancel"
                      onClick={() => setDeleteIngredient(false)}
                    />
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="delete-btns confirm"
                      onClick={confirmDeleteIngredient}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </td>
          <td>
            <div className="muted-weight-input mx-auto"></div>
          </td>
          <td className="d-sm-table-cell d-none">
            <MDBBadge
              color="danger"
              pill
              className="d-flex"
              id="food-cal-display"
            ></MDBBadge>
          </td>
          <td id="food-macros-display" className="d-none d-lg-table-cell">
            N/a
          </td>
          <td id="food-log-btns">
            <div className="d-flex justify-content-around mx-auto">
              <FontAwesomeIcon
                icon={faSquare}
                onClick={addRecipeItem}
                className="recipe-item-btns"
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="recipe-item-btns"
                onClick={() => setDeleteIngredient(true)}
              />
            </div>
            {deleteIngredient ? (
              <div className="mt-2 delete-btn-container mx-auto">
                <p>delete food?</p>
                <div>
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className="delete-btns cancel"
                    onClick={() => setDeleteIngredient(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="delete-btns confirm"
                    onClick={confirmDeleteIngredient}
                  />
                </div>
              </div>
            ) : null}
            {/* when deleting ingredients I need to reupload the ingredientList to fix the index number shown on firebase */}
          </td>
        </tr>
      )}
    </>
  );
}

export default RecipeItem;

// console.logs for removeRecipeItem:
// console.log("ingredient.id: " + ingredient.id);
// console.log("key: " + recipeID);
// console.log("ingredientIndex: " + ingredientIndex);
