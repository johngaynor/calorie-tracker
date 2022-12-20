import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import React, { useState } from "react";
import Recipe from "../recipe/recipe";
import styles from "./recipeItem.css";

function RecipeItem({ ingredient }) {
  const [weight, setWeight] = useState(0);
  const removeRecipeItem = () => {
    console.log(ingredient.add);
    ingredient.add = false;
    console.log(ingredient.add);
  };

  const weightOnChange = (e) => {
    setWeight(e.target.value);
    console.log(weight);
    // let foodCal = recipes[0].ingredients[0].cal;
    // let calcCal = weight * foodCal;
    // setWeightCal(calcCal);
  };

  return (
    <tr id="food-display" className={ingredient.add ? "" : "ingredient-remove"}>
      <td>
        <div className="mx-auto" id="food-meal-name-display">
          <p className="fw-bold mb-1" id="food-name-display">
            {ingredient.name}
          </p>
          <p className="text-muted mb-0" id="food-meal-display">
            underline
          </p>
        </div>
      </td>
      <td>
        <input
          id="edit-weight-input"
          type="number"
          className="food-input-boxes"
          onChange={weightOnChange}
          // onKeyDown={weightOnChange}
          // value={weight}
        />
        <p className="text-muted mb-0">in {ingredient.unit}</p>
      </td>
      <td>
        <MDBBadge color="success" pill className="d-flex" id="food-cal-display">
          {ingredient.cal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {ingredient.protein}/{ingredient.carbs}/{ingredient.fat}
      </td>
      <td id="food-log-btns">
        <div>
          <MDBBtn
            color="link"
            rounded
            size="sm"
            onClick={removeRecipeItem}
            // this is just here to set it back to default
          >
            Remove
            {/* this button will not update the page since it's stored locally but this will work on firebase, will change add to include */}
            {/* want to add search bar functionality */}
          </MDBBtn>
        </div>
      </td>
    </tr>
  );
}

export default RecipeItem;
