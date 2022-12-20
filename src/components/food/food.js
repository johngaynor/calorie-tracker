import React, { useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container } from "react-bootstrap";
import firebase from "../../utilities/firebase";
import styles from "./food.css";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";

function Food({ food }) {
  const [isEditing, setIsEditing] = useState(false);
  // this area is for updating the food
  const [name, setName] = useState();
  // const [servings, setServings] = useState();
  const [cal, setCal] = useState();
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();

  const deleteFood = () => {
    const foodRef = firebase.database().ref("crud-final").child(food.id);

    foodRef.remove();
  };

  const updateFood = () => {
    const foodRef = firebase.database().ref("crud-final").child(food.id);

    foodRef.update({
      complete: !food.complete,
    });
  };

  // these are the form listeners
  const nameOnChange = (e) => {
    setName(e.target.value);
    // console.log(newName);
  };

  // const servingsOnChange = (e) => {
  //   setServings(e.target.value);
  // };

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

  const updateEditFood = () => {
    setIsEditing(false);
    const foodRef = firebase.database().ref("crud-final").child(food.id);

    if (name === "") {
    }
    foodRef.update({
      name: name,
      // servings: servings,
      cal: cal,
      protein: protein,
      carbs: carbs,
      fat: fat,
    });

    console.log("UPDATED FOOD");
    // still need to work out updating bugs
  };

  return (
    <MDBTableBody>
      {isEditing ? (
        <tr id="food-display">
          <td>
            <div className="mx-auto" id="food-meal-name-display">
              <input
                id="edit-name-input"
                type="text"
                className="food-input-boxes"
                placeholder={food.name}
                value={food.name}
                onChange={nameOnChange}
              />
              <p className="text-muted mb-0" id="food-meal-display">
                {food.meal}
              </p>
            </div>
          </td>
          <td>
            {/* <input
              id="edit-servings-input"
              type="number"
              className="food-input-boxes"
              placeholder={food.servings}
              value={food.servings}
              onChange={servingsOnChange}
            /> */}
            <p className="text-muted mb-0">/size</p>
          </td>
          <td>
            <input
              id="edit-cal-input"
              type="number"
              className="food-input-boxes"
              placeholder={food.cal}
              value={food.cal}
              onChange={calOnChange}
            />
          </td>
          <td id="food-macros-display">
            <div>
              <input
                id="edit-protein-input"
                type="number"
                className="food-input-boxes"
                placeholder={food.protein}
                value={food.protein}
                onChange={proteinOnChange}
              />{" "}
              /
              <input
                id="edit-carbs-input"
                type="number"
                className="food-input-boxes"
                placeholder={food.carbs}
                value={food.carbs}
                onChange={carbsOnChange}
              />{" "}
              /
              <input
                id="edit-fat-input"
                type="number"
                className="food-input-boxes"
                placeholder={food.fat}
                value={food.fat}
                onChange={fatOnChange}
              />
            </div>
          </td>
          <td id="food-log-btns">
            <div>
              <MDBBtn color="link" rounded size="sm" onClick={deleteFood}>
                Delete
              </MDBBtn>
              <MDBBtn
                color="link"
                rounded
                size="sm"
                onClick={updateEditFood}
                // this is just here to set it back to default
              >
                Submit
              </MDBBtn>
            </div>
          </td>
        </tr>
      ) : (
        <tr id="food-display" className={food.complete ? "complete" : ""}>
          <td>
            <div className="mx-auto" id="food-meal-name-display">
              <p className="fw-bold mb-1" id="food-name-display">
                {food.name}
              </p>
              <p className="text-muted mb-0" id="food-meal-display">
                {food.meal}
              </p>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1" id="food-servings-display">
              {food.servings}
            </p>
            <p className="text-muted mb-0">/size</p>
          </td>
          <td>
            <MDBBadge
              color="success"
              pill
              className="d-flex"
              id="food-cal-display"
            >
              {food.cal}
            </MDBBadge>
          </td>
          <td id="food-macros-display">
            {food.protein}/{food.carbs}/{food.fat}
          </td>
          <td id="food-log-btns">
            <div>
              <MDBBtn color="link" rounded size="sm" onClick={updateFood}>
                ADD TO LOG
              </MDBBtn>
              <MDBBtn color="link" rounded size="sm" onClick={deleteFood}>
                Delete
              </MDBBtn>
              <MDBBtn
                color="link"
                rounded
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </MDBBtn>
            </div>
          </td>
        </tr>
      )}
    </MDBTableBody>
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
