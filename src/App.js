import "./App.css";
import Navigation from "./components/nav/nav";
import UserForm from "./components/form/form";
import Food from "./components/food/food";
import FoodList from "./components/foodList/foodList";
import Dashboard from "./components/dashboard/dashboard";
// import MacroCalcNav from "./components/macroCalcNav/macroCalcNav";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      {/* <h1>Food Log</h1> */}
      <UserForm></UserForm>
      <FoodList></FoodList>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
