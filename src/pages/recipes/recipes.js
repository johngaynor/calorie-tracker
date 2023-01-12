import { MDBContainer } from "mdb-react-ui-kit";
import RecipeCategoryList from "../../components/recipes/recipeCategoryList/recipeCategoryList";

function Recipes() {
  return (
    <MDBContainer fluid>
      <h3 className="p-3 d-flex basic-header justify-content-center">
        Your Recipes
      </h3>
      <RecipeCategoryList></RecipeCategoryList>
    </MDBContainer>
  );
}

export default Recipes;
