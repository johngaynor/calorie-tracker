import React, { useEffect, useState, useRef } from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
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
import styles from "../styles/recipeItem.css";

function RecipeItem({
  ingredient,
  updateTotalMacros,
  recipeId,
  index,
  category,
}) {
  const [weight, setWeight] = useState("");
  const [macros, setMacros] = useState({
    cal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [removeIngredient, setRemoveIngredient] = useState(false);
  const [ingredientList, setIngredientList] = useState("");

  const [deleteIngredient, setDeleteIngredient] = useState(false);

  // creating local list of ingredients for removing them
  // useEffect(() => {
  //   const ingredientRef = firebase
  //     .database()
  //     .ref("recipes")
  //     .child(category)
  //     .child(recipeID)
  //     .child("ingredients");

  //   ingredientRef.on("value", (snapshot) => {
  //     const ingredients = snapshot.val();
  //     const ingredientList = [];
  //     for (let id in ingredients) {
  //       ingredientList.push({ id, ...ingredients[id] });
  //     }
  //     setIngredientList(ingredientList);
  //   });
  // }, []);

  // removing item from calculator
  const removeRecipeItem = () => {
    const user = firebase.auth().currentUser;
    console.log(user);
    console.log(ingredient);

    const ingredientRef = firebase
      .database()
      .ref(`recipes/${category}/${recipeId}/ingredients/${index}`);

    console.log(index);

    ingredientRef.update({ add: false });

    // const ingredientRef = firebase
    //   .database()
    //   .ref.database()
    //   .ref("recipes")
    //   .child(category)
    //   .child(recipeID)
    //   .child("ingredients")
    //   .child(ingredientID);

    // ingredientRef.update({
    //   add: false,
    // });
  };

  // deleting item from recipe
  // const confirmDeleteIngredient = () => {
  //   if (ingredientList.length === 1) {
  //     alert(
  //       "At least one ingredient is required per recipe. Please add another ingredient before deleting this one."
  //     );
  //   } else {
  //     ingredientList.splice(ingredientID, 1);

  //     const ingredientRef = firebase
  //       .database()
  //       .ref("recipes")
  //       .child(category)
  //       .child(recipeID);
  //     ingredientRef.update({
  //       ingredients: ingredientList,
  //     });
  //   }
  // };

  // adds recipe item back to calculator
  // const addRecipeItem = () => {
  //   const ingredientRef = firebase
  //     .database()
  //     .ref("recipes")
  //     .child(category)
  //     .child(recipeID)
  //     .child("ingredients")
  //     .child(ingredientID);

  //   ingredientRef.update({
  //     add: true,
  //   });
  // };

  // calculators for macros
  useEffect(() => {
    if (removeIngredient === true) {
      const clearedMacros = { cal: 0, protein: 0, carbs: 0, fat: 0 };
      updateTotalMacros(macros, clearedMacros);
      setMacros(clearedMacros);
    } else {
      // const weight = e.target.value;
      const cal = Number(
        ((weight * ingredient.cal) / ingredient.size).toFixed(0)
      );
      const protein = Number(
        ((weight * ingredient.protein) / ingredient.size).toFixed(0)
      );

      const carbs = Number(
        ((weight * ingredient.carbs) / ingredient.size).toFixed(0)
      );
      const fat = Number(
        ((weight * ingredient.fat) / ingredient.size).toFixed(0)
      );

      const newMacros = { cal, protein, carbs, fat };
      updateTotalMacros(macros, newMacros);
      setMacros(newMacros);
    }
  }, [weight, removeIngredient]);
  // const handleWeightChange = (e) => {
  // };

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
      {removeIngredient === false ? (
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
                placeholder="0"
              />
              <p className="text-muted mb-2 d-sm-none">in {ingredient.unit}</p>
              <div className="d-flex d-md-none justify-content-evenly mx-auto">
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  onClick={() => setRemoveIngredient(true)}
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
                      // onClick={confirmDeleteIngredient}
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
              min="0"
              className="food-input-boxes mt-2 d-none d-sm-block mx-auto"
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
            />
            <p className="text-muted mb-0 d-none d-sm-block">
              in {ingredient.unit}
            </p>
            <MDBRow className="calc-macros d-flex justify-content-center mb-3 d-sm-none">
              <MDBRow className="d-lg-none mb-2">
                <p className="w-100 my-0">Cal</p>
                <span className="cal mx-auto">{macros.cal}</span>
              </MDBRow>

              <p className="w-100 my-0 mx-1">P</p>
              <span className="protein bigger">{macros.protein}</span>

              <p className="w-100 my-0 mx-1">C</p>
              <span className="carbs bigger">{macros.carbs}</span>

              <p className="w-100 my-0 mx-1">F</p>
              <span className="fat bigger">{macros.fat}</span>
            </MDBRow>
          </td>
          <td className="d-lg-table-cell d-none">
            <MDBRow className="calc-macros mb-3">
              <MDBCol>
                <p className="w-100 my-0">Cal</p>
                <span className="cal mx-auto">{macros.cal}</span>
              </MDBCol>
            </MDBRow>
          </td>
          <td id="food-macros-display" className="d-sm-table-cell d-none">
            <input
              id="edit-weight-input"
              type="number"
              min="0"
              className="food-input-boxes d-sm-none"
              onChange={(e) => setWeight(e.target.value)}
              placeholder="0"
            />
            <p className="text-muted mb-0 d-sm-none">in {ingredient.unit}</p>
            <MDBRow className="calc-macros d-flex justify-content-center mb-3">
              <MDBRow className="d-lg-none mb-2">
                <p className="w-100 my-0">Cal</p>
                <span className="cal mx-auto">{macros.cal}</span>
              </MDBRow>
              <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center">
                <p className="w-100 my-0 mx-1">P</p>
                <span className="protein">{macros.protein}</span>
              </MDBCol>
              <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center mx-xl-1 mx-2">
                <p className="w-100 my-0 mx-1">C</p>
                <span className="carbs">{macros.carbs}</span>
              </MDBCol>
              <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center">
                <p className="w-100 my-0 mx-1">F</p>
                <span className="fat">{macros.fat}</span>
              </MDBCol>
            </MDBRow>
          </td>
          <td id="food-log-btns" className="d-md-table-cell d-none">
            <div className="d-flex justify-content-around mx-auto">
              <FontAwesomeIcon
                icon={faSquareCheck}
                onClick={() => setRemoveIngredient(true)}
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
                    // onClick={confirmDeleteIngredient}
                  />
                </div>
              </div>
            ) : null}
          </td>
        </tr>
      ) : (
        //  when ingredient is removed
        <tr id="food-display" className="text-muted">
          <td>
            <div className="mx-auto" id="food-meal-name-display">
              <p className="fw-bold mb-1" id="food-name-display">
                {ingredient.name}
              </p>
              <div className="d-flex d-md-none justify-content-evenly mx-auto">
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  onClick={() => setRemoveIngredient(false)}
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
                      // onClick={confirmDeleteIngredient}
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
                onClick={() => setRemoveIngredient(false)}
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
                    // onClick={confirmDeleteIngredient}
                  />
                </div>
              </div>
            ) : null}
          </td>
        </tr>
      )}
    </>
  );
}

export default RecipeItem;
