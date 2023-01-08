import { MDBBadge } from "mdb-react-ui-kit";
// import Ingredient from "../../recipes/newRecipe/ingredient/ingredient";
function IngredientReview({ ingredient }) {
  return (
    <tr id="food-display" className="text-white">
      <td>
        <div className="mx-auto" id="food-meal-name-display">
          <p className="fw-bold mb-1" id="food-name-display">
            {ingredient.name}
          </p>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1" id="food-servings-display">
          {ingredient.size}{" "}
          <span className="text-muted">{ingredient.unit}</span>
        </p>
      </td>
      <td>
        <MDBBadge
          color="success"
          pill
          className="d-flex justify-content-center"
        >
          {ingredient.cal}
        </MDBBadge>
      </td>
      <td id="food-macros-display">
        {ingredient.protein}/{ingredient.carbs}/{ingredient.fat}
      </td>
    </tr>
  );
}

export default IngredientReview;
