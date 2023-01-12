import {
  MDBTable,
  MDBTableHead,
  MDBBadge,
  MDBBtn,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import firebase from "../../../../utilities/firebase";
import styles from "./ingredient.css";

function Ingredient({ ingredient }) {
  const deleteIngredient = () => {
    console.log("deleted ingredient");
    const ingredientRef = firebase
      .database()
      .ref("add-ingredient")
      .child(ingredient.id);

    ingredientRef.remove();
  };

  return (
    <tr id="food-display" className="ingredient-display">
      <td>
        <div className="mx-auto" id="food-meal-name-display">
          <p className="fw-bold mb-1" id="food-name-display">
            {ingredient.name}
          </p>
          <MDBBtn
            color="link"
            rounded
            size="sm"
            className="mx-auto"
            id="ingredient-xs-btn"
            onClick={deleteIngredient}
          >
            Delete
          </MDBBtn>
        </div>
      </td>
      <td className="only-sm">
        <p className="fw-normal mb-1" id="food-servings-display">
          Serving Size: {ingredient.size} {""}
          <span className="text-muted">{ingredient.unit}</span>
        </p>
        <p>Cal: {ingredient.cal}</p>
        <p>
          P/C/F: {ingredient.protein}/{ingredient.carbs}/{ingredient.fat}
        </p>
      </td>
      <td>
        <p className="fw-normal mb-1" id="food-servings-display">
          {ingredient.size} {""}
          <span className="text-muted">{ingredient.unit}</span>
        </p>
      </td>
      <td>
        <MDBBadge
          color="success"
          pill
          className="d-flex justify-content-center"
          id="food-cal-display"
        >
          {ingredient.cal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {ingredient.protein}/{ingredient.carbs}/{ingredient.fat}
      </td>
      <td id="food-log-btns">
        <div>
          <MDBBtn
            color="link"
            rounded
            size="sm"
            className="mx-auto"
            onClick={deleteIngredient}
          >
            Delete
          </MDBBtn>
          {/* <MDBBtn color="link" rounded size="sm">
                    Edit
                  </MDBBtn> */}
        </div>
      </td>
    </tr>
  );
}

export default Ingredient;
