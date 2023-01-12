import React, { useState, useEffect } from "react";
import firebase from "../../../../utilities/firebase";
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
import IngredientList from "../ingredientList/ingredientList";
import IngredientReview from "../ingredientReview/ingredientReview";
import styles from "./recipeForm.css";

function RecipeForm() {
  // these are for form functionality
  const [formStep, setFormStep] = useState(0);

  // these are for recipe submission
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [finalCategory, setFinalCategory] = useState("");
  const [recipeDesc, setRecipeDesc] = useState("");
  const [finalDesc, setFinalDesc] = useState("");
  const [ingredientList, setIngredientList] = useState("");

  // these are for ingredient submission
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

  // updates the finalCategory useState();
  useEffect(() => {
    if (recipeCategory === "") {
      setFinalCategory("Miscellaneous");
    } else {
      setFinalCategory(recipeCategory);
    }

    if (recipeDesc === "") {
      setFinalDesc("no description added");
    } else {
      setFinalDesc(recipeDesc);
    }
  });

  // creates local list of new ingredients from firebase
  useEffect(() => {
    const ingredientListRef = firebase.database().ref("add-ingredient");
    ingredientListRef.on("value", (snapshot) => {
      const ingredients = snapshot.val();
      const ingredientList = [];
      for (let id in ingredients) {
        ingredientList.push({ id, ...ingredients[id] });
      }

      setIngredientList(ingredientList);

      // hiding the next button if there are no ingredients
      const nextBtn = document.getElementById("step-two-submit");
      if (ingredientList.length === 0) {
        nextBtn.classList.add("prevent-next");
      } else {
        nextBtn.classList.remove("prevent-next");
      }
    });
  }, []);

  // function to submit ingredients
  const submitIngredient = () => {
    const newIngredientRef = firebase.database().ref("add-ingredient");
    if (
      ingredientName === "" ||
      size === "" ||
      unit === "Unit" ||
      unit === "" ||
      cal === "" ||
      protein === "" ||
      carbs === "" ||
      fat === ""
    ) {
      alert("please fill all fields before submitting.");
    } else {
      let newIngredient = {
        name: ingredientName,
        size: size,
        unit: unit,
        cal: cal,
        protein: protein,
        carbs: carbs,
        fat: fat,
        add: true,
      };

      newIngredientRef.push(newIngredient);
      setIngredientName("");
      setSize("");
      setCal("");
      setProtein("");
      setCarbs("");
      setFat("");
    }
  };

  // function to submit recipes
  const submitRecipe = () => {
    const recipeRef = firebase
      .database()
      .ref("recipes")
      .child(`${finalCategory}`);
    const recipe = {
      name: recipeName,
      description: finalDesc,
      category: finalCategory,
      ingredients: ingredientList,
    };

    // console.log(recipe);
    recipeRef.push(recipe);
    alert("recipe successfully submitted!");
    firebase.database().ref("add-ingredient").remove();
  };

  return (
    <MDBContainer className="pb-5 page-container">
      <h3 className="p-3 basic-header">New Recipe Form</h3>
      <MDBContainer fluid className="recipe-form">
        <form data-multi-step className="mx-auto p-3 text-black">
          {/* first card */}
          <div className="form-card" data-step>
            <MDBProgress style={{ height: "10px" }}>
              <MDBProgressBar
                striped
                animated
                width="25"
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            <MDBRow className="pt-5 mb-4">
              <MDBCol className="col-8">
                <MDBInput
                  label="Recipe Name"
                  type="text"
                  id="recipe-form-grey"
                  onChange={(e) => {
                    setRecipeName(e.target.value);
                  }}
                  value={recipeName}
                  contrast
                  required
                />
              </MDBCol>
              <MDBCol className="recipe-form-category">
                <Form.Select
                  aria-label="Default select"
                  size="md"
                  //   id="recipe-form-category"
                  onChange={(e) => {
                    setRecipeCategory(e.target.value);
                  }}
                  defaultValue="default-category"
                >
                  <option value="default-category" disabled>
                    Category (optional)
                  </option>
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
                  label="Description (optional)"
                  type="text"
                  id="recipe-form-grey"
                  onChange={(e) => {
                    setRecipeDesc(e.target.value);
                  }}
                  value={recipeDesc}
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
                width="50"
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
                    setIngredientName(e.target.value);
                  }}
                  contrast
                  value={ingredientName}
                />
              </MDBCol>
              <MDBCol>
                <MDBInput
                  id="recipe-form-grey"
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
                  className="form-unit"
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                  defaultValue="unit"
                >
                  <option value="unit" disabled>
                    Unit
                  </option>
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
                  onClick={submitIngredient}
                >
                  Add Ingredient
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-5">
              <IngredientList></IngredientList>
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
                id="step-two-submit"
                data-next
              >
                Next
              </MDBBtn>
            </MDBRow>
          </div>
          {/* third card */}
          <div className="form-card" data-step>
            <MDBProgress style={{ height: "10px" }}>
              <MDBProgressBar
                striped
                animated
                width="75"
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            <MDBRow className="pt-3 text-white">
              <MDBCol className="d-flex flex-start my-auto">
                <h4 className="text-decoration-underline">Review Recipe</h4>
              </MDBCol>
              <MDBCol className="col-sm-5">
                <p className="review-tip">
                  Tip: to edit any information, click on the section you want to
                  edit and you will be taken to that section of the form.
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="review-recipe p-3 mb-5 mx-1">
              <MDBCol onClick={() => setFormStep(0)}>
                <p className="review-title">Recipe Name:</p>
                <div className="review-recipe-box">{recipeName}</div>
                <p className="review-title">Category:</p>
                <div className="review-recipe-box">{recipeCategory}</div>
                <p className="review-title">Description:</p>
                <div className="review-recipe-box description">
                  {recipeDesc}
                </div>
              </MDBCol>
              <MDBCol
                className="col-sm-8 col-review-table"
                onClick={() => setFormStep(1)}
              >
                <MDBTable>
                  <MDBTableHead className="text-white review-table-head">
                    <tr>
                      <th scope="col" className="col-4">
                        Ingredient
                      </th>
                      <th scope="col" className="col-4">
                        Serving Size
                      </th>
                      <th scope="col">Calories</th>
                      <th scope="col">P/C/F</th>
                      <th scope="col" className="xs-header">
                        Info
                      </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {ingredientList
                      ? ingredientList.map((ingredient, index) => (
                          <IngredientReview
                            ingredient={ingredient}
                            key={index}
                          />
                        ))
                      : null}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
            <MDBRow className="recipe-form-btns">
              <MDBBtn
                outline
                color="light"
                className="border-1 next bg-danger"
                type="button"
                onClick={submitRecipe}
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
          {/* fourth card */}
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
            <MDBRow className="pt-3 text-white">
              <MDBCol className="col-sm-5 mx-auto mt-5">
                <p>
                  Thanks for submitting your recipe! You can view it as well as
                  other submitted recipes <a href="/recipes">here.</a>
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
                Submit another recipe
              </MDBBtn>
            </MDBRow>
          </div>
        </form>
      </MDBContainer>
    </MDBContainer>
  );
}

export default RecipeForm;
