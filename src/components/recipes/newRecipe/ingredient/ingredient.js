import {
  MDBTable,
  MDBTableHead,
  MDBBadge,
  MDBBtn,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import firebase from "../../../../utilities/firebase";

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
    <tr id="food-display">
      <td>
        <div className="mx-auto" id="food-meal-name-display">
          <p className="fw-bold mb-1" id="food-name-display">
            {ingredient.name}
          </p>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1" id="food-servings-display">
          {ingredient.size}
        </p>
        <p className="text-muted mb-0">{ingredient.unit}</p>
      </td>
      <td>
        <MDBBadge color="success" pill className="d-flex" id="food-cal-display">
          {ingredient.cal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {ingredient.protein}/{ingredient.carbs}/{ingredient.fat}
      </td>
      <td id="food-log-btns">
        <div>
          <MDBBtn color="link" rounded size="sm" onClick={deleteIngredient}>
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
