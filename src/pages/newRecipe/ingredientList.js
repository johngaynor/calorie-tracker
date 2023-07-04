import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";

import Ingredient from "./components/ingredient";
import styles from "./styles/ingredientList.css";

function IngredientList({ ingredients }) {
  return (
    <MDBContainer>
      {ingredients.length !== 0 ? (
        <h3 className="text-white mt-4">Ingredients:</h3>
      ) : (
        ""
      )}
      <MDBTable align="middle" className="ingredient-table text-white">
        {ingredients.length !== 0 ? (
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
          {ingredients
            ? ingredients.map((ingredient, index) => (
                <Ingredient ingredient={ingredient} key={index} />
              ))
            : null}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default IngredientList;
