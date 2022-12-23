import { MDBBadge, MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Recipes from "../../../pages/recipes/recipes";
import Recipe from "../recipe/recipe";
import styles from "./recipeItem.css";

function RecipeItem({ ingredient }) {
  const [weight, setWeight] = useState("");
  const [calcCal, setCalcCal] = useState(0);
  const [calcProtein, setCalcProtein] = useState(0);
  const [calcCarbs, setCalcCarbs] = useState(0);
  const [calcFat, setCalcFat] = useState(0);

  // removing item from cart
  const removeRecipeItem = () => {
    console.log("removed ingredient but it's not actually working yet");
    // console.log(ingredient.add);
    // ingredient.add = false;
    // console.log(ingredient.add);
  };

  useEffect(() => {
    let calcCal = (weight * ingredient.cal).toFixed(0);
    let calcProtein = (weight * ingredient.protein).toFixed(1);
    let calcCarbs = (weight * ingredient.carbs).toFixed(1);
    let calcFat = (weight * ingredient.fat).toFixed(1);

    setCalcCal(calcCal);
    setCalcProtein(calcProtein);
    setCalcCarbs(calcCarbs);
    setCalcFat(calcFat);

    // ingredient.update({
    //   userCal: calcCal,
    //   userProtein: calcProtein,
    //   userCarbs: calcCarbs,
    //   userFat: calcFat,
    // });

    // I want to figure out how to show just 0 instead of 0.0
  }, [weight]);

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
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          placeholder="0"
        />
        <p className="text-muted mb-0">in {ingredient.unit}</p>
      </td>
      <td>
        <MDBBadge color="success" pill className="d-flex" id="food-cal-display">
          {calcCal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {calcProtein}/{calcCarbs}/{calcFat}
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
            {/* want to add search bar functionality for recipes */}
          </MDBBtn>
        </div>
      </td>
    </tr>
  );
}

export default RecipeItem;
