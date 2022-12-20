import "./App.css";
import Navigation from "./components/nav/nav";
import UserForm from "./components/form/form";
import Food from "./components/food/food";
import FoodList from "./components/foodList/foodList";
import Dashboard from "./components/dashboard/dashboard";
import Recipes from "./components/recipes/recipes";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>

      {/* <div className="App">
        <Navigation></Navigation>
        <Recipes></Recipes>
        <h1>Food Log</h1>
        <UserForm></UserForm>
        <FoodList></FoodList>
        <Dashboard></Dashboard>
      </div> */}
    </div>
  );
}

export default App;
