import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
} from "mdb-react-ui-kit";
import firebase from "../../../utilities/firebase";
import styles from "./recipeList.css";
import React, { useState } from "react";
import Recipe from "../recipe/recipe";

function RecipeHolder() {
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
          add: true,
          userCal: 3,
        },
        {
          name: "bread",
          servingSize: 1,
          unit: "grams",
          cal: 80,
          protein: 2,
          carbs: 11,
          fat: 1,
          add: true,
          userCal: 20,
        },
      ],
    },
    {
      name: "chicken wraps",
      ingredients: [
        {
          name: "chicken",
          servingSize: 1,
          unit: "pcs",
          cal: 70,
          protein: 5,
          carbs: 2,
          fat: 4,
          add: true,
        },
        {
          name: "lettuce",
          servingSize: 1,
          unit: "pcs",
          cal: 70,
          protein: 5,
          carbs: 2,
          fat: 4,
          add: true,
        },
        {
          name: "cheese",
          servingSize: 1,
          unit: "pcs",
          cal: 70,
          protein: 5,
          carbs: 2,
          fat: 4,
          add: true,
        },
      ],
    },
  ];

  //   console.log(recipes[0].ingredients[0]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <h3 className="p-3 d-flex basic-header">Recipes</h3>
      </MDBRow>
      <MDBContainer fluid className="recipe-table p-4 my-auto w-75">
        {recipes
          ? recipes.map((recipe, index) => (
              <Recipe recipe={recipe} key={index} />
              // <li key={index}>{recipe.name}</li>
            ))
          : ""}
      </MDBContainer>
    </MDBContainer>
  );
}

export default RecipeHolder;
