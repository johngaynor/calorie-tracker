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
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import styles from "./stepForm.css";

function StepForm() {
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
            <MDBRow className="pt-5">
              <MDBInput
                // id="input-recipe"
                label="Recipe Name"
                type="text"
                onChange={(e) => {
                  //   setRecipeName(e.target.value);
                }}
                // value={recipeName}
                contrast
              />
            </MDBRow>
            <MDBRow className="bg-primary d-flex justify-content-between pt-3">
              <MDBCol className="p-0 recipe-form-category">
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
              <MDBCol className="p-0 recipe-form-desc">
                <MDBTextArea
                  // id="input-recipe"
                  label="Description"
                  type="text"
                  onChange={(e) => {
                    //   setRecipeName(e.target.value);
                  }}
                  // value={recipeName}
                  contrast
                  rows={4}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              {/* <button type="button" data-next>
              Next
            </button> */}
              <MDBBtn
                outline
                color="light"
                className="border-1"
                type="button"
                //   id="recipe-submit"
                //   onClick={createRecipe}
              >
                Next
              </MDBBtn>
            </MDBRow>
          </div>
          <div className="form-card" data-step>
            <p>2</p>

            <button type="button" data-previous>
              Previous
            </button>
            <button type="button" data-next>
              Next
            </button>
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
