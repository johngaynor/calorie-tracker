import "./App.css";
import Navigation from "./components/nav/nav";
import Dashboard from "./pages/dashboard/dashboard";
import Foods from "./pages/foods/foods";
import Recipes from "./pages/recipes/recipes";
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
    </div>
  );
}

export default App;
