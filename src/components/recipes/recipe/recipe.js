import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
} from "mdb-react-ui-kit";
import RecipeItem from "../recipeItem/recipeItem";
import firebase from "../../../utilities/firebase";

function Recipe({ recipe }) {
  // console.log(recipe.ingredients);
  let recipeCalTotal = 0;
  let recipeProteinTotal = 0;
  let recipeCarbsTotal = 0;
  let recipeFatTotal = 0;

  // recipe.ingredients.forEach((ingredient) => {
  //   recipeCalTotal = recipeCalTotal + ingredient.userCal;
  // }, []);
  // console.log(recipeCalTotal);

  const pushRecipe = () => {
    const recipeRef = firebase.database().ref("recipes");
    const recipe = {
      name: "hello",
    };
    recipeRef.push(recipe);
  };

  return (
    <MDBContainer fluid className="user-form mb-5">
      <h1>{recipe.name}</h1>
      <MDBTable align="middle" className="w-100 mx-auto text-white">
        <MDBTableHead>
          <tr>
            <th scope="col" className="col-4">
              Food
            </th>
            <th scope="col">Weight</th>
            <th scope="col">Calories</th>
            <th scope="col">P/C/F</th>
            <th scope="col" className="col-2">
              Actions
            </th>
          </tr>
          {/* each food will store a serving size */}
          {/* hover over each item to view database info? Click on it to change it? That would be cool */}
        </MDBTableHead>
        <MDBTableBody>
          {recipe.ingredients
            ? recipe.ingredients.map((ingredient, index) => (
                <RecipeItem ingredient={ingredient} key={index} />
              ))
            : ""}
          <tr
            id="food-display"
            // className={ingredient.add ? "" : "ingredient-remove"}
          >
            <td>
              <div className="mx-auto" id="food-meal-name-display">
                <p className="fw-bold mb-1" id="food-name-display">
                  TOTAL
                </p>
              </div>
            </td>
            <td></td>
            <td>
              <MDBBadge
                color="success"
                pill
                className="d-flex"
                id="food-cal-display"
              >
                {recipeCalTotal}
              </MDBBadge>
            </td>
            <td id="food-macros-display">
              {/* {calcProtein}/{calcCarbs}/{calcFat} */}
            </td>
            <td id="food-log-btns">
              <div>
                <MDBBtn color="link" rounded size="sm" onClick={pushRecipe}>
                  Push
                </MDBBtn>
              </div>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default Recipe;

// when clicking an "add" button it will create a new object in user items
