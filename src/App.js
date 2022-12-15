import "./App.css";
import Navigation from "./components/nav/nav";
import UserForm from "./components/form/form";
import Food from "./components/food/food";
import FoodList from "./components/foodList/foodList";
import Dashboard from "./components/dashboard/dashboard";
import MacroCalc from "./components/macroCalc/macroCalc";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <MacroCalc></MacroCalc>
      {/* <Dashboard></Dashboard> */}
      {/* <h1>Food Log</h1> */}
      <UserForm></UserForm>
      {/* <Food></Food> */}
      <FoodList></FoodList>
    </div>
  );
}

export default App;
