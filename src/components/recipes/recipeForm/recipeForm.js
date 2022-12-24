import React, { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import styles from "./recipeForm.css";

function RecipeForm() {
  const [ingredientList, setIngredientList] = useState();
  const [name, setName] = useState("");
  const [protein, setProtein] = useState("");

  console.log(ingredientList);

  const submitIngredient = () => {
    const newIngredientRef = firebase.database().ref("add-ingredient");
    const ingredient = {
      name: name,
      protein: protein,
    };

    newIngredientRef.push(ingredient);
    setProtein("");
  };

  useEffect(() => {
    const newIngredientRef = firebase.database().ref("add-ingredient");
    newIngredientRef.on("value", (snapshot) => {
      const ingredients = snapshot.val();
      const ingredientList = [];
      for (let id in ingredients) {
        ingredientList.push({ id, ...ingredients[id] });
      }

      setIngredientList(ingredientList);
    });
  }, []);

  const createRecipe = () => {
    const recipeRef = firebase.database().ref("recipes");
    const recipe = {
      name: "",
      //   ingredients: [{}, {}],
    };

    const newIngredientRef = firebase.database().ref("add-ingredient");
    console.log(newIngredientRef);
    newIngredientRef.set(null);
    setIngredientList(null);
  };

  return (
    <MDBContainer fluid>
      <h3 className="p-3 d-flex basic-header">New Recipe Form</h3>
      <MDBContainer fluid className="w-75">
        <MDBContainer className="p-2 user-form">
          <MDBRow className="m-3">
            <MDBCol>
              <MDBInput
                id="input-recipe"
                label="Recipe Name"
                type="text"
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                contrast
              />
            </MDBCol>
          </MDBRow>
          {ingredientList
            ? ingredientList.map((ingredient, index) => (
                <div>{ingredient.protein}</div>
              ))
            : ""}
          <MDBRow className="m-3">
            <MDBCol className="col-8">
              <MDBInput
                id="ingredient-name"
                label="Ingredient Name"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="ingredient-size"
                type="number"
                label="Serving Size"
                //   onChange={proteinOnChange}
                //   value={protein}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <Form.Select
                aria-label="Default select"
                size="md"
                // className="form-meal"
                //   onChange={mealOnChange}
              >
                <option>Unit</option>
                <option value="grams">grams</option>
                <option value="oz">oz</option>
                <option value="ml">ml</option>
              </Form.Select>
            </MDBCol>
          </MDBRow>
          <MDBRow className="m-3">
            <MDBCol>
              <MDBInput
                id="input-cal"
                type="number"
                label="Calories"
                //   onChange={calOnChange}
                //   value={cal}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="input-protein"
                type="number"
                label="Protein"
                onChange={(e) => {
                  setProtein(e.target.value);
                }}
                value={protein}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBInput id="input-carbs" type="number" label="Carbs" contrast />
            </MDBCol>
            <MDBCol>
              <MDBInput id="input-fat" type="number" label="Fat" contrast />
            </MDBCol>
          </MDBRow>
          <MDBRow className="m-4 d-flex flex-row justify-content-between">
            <MDBBtn
              outline
              color="light"
              className="border-1"
              id="recipe-submit"
              onClick={createRecipe}
            >
              Submit Recipe
            </MDBBtn>
            <MDBBtn
              outline
              color="light"
              className="border-1"
              id="recipe-add-ingredient"
              onClick={submitIngredient}
            >
              Add Ingredient
            </MDBBtn>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
}

export default RecipeForm;
