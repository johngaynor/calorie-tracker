import { MDBRow, MDBCol } from "mdb-react-ui-kit";

import styles from "./styles/ingredientReview.css";

function IngredientReview({ ingredient }) {
  return (
    <tr id="food-display" className="text-white">
      <td>
        <div
          className="mx-auto mt-lg-5 mt-sm-3 mt-5 pt-3 pt-sm-1"
          id="food-meal-name-display"
        >
          <p className="fw-bold mb-1" id="food-name-display">
            {ingredient.name}
          </p>
          <div className="my-2 d-lg-none ingredient-serving-box">
            <p>Serving Size:</p>
            <p className="serving-box-text">
              {ingredient.size}{" "}
              <span className="text-muted">{ingredient.unit}</span>
            </p>
          </div>
        </div>
      </td>
      <td className="d-none d-lg-table-cell">
        <p className="mt-5 pt-1">
          {ingredient.size}{" "}
          <span className="text-muted">{ingredient.unit}</span>
        </p>
      </td>

      <td>
        <MDBRow className="calc-macros d-flex justify-content-center mb-3">
          <MDBRow className="mb-2">
            <p className="w-100 my-0">Cal</p>
            <span className="cal mx-auto">{ingredient.cal}</span>
          </MDBRow>
          <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center d-none d-sm-flex">
            <p className="w-100 my-0 mx-1">P</p>
            <span className="protein">{ingredient.protein}</span>
          </MDBCol>
          <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center mx-xl-1 mx-2 d-none d-sm-flex">
            <p className="w-100 my-0 mx-1">C</p>
            <span className="carbs">{ingredient.carbs}</span>
          </MDBCol>
          <MDBCol className="col-xl-2 col-3 d-flex flex-column align-items-center d-none d-sm-flex">
            <p className="w-100 my-0 mx-1">F</p>
            <span className="fat">{ingredient.fat}</span>
          </MDBCol>
          <p className="w-100 m-1 d-sm-none">P</p>
          <span className="protein bigger d-sm-none">{ingredient.protein}</span>

          <p className="w-100 m-1 d-sm-none">C</p>
          <span className="carbs bigger d-sm-none">{ingredient.carbs}</span>

          <p className="w-100 m-1 d-sm-none">F</p>
          <span className="fat bigger d-sm-none">{ingredient.fat}</span>
        </MDBRow>
      </td>
    </tr>
  );
}

export default IngredientReview;
