import "./App.css";
import Navigation from "./components/nav/nav";
import UserForm from "./components/foods/form/form";
// import Food from "./components/foods/food/food";
// import FoodList from "./components/foods/foodList/foodList";
import Dashboard from "./pages/dashboard/dashboard";
import Foods from "./pages/foods/foods";
import Recipes from "./components/recipes/recipes";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/foods" element={<Foods />} />
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
