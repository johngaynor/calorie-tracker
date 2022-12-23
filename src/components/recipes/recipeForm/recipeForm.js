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
                //   onChange={nameOnChange}
                //   value={name}
                contrast
              />
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
                //   onChange={proteinOnChange}
                //   value={protein}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="input-carbs"
                type="number"
                label="Carbs"
                //   onChange={carbsOnChange}
                //   value={carbs}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="input-fat"
                type="number"
                label="Fat"
                //   onChange={fatOnChange}
                //   value={fat}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBInput
                id="input-size"
                type="number"
                label="Serving Size"
                //   onChange={calOnChange}
                //   value={cal}
                contrast
              />
            </MDBCol>
            <MDBCol>
              <MDBCol>
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  // className="form-meal"
                  //   onChange={mealOnChange}
                >
                  <option>Unit</option>
                  <option value="breakfast">grams</option>
                  <option value="lunch">oz</option>
                  <option value="dinner">ml</option>
                </Form.Select>
              </MDBCol>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBBtn
              outline
              color="light"
              className="w-75 mx-auto border-1"
              // onClick={createFood}
            >
              Submit
            </MDBBtn>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBContainer>
  );
}

export default RecipeForm;
