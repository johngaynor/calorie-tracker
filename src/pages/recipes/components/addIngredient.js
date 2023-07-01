import { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";

import firebase from "../../../utilities/firebase";
import styles from "../styles/addIngredient.css";

// recipe is recipe.id
function AddIngredient({ recipe, category }) {
  const [ingredientList, setIngredientList] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    const ingredientRef = firebase
      .database()
      .ref("recipes")
      .child(category)
      .child(recipe)
      .child("ingredients");

    ingredientRef.on("value", (snapshot) => {
      const ingredients = snapshot.val();
      const ingredientList = [];
      for (let id in ingredients) {
        ingredientList.push({ id, ...ingredients[id] });
      }
      setIngredientList(ingredientList);
    });
  }, []);

  const submitIngredient = () => {
    // function to generate a unique ID for the ingredient, copied from stack overflow
    let generatePushID = () => {
      var PUSH_CHARS =
        "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

      var lastPushTime = 0;
      var lastRandChars = [];

      return function () {
        var now = new Date().getTime();
        var duplicateTime = now === lastPushTime;
        lastPushTime = now;

        var timeStampChars = new Array(8);
        for (var i = 7; i >= 0; i--) {
          timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
          now = Math.floor(now / 64);
        }
        if (now !== 0)
          throw new Error("We should have converted the entire timestamp.");

        var id = timeStampChars.join("");

        if (!duplicateTime) {
          for (i = 0; i < 12; i++) {
            lastRandChars[i] = Math.floor(Math.random() * 64);
          }
        } else {
          for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
            lastRandChars[i] = 0;
          }
          lastRandChars[i]++;
        }
        for (i = 0; i < 12; i++) {
          id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
        if (id.length !== 20) throw new Error("Length should be 20.");

        return id;
      };
    };

    const newID = generatePushID()();

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
        id: newID,
        name: name,
        size: size,
        unit: unit,
        cal: cal,
        protein: protein,
        carbs: carbs,
        fat: fat,
        add: true,
      };

      const ingredientRef = firebase
        .database()
        .ref("recipes")
        .child(category)
        .child(recipe);

      // getting the old ingredientList, pushing our new ingredient to it, and then updating it on firebase
      ingredientList.push(newIngredient);
      ingredientRef.update({
        ingredients: ingredientList,
      });

      setName("");
      setSize("");
      setCal("");
      setProtein("");
      setCarbs("");
      setFat("");
    }
  };

  return (
    <MDBContainer className="p-2 add-ingredient-form">
      <h5 className="mt-2">New Ingredient Form</h5>
      <MDBRow className="m-3">
        <MDBCol className="col-lg-8">
          <MDBInput
            id="ingredient-name"
            label="Ingredient Name"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            contrast
          />
        </MDBCol>
        <MDBCol className="d-lg-inline-block d-none">
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
        <MDBCol className="d-lg-inline-block d-none">
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
        <MDBCol className="d-inline-block d-lg-none">
          <MDBInput
            id="ingredient-size"
            type="number"
            label="Serving Size"
            className="grey-box"
            onChange={(e) => {
              setSize(e.target.value);
            }}
            value={size}
            contrast
          />
        </MDBCol>
        <MDBCol className="d-none d-sm-inline-block d-lg-none col-5">
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
      <MDBRow className="m-3 d-sm-none">
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
        <MDBCol className="d-none d-sm-inline-block">
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
        <MDBCol className="d-none d-sm-inline-block">
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
      <MDBRow className="m-3 d-sm-none d-flex">
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
          className="border-1 bg-danger"
          onClick={submitIngredient}
        >
          Add Ingredient
        </MDBBtn>
      </MDBRow>
    </MDBContainer>
  );
}

export default AddIngredient;
