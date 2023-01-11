import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { Container } from "react-bootstrap";
import firebase from "../../../utilities/firebase";
import styles from "./food.css";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";

function Food({ food }) {
  const [weight, setWeight] = useState("");
  const [calcCal, setCalcCal] = useState(0);
  const [calcProtein, setCalcProtein] = useState(0);
  const [calcCarbs, setCalcCarbs] = useState(0);
  const [calcFat, setCalcFat] = useState(0);

  // updates calculated macros
  useEffect(() => {
    let calcCal = ((weight * food.cal) / food.servingSize).toFixed(0);
    let calcProtein = ((weight * food.protein) / food.servingSize).toFixed(1);
    let calcCarbs = ((weight * food.carbs) / food.servingSize).toFixed(1);
    let calcFat = ((weight * food.fat) / food.servingSize).toFixed(1);

    setCalcCal(calcCal);
    setCalcProtein(calcProtein);
    setCalcCarbs(calcCarbs);
    setCalcFat(calcFat);

    // I want to figure out how to show just 0 instead of 0.0
  }, [weight]);

  // const deleteFood = () => {
  //   const foodRef = firebase.database().ref("foods").child(food.id);

  //   foodRef.remove();
  // };

  return (
    <tr id="food-display">
      <td>
        <div className="mx-auto" id="food-meal-name-display">
          <p className="fw-bold mb-1" id="food-name-display">
            {food.name}
          </p>
        </div>
      </td>
      <td>
        <input
          id="edit-weight-input"
          type="number"
          className="food-input-boxes"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          placeholder="0"
        />
        <p className="text-muted mb-0">in {food.unit}</p>
      </td>
      <td>
        <MDBBadge color="success" pill className="cal-pill">
          {calcCal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {calcProtein}/{calcCarbs}/{calcFat}
      </td>
      <td id="food-log-btns">
        <div className="d-flex">
          <MDBBtn
            color="link"
            rounded
            size="sm"
            // onClick={updateFood}
          >
            ADD TO LOG
          </MDBBtn>
          <MDBBtn
            color="link"
            rounded
            size="sm"
            //  onClick={deleteFood}
          >
            Delete
          </MDBBtn>
        </div>
      </td>
    </tr>
  );
}

export default Food;

// edit notes

//   //////////////////////////////////////

// changing meal -> will come back to this later
//   const foodMealContent = document.getElementById("food-meal-display");
//   foodMealContent.innerHTML = ``;

//   const foodNameMealContent = document.getElementById(
//     "food-meal-name-display"
//   );
//   foodNameMealContent.append(`<Form.Select
//   aria-label="Default select"
//   size="md"
//   className=""
//   onChange={mealOnChange}
// >
//   <option>Select Meal</option>
//   <option value="breakfast">Breakfast</option>
//   <option value="lunch">Lunch</option>
//   <option value="dinner">Dinner</option>
//   <option value="snack">Snack</option>
// </Form.Select>`);

//   //////////////////////////////////////
