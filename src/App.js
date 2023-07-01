import "./App.css";
import Navigation from "./components/nav/nav";
import Footer from "./components/footer/footer";
import Dashboard from "./pages/dashboard";
import Foods from "./pages/foods";
import NewFood from "./pages/newFood/newFood";
import Recipes from "./pages/recipes";
import NewRecipe from "./pages/newRecipe/newRecipe";
import { Route, Routes } from "react-router";
import Login from "./components/login/login";
import { AuthProvider } from "./utilities/auth/authContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navigation></Navigation>
        <Login></Login>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/new-food" element={<NewFood />} />
          <Route path="/new-recipe" element={<NewRecipe />} />
        </Routes>
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;

// want to add search bar functionality for recipes
// hover over each item to view database info? Click on it to change it? That would be cool

// todo 12/27: look at better functionality
