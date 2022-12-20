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

function Recipe({ recipe }) {
  return (
    <>
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
        </MDBTableBody>
      </MDBTable>
    </>
  );
}

export default Recipe;
