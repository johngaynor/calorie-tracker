import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import styles from "./form.css";

function UserForm() {
  const [meal, setMeal] = useState("");
  const [name, setName] = useState("");
  const [servings, setServings] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const mealOnChange = (e) => {
    setMeal(e.target.value);
  };

  const nameOnChange = (e) => {
    setName(e.target.value);
  };

  const servingsOnChange = (e) => {
    setServings(e.target.value);
  };

  const calOnChange = (e) => {
    setCal(e.target.value);
  };

  const proteinOnChange = (e) => {
    setProtein(e.target.value);
  };

  const carbsOnChange = (e) => {
    setCarbs(e.target.value);
  };

  const fatOnChange = (e) => {
    setFat(e.target.value);
  };

  const createFood = (e) => {
    // making sure all form values are filled
    if (
      meal === "Select Meal" ||
      meal === "" ||
      servings === "" ||
      name === "" ||
      cal === "" ||
      protein === "" ||
      carbs === "" ||
      fat === ""
    ) {
      alert("please fill all fields before submitting.");
    } else {
      const foodRef = firebase.database().ref("crud-final");
      const food = {
        meal,
        name,
        servings,
        cal,
        protein,
        carbs,
        fat,
      };

      // console.log(food);
      foodRef.push(food);

      // setMeal("");
      setName("");
      setServings("");
      setCal("");
      setProtein("");
      setCarbs("");
      setFat("");
    }

    // for some reason the box will reset for all of them except the one the user last entered *if* their next click was the submit button
  };

  return (
    <MDBContainer className="p-2 user-form">
      <MDBRow className="m-3 d-flex align-items-center">
        <MDBCol>
          <Form.Select
            aria-label="Default select"
            size="md"
            className="form-meal"
            onChange={mealOnChange}
          >
            <option>Select Meal</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </Form.Select>
        </MDBCol>
        <MDBCol>
          <MDBInput
            id="input-name"
            label="Food"
            type="text"
            onChange={nameOnChange}
            value={name}
            contrast
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id="input-servings"
            label="servings"
            type="number"
            onChange={servingsOnChange}
            value={servings}
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
            onChange={calOnChange}
            value={cal}
            contrast
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id="input-protein"
            type="number"
            label="Protein"
            onChange={proteinOnChange}
            value={protein}
            contrast
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id="input-carbs"
            type="number"
            label="Carbs"
            onChange={carbsOnChange}
            value={carbs}
            contrast
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id="input-fat"
            type="number"
            label="Fat"
            onChange={fatOnChange}
            value={fat}
            contrast
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBBtn
          outline
          color="light"
          className="w-75 mx-auto border-1"
          onClick={createFood}
        >
          Submit
        </MDBBtn>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserForm;
