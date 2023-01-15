import { MDBContainer } from "mdb-react-ui-kit";
import RecipeCategoryList from "../../components/recipes/recipeCategoryList/recipeCategoryList";

function Recipes() {
  return (
    <MDBContainer fluid>
      <h2 className="p-3 d-flex basic-header justify-content-center">
        Your Recipes
      </h2>
      <RecipeCategoryList></RecipeCategoryList>
    </MDBContainer>
  );
}

export default Recipes;
