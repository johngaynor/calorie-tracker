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

// function Food({ food }) {
//   const completeFood = () => {
//     const foodRef = firebase
//       .database()
//       .ref("crud-calorie-tracker")
//       .child(food.id);

//     foodRef.update({
//       // complete: !recipe.complete,
//     });
//   };
// }

function Food({ food }) {
  const [updateFood, setUpdateFood] = useState(-1);
  const [foods, setFoods] = useState(food);
  // hooks for updating the food
  const [name, setName] = useState("");
  const [servings, setServings] = useState("");
  const [cal, setCal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const deleteFood = () => {
    const foodRef = firebase.database().ref("crud-final").child(food.id);

    foodRef.remove();
  };

  // const editFood = (id) => {
  //   // console.log(id);
  //   // setUpdateFood(id);
  //   editFoodBtns(id);
  // };

  const editFood = (id) => {
    setUpdateFood(id);
    console.log("running editFoodBtns for id: " + id);

    // working with setting values ///////
    const nameOnChange = (e) => {
      setName(e.target.value);
    };

    const servingsOnChange = (e) => {
      setServings(e.target.value);
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
    //////////////////////////////////////
    // changing cal
    // const foodCalContent = document.getElementById("food-cal-display");
    // foodCalContent.innerHTML = `<input id="edit-cal-input" type="number" class="food-input-boxes" placeholder=${food.cal} onChange={calOnChange} />`;

    function insertCool() {
      console.log("working");
    }

    const calOnChange = (e) => {
      setCal(e.target.value);
      console.log("it's working");
    };

    const foodCalContent = document.getElementById("food-cal-display");
    foodCalContent.innerHTML = `<input id="edit-cal-input" type="number" class="food-input-boxes" placeholder=${food.cal} onChange={calOnChange}
     />`;

    // changing name
    const foodNameContent = document.getElementById("food-name-display");
    foodNameContent.innerHTML = `<input id="edit-name-input" type="text" class="food-input-boxes" placeholder=${food.name} />`;

    // changing servings
    const foodServingsContent = document.getElementById(
      "food-servings-display"
    );
    foodServingsContent.innerHTML = `<input id="edit-servings-input" type="number" class="food-input-boxes" placeholder=${food.servings} />`;

    // changing P/C/F
    const foodMacrosContent = document.getElementById("food-macros-display");
    foodMacrosContent.innerHTML = `
    <div>
    <input id="edit-protein-input" type="number" class="food-input-boxes" placeholder=${food.protein} /> / 
    <input id="edit-carbs-input" type="number" class="food-input-boxes" placeholder=${food.carbs} /> / 
    <input id="edit-fat-input" type="number" class="food-input-boxes" placeholder=${food.fat} />
    </div>
    `;
  };

  const SubmitEditedFood = () => {
    // const mealOnChange = (e) => {
    //   setMeal(e.target.value);
    // };

    // const nameOnChange = (e) => {
    //   setName(e.target.value);
    // };

    // const servingsOnChange = (e) => {
    //   setServings(e.target.value);
    // };

    // const calOnChange = (e) => {
    //   setCal(e.target.value);
    // };

    // const proteinOnChange = (e) => {
    //   setProtein(e.target.value);
    // };

    // const carbsOnChange = (e) => {
    //   setCarbs(e.target.value);
    // };

    // const fatOnChange = (e) => {
    //   setFat(e.target.value);
    // };

    const foodRef = firebase.database().ref("crud-final");
    const food = {
      name,
      servings,
      cal,
      protein,
      carbs,
      fat,
    };

    foodRef.push(food);
  };

  // if value === "" (the user didn't put anything in), setValue = food.(insert objectItem)

  return (
    <tr id="food-display">
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
        {/* <p className="text-muted mb-0">/size</p> */}
      </td>
      <td>
        <MDBBadge color="success" pill className="d-flex" id="food-cal-display">
          {food.cal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {food.protein}/{food.carbs}/{food.fat}
      </td>
      <td id="food-log-btns">
        {updateFood === food.id ? (
          <MDBBtn
            color="link"
            rounded
            size="sm"
            onClick={() => SubmitEditedFood()}
          >
            Submit
          </MDBBtn>
        ) : (
          <div>
            <MDBBtn
              color="link"
              rounded
              size="sm"
              onClick={() => editFood(food.id)}
            >
              Edit
            </MDBBtn>
            <MDBBtn color="link" rounded size="sm" onClick={deleteFood}>
              Delete
            </MDBBtn>
          </div>
        )}
      </td>
    </tr>
  );
}

export default Food;

// edit notes

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
