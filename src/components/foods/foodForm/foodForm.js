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
  MDBProgress,
  MDBProgressBar,
  MDBTextArea,
  MDBTabsContent,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import styles from "./foodForm.css";

function FoodForm() {
  // these are for form functionality
  const [formStep, setFormStep] = useState(0);

  // these are for food info
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [servings, setServings] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  // console.log(category);
  const customForm = document.getElementById("custom-category-row");
  if (category === "custom") {
    console.log("yes, custom is selected");
    customForm.classList.add("show-custom");
  } else {
    customForm.classList.remove("show-custom");
  }

  const createFood = (e) => {
    // making sure all form values are filled
    if (
      category === "Select Meal" ||
      category === "" ||
      // servings === "" ||
      name === "" ||
      cal === "" ||
      protein === "" ||
      carbs === "" ||
      fat === ""
    ) {
      alert("please fill all fields before submitting.");
    } else {
      const foodRef = firebase.database().ref("foods");
      const food = {
        name,
        category,
        size,
        cal,
        protein,
        carbs,
        fat,
      };

      // console.log(food);
      foodRef.push(food);

      // setMeal("");
      setName("");
      // setServings("");
      setCal("");
      setProtein("");
      setCarbs("");
      setFat("");
    }
  };

  //   multi step form functionality
  useEffect(() => {
    const multiStepForm = document.querySelector("[data-multi-step]");
    const formSteps = Array.from(multiStepForm.querySelectorAll("[data-step]"));

    // event listeners to update formStep
    multiStepForm.addEventListener("click", (e) => {
      if (e.target.matches("[data-next]")) {
        const inputs = [...formSteps[formStep].querySelectorAll("input")];
        const allValid = inputs.every((input) => input.reportValidity());
        if (allValid) {
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
                >
                  <option>Category (optional)</option>
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
            <MDBRow className="custom-category" id="custom-category-row">
              <MDBCol className="text-white">
                <MDBInput
                  label="Custom Category"
                  type="text"
                  className="custom-category"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
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
            <MDBRow className="pt-5 mb-4">
              <MDBCol className="col-8">
                <MDBInput
                  id="recipe-form-grey"
                  label="Ingredient Name"
                  type="text"
                  onChange={(e) => {
                    // setIngredientName(e.target.value);
                  }}
                  contrast
                  // value={ingredientName}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  id="recipe-form-grey"
                  type="number"
                  label="Serving Size"
                  onChange={(e) => {
                    // setSize(e.target.value);
                  }}
                  // value={size}
                  contrast
                />
              </MDBCol>
              <MDBCol>
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  className="form-unit"
                  onChange={(e) => {
                    // setUnit(e.target.value);
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
            <MDBRow className="mt-4">
              <MDBCol>
                <MDBBtn
                  outline
                  color="light"
                  type="button"
                  className="border-1 bg-danger w-100"
                  // onClick={submitIngredient}
                >
                  Add Ingredient
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-5">
              {/* <IngredientList></IngredientList> */}
            </MDBRow>

            <MDBRow className="recipe-form-btns">
              <MDBBtn
                outline
                color="light"
                className="border-1 next bg-danger"
                type="button"
                // onClick={submitRecipe}
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
                  other submitted foods <a href="/recipes">here.</a>
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
