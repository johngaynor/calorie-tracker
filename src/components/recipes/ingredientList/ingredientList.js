import {
  MDBTable,
  MDBTableHead,
  MDBBadge,
  MDBBtn,
  MDBTableBody,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";

function IngredientList() {
  const [ingredientList, setIngredientList] = useState("");
  const newIngredientRef = firebase.database().ref("add-ingredient");

  useEffect(() => {
    newIngredientRef.on("value", (snapshot) => {
      const ingredients = snapshot.val();
      const ingredientList = [];
      for (let id in ingredients) {
        ingredientList.push({ id, ...ingredients[id] });
      }

      setIngredientList(ingredientList);
    });
  }, []);

  return (
    <MDBTable align="middle" className="w-100 mx-auto text-white">
      <MDBTableHead>
        <tr>
          <th scope="col" className="col-4">
            Ingredient
          </th>
          <th scope="col" className="col-4">
            Serving Size
          </th>
          <th scope="col">Calories</th>
          <th scope="col">P/C/F</th>
          <th scope="col" className="col-2">
            Actions
          </th>
        </tr>
      </MDBTableHead>
      {ingredientList
        ? ingredientList.map((ingredient, index) => (
            // <div>{ingredient.protein}</div>
            <MDBTableBody>
              <tr id="food-display">
                <td>
                  <div className="mx-auto" id="food-meal-name-display">
                    <p className="fw-bold mb-1" id="food-name-display">
                      {ingredient.name}
                    </p>
                    <p className="text-muted mb-0" id="food-meal-display">
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
                  <MDBBadge
                    color="success"
                    pill
                    className="d-flex"
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
                    <MDBBtn color="link" rounded size="sm">
                      Delete
                    </MDBBtn>
                    {/* <MDBBtn color="link" rounded size="sm">
                    Edit
                  </MDBBtn> */}
                  </div>
                </td>
              </tr>
            </MDBTableBody>
          ))
        : ""}
    </MDBTable>
  );
}

export default IngredientList;
