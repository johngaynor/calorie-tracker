import Recipe from "../../components/recipes/recipe/recipe";
import RecipeHolder from "../../components/recipes/recipeList/recipeList";
import RecipeForm from "../../components/recipes/recipeForm/recipeForm";

function Recipes() {
  return (
    <>
      <RecipeForm></RecipeForm>
      <RecipeHolder></RecipeHolder>
    </>
  );
}

export default Recipes;
