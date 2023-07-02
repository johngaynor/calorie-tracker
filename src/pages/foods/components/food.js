import React, { useState, useEffect, useContext } from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faInfoCircle,
  faTrashCan,
  faXmarkCircle,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import firebase from "../../../utilities/firebase";
import { AuthContext } from "../../../utilities/auth/authContext";
import styles from "../styles/food.css";

function Food({ food }) {
  const [weight, setWeight] = useState("");
  const [calcCal, setCalcCal] = useState(0);
  const [calcProtein, setCalcProtein] = useState(0);
  const [calcCarbs, setCalcCarbs] = useState(0);
  const [calcFat, setCalcFat] = useState(0);

  const { currentUser } = useContext(AuthContext);

  // console.log(food);

  // these are for delete/log functionality
  const [removeFood, setRemoveFood] = useState(false);
  const [addLog, setAddLog] = useState(false);

  // updates calculated macros
  useEffect(() => {
    let calcCal = ((weight * food.cal) / food.servingSize).toFixed(0);
    let calcProtein = ((weight * food.protein) / food.servingSize).toFixed(0);
    let calcCarbs = ((weight * food.carbs) / food.servingSize).toFixed(0);
    let calcFat = ((weight * food.fat) / food.servingSize).toFixed(0);

    setCalcCal(calcCal);
    setCalcProtein(calcProtein);
    setCalcCarbs(calcCarbs);
    setCalcFat(calcFat);

    // I want to figure out how to show just 0 instead of 0.0
  }, [weight]);

  // toggles food btn styling
  useEffect(() => {
    const deleteBtn = document.getElementById("food-delete-icon");
    if (removeFood) {
      deleteBtn.classList.add("active-btn");
    } else {
      deleteBtn.classList.remove("active-btn");
    }

    const addBtn = document.getElementById("food-add-icon");
    if (addLog) {
      addBtn.classList.add("active-btn");
    } else {
      addBtn.classList.remove("active-btn");
    }
  });

  const alertFoodInfo = () => {
    window.confirm(`
    Name: ${food.name}
    Category: ${food.category}
    Serving Size: ${food.servingSize} ${food.unit}
    Calories (per serving): ${food.cal}
    Protein (per serving): ${food.protein}
    Carbs (per serving): ${food.carbs}
    Fat (per serving): ${food.fat}
    `);
  };

  const deleteFood = () => {
    const foodRef = firebase
      .database()
      .ref("foods")
      .child(`${food.category}`)
      .child(food.id);

    foodRef.remove();
    setRemoveFood(false);
  };

  const submitFood = () => {
    if (weight === "") {
      alert("Please add weight before submitting to your log.");
    } else if (weight === "0") {
      alert("Weight must be greater than 0 before submitting to your log.");
    } else {
      const newFood = {
        name: food.name,
        cal: calcCal,
        protein: calcProtein,
        carbs: calcCarbs,
        fat: calcFat,
      };
      const logRef = firebase.database().ref("user-log");
      logRef.push(newFood);
      alert("Added to log!");
      setWeight("");
      setAddLog(false);
      setRemoveFood(false);
    }
  };

  return (
    <tr id="food-display">
      <td>
        <div className="mx-auto" id="food-meal-name-display">
          <p className="fw-bold mb-1" id="food-name-display">
            {food.name}
          </p>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="food-info"
            onClick={alertFoodInfo}
          />
          <input
            id="edit-weight-input"
            type="number"
            className="food-input-boxes d-sm-none d-block mx-auto mt-2"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
            placeholder="0"
          />
          <p className="text-muted mb-2 d-sm-none">in {food.unit}</p>
        </div>
        {/* this area is for smaller buttons */}
        <div id="food-log-btns" className="p-2 d-md-none">
          <div className="d-flex justify-content-around mx-auto">
            <FontAwesomeIcon
              icon={faUpload}
              className={`food-icons ${currentUser ? "" : "disabled"}`}
              id="food-add-icon"
              onClick={() => setAddLog(true)}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className={`food-icons ${currentUser ? "" : "disabled"}`}
              id="food-delete-icon"
              onClick={() => setRemoveFood(true)}
            />
          </div>
          {removeFood ? (
            <div className="mt-2 delete-btn-container mx-auto">
              <p>delete food?</p>
              <div>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="delete-btns cancel"
                  onClick={() => setRemoveFood(false)}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="delete-btns confirm"
                  onClick={deleteFood}
                />
              </div>
            </div>
          ) : null}
          {addLog ? (
            <div className="mt-2 delete-btn-container mx-auto">
              <p>add to log?</p>
              <div>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="delete-btns cancel"
                  onClick={() => setAddLog(false)}
                />
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="delete-btns confirm"
                  onClick={submitFood}
                />
              </div>
            </div>
          ) : null}
        </div>
      </td>
      <td className="d-none d-sm-table-cell">
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
      <td className="d-none d-lg-table-cell">
        <MDBRow className="calc-macros mb-3">
          <MDBCol>
            <p className="w-100 my-0">Cal</p>
            <span className="cal mx-auto">{calcCal}</span>
          </MDBCol>
        </MDBRow>
      </td>
      <td id="food-macros-display">
        <MDBRow className="calc-macros d-flex justify-content-center mb-3">
          <MDBRow className="d-lg-none mb-2">
            <p className="w-100 my-0">Cal</p>
            <span className="cal mx-auto">{calcCal}</span>
          </MDBRow>
          <MDBRow className="justify-content-center d-none d-sm-flex">
            <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center">
              <p className="w-100 my-0 mx-1">P</p>
              <span className="protein">{calcProtein}</span>
            </MDBCol>
            <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center mx-xl-1 mx-2">
              <p className="w-100 my-0 mx-1">C</p>
              <span className="carbs">{calcCarbs}</span>
            </MDBCol>
            <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center">
              <p className="w-100 my-0 mx-1">F</p>
              <span className="fat">{calcFat}</span>
            </MDBCol>
          </MDBRow>
          <p className="w-100 my-0 mx-1 d-sm-none">P</p>
          <span className="protein bigger d-sm-none">{calcProtein}</span>

          <p className="w-100 my-0 mx-1 d-sm-none">C</p>
          <span className="carbs bigger d-sm-none">{calcCarbs}</span>

          <p className="w-100 my-0 mx-1 d-sm-none">F</p>
          <span className="fat bigger d-sm-none">{calcFat}</span>
        </MDBRow>
      </td>
      <td id="food-log-btns" className="d-none d-md-table-cell">
        <div className="d-flex justify-content-around mx-auto">
          <FontAwesomeIcon
            icon={faUpload}
            className={`food-icons ${currentUser ? "" : "disabled"}`}
            id="food-add-icon"
            onClick={() => setAddLog(true)}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className={`food-icons ${currentUser ? "" : "disabled"}`}
            id="food-delete-icon"
            onClick={() => setRemoveFood(true)}
          />
        </div>
        {removeFood ? (
          <div className="mt-2 delete-btn-container mx-auto">
            <p>delete food?</p>
            <div>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="delete-btns cancel"
                onClick={() => setRemoveFood(false)}
              />
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="delete-btns confirm"
                onClick={deleteFood}
              />
            </div>
          </div>
        ) : null}
        {addLog ? (
          <div className="mt-2 delete-btn-container mx-auto">
            <p>add to log?</p>
            <div>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="delete-btns cancel"
                onClick={() => setAddLog(false)}
              />
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="delete-btns confirm"
                onClick={submitFood}
              />
            </div>
          </div>
        ) : null}
      </td>
    </tr>
  );
}

export default Food;
