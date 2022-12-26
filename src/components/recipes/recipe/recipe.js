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
        </MDBTableHead>
        <MDBTableBody>
          {recipe.ingredients
            ? recipe.ingredients.map((ingredient, index) => (
                <RecipeItem
                  ingredient={ingredient}
                  key={index}
                  ingredientIndex={index}
                  recipeID={recipe.id}
                />
              ))
            : ""}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default Recipe;
