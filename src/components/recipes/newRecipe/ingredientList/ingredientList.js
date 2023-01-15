import {
  MDBTable,
  MDBTableHead,
  MDBBadge,
  MDBBtn,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import firebase from "../../../../utilities/firebase";
import Ingredient from "../ingredient/ingredient";
import styles from "./ingredientList.css";

function IngredientList() {
  const [ingredientList, setIngredientList] = useState("");
  const [ingredientTable, setIngredientTable] = useState(false);

  // used to reference firebase "add-ingredient" database
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

  // checks length of ingredientList to show/hide table head
  useEffect(() => {
    if (ingredientList.length == 0) {
      setIngredientTable(false);
    } else {
      setIngredientTable(true);
    }
  }, [ingredientList]);

  return (
    <MDBContainer className="">
      {ingredientTable ? <h3 className="text-white mt-4">Ingredients:</h3> : ""}
      {/* <h3 className="text-white mt-4">Ingredients:</h3> */}
      <MDBTable align="middle" className="ingredient-table text-white">
        {ingredientTable ? (
          <MDBTableHead>
            <tr>
              <th scope="col" className="col-4">
                Ingredient
              </th>
              <th scope="col" className="d-none d-md-table-cell">
                Serving Size
              </th>
              <th scope="col" className="d-none d-lg-table-cell col-3">
                Calories (per serving)
              </th>
              <th scope="col" className="d-none d-lg-table-cell">
                P/C/F (per serving)
              </th>
              <th scope="col" className="d-lg-none col-4">
                Macros (per serving)
              </th>
              <th scope="col" className="d-none d-xl-table-cell">
                Actions
              </th>
            </tr>
          </MDBTableHead>
        ) : (
          <thead>
            <tr className="mt-4">
              <td>Add an ingredient to get started!</td>
            </tr>
          </thead>
        )}
        <MDBTableBody>
          {ingredientList
            ? ingredientList.map((ingredient, index) => (
                <Ingredient ingredient={ingredient} key={index} />
              ))
            : null}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default IngredientList;
