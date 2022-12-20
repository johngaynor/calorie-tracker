import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
} from "mdb-react-ui-kit";
import firebase from "../../utilities/firebase";
import styles from "./recipes.css";
import React, { useState } from "react";

function Recipes() {
  const [weight, setWeight] = useState(0);
  const [weightCal, setWeightCal] = useState("");

  var recipes = [
    {
      name: "french toast",
      ingredients: [
        {
          name: "eggs",
          servingSize: 1,
          unit: "pcs",
          cal: 70,
          protein: 5,
          carbs: 2,
          fat: 4,
        },
        {
          name: "bread",
          servingSize: 1,
          unit: "pcs",
          cal: 80,
          protein: 2,
          carbs: 11,
          fat: 1,
        },
      ],
    },
  ];

  //   console.log(recipes[0].ingredients[0]);

  const weightOnChange = (e) => {
    setWeight(e.target.value);
    console.log(weight);
    // let calcCal = weight * 3;
    // console.log(calcCal);
    let foodCal = recipes[0].ingredients[0].cal;
    let calcCal = weight * foodCal;
    setWeightCal(calcCal);
  };

  const recipeWeightCalc = () => {
    console.log("calculating macros");
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <h3 className="p-3 d-flex basic-header">Recipes</h3>
      </MDBRow>
      <MDBContainer fluid className="recipe-table p-4 my-auto w-75">
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
            {/* each food will store a serving size */}
            {/* hover over each item to view database info? Click on it to change it? That would be cool */}
          </MDBTableHead>
          <MDBTableBody>
            <tr id="food-display">
              <td>
                <div className="mx-auto" id="food-meal-name-display">
                  <p className="fw-bold mb-1" id="food-name-display">
                    {recipes[0].ingredients[0].name}
                  </p>
                  <p className="text-muted mb-0" id="food-meal-display">
                    underline
                  </p>
                </div>
              </td>
              <td>
                <input
                  id="edit-weight-input"
                  type="number"
                  className="food-input-boxes"
                  onChange={weightOnChange}
                  // onKeyDown={weightOnChange}
                  value={weight}
                />
                <p className="text-muted mb-0">in grams</p>
              </td>
              <td>
                <MDBBadge
                  color="success"
                  pill
                  className="d-flex"
                  id="food-cal-display"
                >
                  {weightCal}
                </MDBBadge>
              </td>
              <td id="food-macros-display">p/c/f</td>
              <td id="food-log-btns">
                <div>
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    // this is just here to set it back to default
                  >
                    Submit
                  </MDBBtn>
                </div>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </MDBContainer>
  );
}

export default Recipes;
