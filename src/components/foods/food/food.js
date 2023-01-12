import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import {
  faCheckCircle,
  faInfoCircle,
  faShoppingBag,
  faShoppingBasket,
  faTrashCan,
  faWindowClose,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "../../../utilities/firebase";
import styles from "./food.css";

function Food({ food }) {
  const [weight, setWeight] = useState("");
  const [calcCal, setCalcCal] = useState(0);
  const [calcProtein, setCalcProtein] = useState(0);
  const [calcCarbs, setCalcCarbs] = useState(0);
  const [calcFat, setCalcFat] = useState(0);

  // these are for delete/log functionality
  const [deleteRecipe, setDeleteRecipe] = useState(false);
  const [addLog, setAddLog] = useState(false);

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

  // toggles food btn styling
  useEffect(() => {
    const deleteBtn = document.getElementById("food-delete-icon");
    if (deleteRecipe) {
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
    // might want to come up with something better for this, maybe hover?
  };

  const deleteFood = () => {
    const foodRef = firebase
      .database()
      .ref("foods")
      .child(`${food.category}`)
      .child(food.id);

    foodRef.remove();
    window.location.reload();
    // can't think of a better way to get this to reload, need to update foodList in "foodList.js" but can't access that useEffect from here
  };

  const submitFood = () => {
    if (weight === "" || "0") {
      alert("please add weight before submitting to your log.");
    } else {
      setAddLog(false);
      setDeleteRecipe(false);
      alert("tried to submit food");
      // not sure if I want to refresh the page or just clear it out, probably just set setWeight to 0
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
        </div>
        <td id="food-log-btns" className="p-2 only-xxs">
          <div className="d-flex justify-content-around mx-auto">
            <FontAwesomeIcon
              icon={faShoppingBasket}
              className="food-icons"
              id="food-add-icon"
              onClick={() => setAddLog(true)}
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className="food-icons"
              id="food-delete-icon"
              onClick={() => setDeleteRecipe(true)}
            />
          </div>
          {deleteRecipe ? (
            <div className="mt-2 delete-btn-container mx-auto">
              <p>delete food?</p>
              <div>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="delete-btns cancel"
                  onClick={() => setDeleteRecipe(false)}
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
        <div className="only-xs">
          <p>Cal: {calcCal}</p>
          <p>P: {calcProtein}</p>
          <p>C: {calcCarbs}</p>
          <p>F: {calcFat}</p>
        </div>
      </td>
      <td className="only-md">
        <p>Cal: {calcCal}</p>
        <p>P: {calcProtein}</p>
        <p>C: {calcCarbs}</p>
        <p>F: {calcFat}</p>
      </td>
      <td>
        <MDBBadge
          color="success"
          pill
          className="cal-pill d-flex justify-content-center align-items-center mx-auto"
        >
          {calcCal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {calcProtein}/{calcCarbs}/{calcFat}
      </td>
      <td id="food-log-btns">
        <div className="d-flex justify-content-around mx-auto">
          <FontAwesomeIcon
            icon={faShoppingBasket}
            className="food-icons"
            id="food-add-icon"
            onClick={() => setAddLog(true)}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className="food-icons"
            id="food-delete-icon"
            onClick={() => setDeleteRecipe(true)}
          />
        </div>
        {deleteRecipe ? (
          <div className="mt-2 delete-btn-container mx-auto">
            <p>delete food?</p>
            <div>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="delete-btns cancel"
                onClick={() => setDeleteRecipe(false)}
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
