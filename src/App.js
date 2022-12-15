import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/nav/nav";
import UserForm from "./components/form/form";
import Food from "./components/food/food";
import FoodList from "./components/foodList/foodList";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      {/* <Dashboard></Dashboard> */}
      {/* <h1>Food Log</h1> */}
      <UserForm></UserForm>
      {/* <Food></Food> */}
      <FoodList></FoodList>
    </div>
  );
}

export default App;
