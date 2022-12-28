import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";

// recipe is recipe.id
function AddIngredient({ recipe }) {
  const [ingredientList, setIngredientList] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const addIngredientRef = firebase
    .database()
    .ref("recipes")
    .child(recipe)
    .child("ingredients");

  useEffect(() => {
    addIngredientRef.on("value", (snapshot) => {
      const ingredients = snapshot.val();
      const ingredientList = [];
      for (let id in ingredients) {
        ingredientList.push({ id, ...ingredients[id] });
      }

      setIngredientList(ingredientList);
    });
  }, []);

  const submitIngredient = () => {
    if (
      name === "" ||
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
        name: name,
        size: size,
        unit: unit,
        cal: cal,
        protein: protein,
        carbs: carbs,
        fat: fat,
        add: true,
      };

      //   updating ingredientList locally before updating the useState and pushing to firebase
      ingredientList.push(newIngredient);
      setIngredientList(ingredientList);
      addIngredientRef.set(ingredientList);

      setName("");
      setSize("");
      setCal("");
      setProtein("");
      setCarbs("");
      setFat("");
    }
  };

  return (
    <MDBContainer
      className="p-2 add-ingredient-form bg-danger
      "
    >
      <h5 className="mt-2">New Ingredient Form</h5>
      <MDBRow className="m-3">
        <MDBCol className="col-8">
          <MDBInput
            className="add-name"
            label="Ingredient Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            contrast
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
            onChange={(e) => {
              setUnit(e.target.value);
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
            onChange={(e) => {
              setCarbs(e.target.value);
            }}
            value={carbs}
            contrast
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
            contrast
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="m-4">
        <MDBBtn
          outline
          color="light"
          className="border-1"
          onClick={submitIngredient}
        >
          Add Ingredient
        </MDBBtn>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddIngredient;
