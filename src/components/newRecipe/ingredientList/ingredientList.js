import {
  MDBTable,
  MDBTableHead,
  MDBBadge,
  MDBBtn,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";
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
              <th scope="col" className="col-2 only-sm">
                Info
              </th>
              <th scope="col" className="col-4">
                Serving Size
              </th>
              <th scope="col">Calories</th>
              <th scope="col" className="col-4">
                P/C/F
              </th>
              <th scope="col" className="col-2">
                Actions
              </th>
            </tr>
          </MDBTableHead>
        ) : (
          <p className="mt-4">Add an ingredient to get started!</p>
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
