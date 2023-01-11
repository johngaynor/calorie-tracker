import React, { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import styles from "./foodForm.css";

function FoodForm() {
  // these are for form functionality
  const [formStep, setFormStep] = useState(0);

  // these are for food info
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [finalCategory, setFinalCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [size, setSize] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  //   multi step form functionality
  useEffect(() => {
    const multiStepForm = document.querySelector("[data-multi-step]");
    const formSteps = Array.from(multiStepForm.querySelectorAll("[data-step]"));

    // event listeners to update formStep
    multiStepForm.addEventListener("click", (e) => {
      if (e.target.matches("[data-next]")) {
        const inputs = [...formSteps[formStep].querySelectorAll("input")];
        const allValid = inputs.every((input) => input.reportValidity());

        if (formStep === 1) {
          let unitInput = document.getElementById("food-input-unit").value;
          if (unitInput === "unit") {
            alert("Please select a unit of measurement.");
          } else if (allValid) {
            setFormStep(formStep + 1);
          }
        } else if (allValid) {
          setFormStep(formStep + 1);
        }
      } else if (e.target.matches("[data-previous]")) {
        setFormStep(formStep - 1);
      }
      window.scrollTo(0, 0);
    });

    // applying the active class to whatever index matches formStep
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === formStep);
    });
  }, [formStep]);

  // adds/removes custom category form box
  useEffect(() => {
    const customForm = document.getElementById("custom-category-row");
    if (category === "custom") {
      customForm.classList.add("visible");
      customForm.classList.remove("invisible");
    } else {
      customForm.classList.remove("visible");
      customForm.classList.add("invisible");
    }
  });

  // updates the finalCategory useState();
  useEffect(() => {
    if (category === "custom") {
      if (customCategory === "") {
        setFinalCategory("Miscellaneous");
      } else {
        setFinalCategory(customCategory);
      }
    } else if (category === "") {
      setFinalCategory("Miscellaneous");
    } else {
      setFinalCategory(category);
    }
  });

  function submitFood() {
    if (
      unit === "" ||
      size === "" ||
      cal === "" ||
      protein === "" ||
      carbs === "" ||
      fat === ""
    ) {
    } else {
      const foodRef = firebase.database().ref("foods").child(category);
      const food = {
        name: name,
        category: finalCategory,
        servingSize: size,
        unit: unit,
        cal: cal,
        protein: protein,
        carbs: carbs,
        fat: fat,
      };

      foodRef.push(food);
    }
  }

  return (
    <MDBContainer className="pb-5 page-container">
      <h3 className="p-3 basic-header">New Food Form</h3>
      <MDBContainer fluid className="recipe-form">
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
              <MDBCol className="col-8">
                <MDBInput
                  label="Food Name"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  contrast
                  required
                />
              </MDBCol>
              <MDBCol className="recipe-form-category">
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  defaultValue="default-category"
                >
                  <option disabled value="default-category">
                    Category (optional)
                  </option>
                  <option value="custom">CUSTOM</option>
                  <option value="drinks">drinks</option>
                  <option value="condiments">condiments</option>
                  <option value="chips">chips</option>
                  <option value="snacks">snacks</option>
                  {/* will want to sort these alphabetically */}
                </Form.Select>
              </MDBCol>
            </MDBRow>
            <MDBRow className="text-white px-3 my-1">
              To add a custom category, select "CUSTOM" from the dropdown menu.
            </MDBRow>
            <MDBRow
              className="custom-category invisible"
              id="custom-category-row"
            >
              <MDBCol className="text-white">
                <MDBInput
                  label="Custom Category"
                  type="text"
                  onChange={(e) => {
                    setCustomCategory(e.target.value);
                  }}
                  value={customCategory}
                  contrast
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
            <MDBRow className="mb-2 pt-5">
              <MDBCol className="col-8">
                <MDBInput
                  type="number"
                  label="Serving Size"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  value={size}
                  contrast
                  required
                  className="needs-validation"
                />
              </MDBCol>
              <MDBCol>
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  className="form-unit"
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                  defaultValue="unit"
                  id="food-input-unit"
                >
                  <option disabled value="unit">
                    Unit
                  </option>
                  <option value="grams">grams</option>
                  <option value="pcs">pcs</option>
                  <option value="oz">oz</option>
                  <option value="ml">ml</option>
                </Form.Select>
              </MDBCol>
            </MDBRow>
            <MDBRow className="text-white px-3 my-1">
              Add nutritional information for one (1) serving.
            </MDBRow>
            <MDBRow>
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </MDBCol>
            </MDBRow>
            <MDBRow className="recipe-form-btns">
              <MDBBtn
                outline
                color="light"
                className="border-1 next bg-danger"
                type="button"
                onClick={submitFood}
                data-next
              >
                Submit
              </MDBBtn>
              <MDBBtn
                outline
                color="light"
                className="border-1 previous"
                type="button"
                data-previous
              >
                Previous
              </MDBBtn>
            </MDBRow>
          </div>
          {/* third card */}
          <div className="form-card" data-step>
            <MDBProgress style={{ height: "10px" }}>
              <MDBProgressBar
                striped
                animated
                width="100"
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            <MDBRow className="pt-5 text-white">
              <MDBCol className="col-sm-5 mx-auto mt-5">
                <p>
                  Thanks for submitting your food! You can view it as well as
                  other submitted foods <a href="/foods">here.</a>
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="recipe-form-btns">
              <MDBBtn
                outline
                color="light"
                className="border-1 next w-25"
                type="button"
                onClick={() => window.location.reload()}
              >
                Submit another food
              </MDBBtn>
            </MDBRow>
          </div>
        </form>
      </MDBContainer>
    </MDBContainer>
  );
}

export default FoodForm;
