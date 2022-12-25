import React, { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
} from "mdb-react-ui-kit";
import Food from "../../foods/food/food";
import IngredientList from "../ingredientList/ingredientList";
import { Form } from "react-bootstrap";
import styles from "./recipeForm.css";

function RecipeForm() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  // this is to reference the "add-ingredient" obj from firebase
  const newIngredientRef = firebase.database().ref("add-ingredient");

  const submitIngredient = () => {
    let newIngredient = {
      name: name,
      size: size,
      unit: unit,
      cal: cal,
      protein: protein,
      carbs: carbs,
      fat: fat,
    };

    newIngredientRef.push(newIngredient);
    setName("");
  };

  const createRecipe = () => {
    const recipeRef = firebase.database().ref("recipes");
    const recipe = {
      name: "",
      //   ingredients: [{}, {}],
    };

    newIngredientRef.remove();
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
          <MDBRow className="m-3">
            <IngredientList></IngredientList>
          </MDBRow>
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
                value={name}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="ingredient-size"
                type="number"
                label="Serving Size"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                value={size}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <Form.Select
                aria-label="Default select"
                size="md"
                // className="form-meal"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
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
                onChange={(e) => {
                  setCal(e.target.value);
                }}
                value={cal}
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
              <MDBInput
                id="input-carbs"
                type="number"
                label="Carbs"
                contrast
                onChange={(e) => {
                  setCarbs(e.target.value);
                }}
                value={carbs}
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="input-fat"
                type="number"
                label="Fat"
                contrast
                onChange={(e) => {
                  setFat(e.target.value);
                }}
                value={fat}
              />
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

// old code

//   const submitIngredient = () => {
// const newIngredientRef = firebase.database().ref("add-ingredient");
//     const ingredient = {
//       name: name,
//       protein: protein,
//     };

//     newIngredientRef.push(ingredient);
//     setProtein("");
