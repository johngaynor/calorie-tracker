import { MDBContainer } from "mdb-react-ui-kit";
import FoodCategoryList from "../../components/foods/foodCategoryList/foodCategoryList";

function Foods() {
  return (
    <MDBContainer fluid>
      <h3 className="p-3 d-flex basic-header justify-content-center">
        Your Foods
      </h3>
      <FoodCategoryList></FoodCategoryList>
    </MDBContainer>
  );
}

export default Foods;
