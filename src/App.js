import "./App.css";
import Navigation from "./components/nav/nav";
import UserForm from "./components/form/form";
import Food from "./components/food/food";
import FoodList from "./components/foodList/foodList";
import Dashboard from "./components/dashboard/dashboard";
import Recipes from "./components/recipes/recipes";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Recipes></Recipes>
      {/* <h1>Food Log</h1> */}
      <UserForm></UserForm>
      <FoodList></FoodList>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
