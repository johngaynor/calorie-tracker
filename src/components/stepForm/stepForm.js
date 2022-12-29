import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBProgress,
  MDBProgressBar,
  MDBTextArea,
  MDBTabsContent,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import styles from "./stepForm.css";

function StepForm() {
  const [ingredientList, setIngredientList] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  //   multi step form functionality
  useEffect(() => {
    const multiStepForm = document.querySelector("[data-multi-step]");
    const formSteps = Array.from(multiStepForm.querySelectorAll("[data-step]"));

    let currentStep = formSteps.findIndex((step) => {
      return step.classList.contains("active");
    });

    if (currentStep < 0) {
      currentStep = 0;
      formSteps[currentStep].classList.add("active");
      showCurrentStep();
    }

    multiStepForm.addEventListener("click", (e) => {
      if (e.target.matches("[data-next]")) {
        currentStep += 1;
      } else if (e.target.matches("[data-previous]")) {
        currentStep -= 1;
      }
      showCurrentStep();
    });

    function showCurrentStep() {
      formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
      });
    }
  });

  // problem ended up being that nodeList doesn't work with findIndex, had to convert it to an array first

  // left off on the video at 16:17

  return (
    <MDBContainer>
      <h3 className="p-3 basic-header text-white">New Recipe Form</h3>
      <MDBContainer fluid className="w-75 recipe-form">
        <form data-multi-step className="mx-auto p-3 text-black">
          {/* first card */}
          <div className="form-card" data-step>
            <MDBProgress style={{ height: "10px" }}>
              <MDBProgressBar
                striped
                animated
                width="33"
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            <MDBRow className="pt-5 mb-4">
              <MDBCol className="col-9">
                <MDBInput
                  label="Recipe Name"
                  type="text"
                  onChange={(e) => {
                    //   setRecipeName(e.target.value);
                  }}
                  // value={recipeName}
                  contrast
                />
              </MDBCol>
              <MDBCol className="recipe-form-category">
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  onChange={(e) => {
                    // setUnit(e.target.value);
                  }}
                >
                  <option>Category</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </Form.Select>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBTextArea
                  label="Description"
                  type="text"
                  // onChange={(e) => {
                  //     setRecipeName(e.target.value);
                  // }}
                  // value={recipeName}
                  contrast
                  rows={3}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow className="recipe-form-btns">
              <MDBBtn
                outline
                color="light"
                className="border-1 next"
                type="button"
                data-next
              >
                Next
              </MDBBtn>
            </MDBRow>
          </div>
          {/* second card */}
          <div className="form-card" data-step>
            <MDBProgress style={{ height: "10px" }}>
              <MDBProgressBar
                striped
                animated
                width="66"
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            <MDBRow className="pt-5 mb-4">
              <MDBCol className="col-8">
                <MDBInput
                  id="ingredient-name"
                  label="Ingredient Name"
                  type="text"
                  onChange={(e) => {
                    //   setIngredientName(e.target.value);
                  }}
                  contrast
                  // value={ingredientName}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  id="ingredient-size"
                  type="number"
                  label="Serving Size"
                  onChange={(e) => {
                    //   setSize(e.target.value);
                  }}
                  // value={size}
                  contrast
                />
              </MDBCol>
              <MDBCol>
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  // className="form-meal"
                  onChange={(e) => {
                    //   setUnit(e.target.value);
                  }}
                >
                  <option>Unit</option>
                  <option value="grams">grams</option>
                  <option value="pcs">pcs</option>
                  <option value="oz">oz</option>
                  <option value="ml">ml</option>
                </Form.Select>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBInput
                  id="input-cal"
                  type="number"
                  label="Calories"
                  onChange={(e) => {
                    //   setCal(e.target.value);
                  }}
                  // value={cal}
                  contrast
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  id="input-protein"
                  type="number"
                  label="Protein"
                  onChange={(e) => {
                    //   setProtein(e.target.value);
                  }}
                  // value={protein}
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
                    //   setCarbs(e.target.value);
                  }}
                  // value={carbs}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  id="input-fat"
                  type="number"
                  label="Fat"
                  contrast
                  onChange={(e) => {
                    //   setFat(e.target.value);
                  }}
                  // value={fat}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow className="recipe-form-btns">
              <MDBBtn
                outline
                color="light"
                className="border-1 previous "
                type="button"
                data-previous
              >
                Previous
              </MDBBtn>
              <MDBBtn
                outline
                color="light"
                className="border-1 next"
                type="button"
                data-next
              >
                Next
              </MDBBtn>
            </MDBRow>
          </div>
          <div className="form-card" data-step>
            <p>3</p>

            <button type="button" data-previous>
              Previous
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </MDBContainer>
    </MDBContainer>
  );
}

export default StepForm;
