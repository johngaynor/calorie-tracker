import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
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

import firebase from "../../../utilities/firebase";
// import AddIngredient from "../addIngredient/addIngredient";
import styles from "../styles/recipeItem.css";

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
    if (ingredientList.length === 1) {
      alert(
        "At least one ingredient is required per recipe. Please add another ingredient before deleting this one."
      );
    } else {
      ingredientList.splice(ingredientID, 1);

      const ingredientRef = firebase
        .database()
        .ref("recipes")
        .child(category)
        .child(recipeID);
      ingredientRef.update({
        ingredients: ingredientList,
      });
    }
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

  // calculators for macros
  useEffect(() => {
    const ingredientRef = firebase
      .database()
      .ref("recipes")
      .child(category)
      .child(recipeID)
      .child("ingredients")
      .child(ingredientID);
    let calcCal = ((weight * ingredient.cal) / ingredient.size).toFixed(0);
    let calcProtein = ((weight * ingredient.protein) / ingredient.size).toFixed(
      0
    );
    let calcCarbs = ((weight * ingredient.carbs) / ingredient.size).toFixed(0);
    let calcFat = ((weight * ingredient.fat) / ingredient.size).toFixed(0);

    setCalcCal(calcCal);
    setCalcProtein(calcProtein);
    setCalcCarbs(calcCarbs);
    setCalcFat(calcFat);

    ingredientRef.update({
      userCal: calcCal,
      userProtein: calcProtein,
      userCarbs: calcCarbs,
      userFat: calcFat,
    });

    // I want to figure out how to show just 0 instead of 0.0
  }, [weight]);

  // popup that displays ingredient information
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
        <tr id="recipe-display">
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
              <input
                id="edit-weight-input"
                type="number"
                className="food-input-boxes d-sm-none d-block mx-auto mt-2"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                placeholder="0"
              />
              <p className="text-muted mb-2 d-sm-none">in {ingredient.unit}</p>
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
                <div className="mt-2 delete-btn-container mx-auto d-md-none">
                  <p>delete ingredient?</p>
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
              className="food-input-boxes mt-2 d-none d-sm-block mx-auto"
              onChange={(e) => setWeight(e.target.value)}
              value={weight}
              placeholder="0"
            />
            <p className="text-muted mb-0 d-none d-sm-block">
              in {ingredient.unit}
            </p>
            <MDBRow className="calc-macros d-flex justify-content-center mb-3 d-sm-none">
              <MDBRow className="d-lg-none mb-2">
                <p className="w-100 my-0">Cal</p>
                <span className="cal mx-auto">{calcCal}</span>
              </MDBRow>

              <p className="w-100 my-0 mx-1">P</p>
              <span className="protein bigger">{calcProtein}</span>

              <p className="w-100 my-0 mx-1">C</p>
              <span className="carbs bigger">{calcCarbs}</span>

              <p className="w-100 my-0 mx-1">F</p>
              <span className="fat bigger">{calcFat}</span>
            </MDBRow>
          </td>
          <td className="d-lg-table-cell d-none">
            <MDBRow className="calc-macros mb-3">
              <MDBCol>
                <p className="w-100 my-0">Cal</p>
                <span className="cal mx-auto">{calcCal}</span>
              </MDBCol>
            </MDBRow>
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
            <MDBRow className="calc-macros d-flex justify-content-center mb-3">
              <MDBRow className="d-lg-none mb-2">
                <p className="w-100 my-0">Cal</p>
                <span className="cal mx-auto">{calcCal}</span>
              </MDBRow>
              <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center">
                <p className="w-100 my-0 mx-1">P</p>
                <span className="protein">{calcProtein}</span>
              </MDBCol>
              <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center mx-xl-1 mx-2">
                <p className="w-100 my-0 mx-1">C</p>
                <span className="carbs">{calcCarbs}</span>
              </MDBCol>
              <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center">
                <p className="w-100 my-0 mx-1">F</p>
                <span className="fat">{calcFat}</span>
              </MDBCol>
            </MDBRow>
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
                <p>delete ingredient?</p>
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
            <div className="calc-macros">
              <span className="mx-auto muted"></span>
            </div>
          </td>
          <td id="food-macros-display" className="d-none d-lg-table-cell">
            N/a
          </td>
          <td id="food-log-btns" className="d-none d-md-table-cell">
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
