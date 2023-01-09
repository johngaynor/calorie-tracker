import { MDBContainer } from "mdb-react-ui-kit";
import Form from "../../components/foods/foodForm/foodForm";
import FoodList from "../../components/foods/foodList/foodList";

function Foods() {
  return (
    <MDBContainer>
      <h3 className="p-3 d-flex basic-header justify-content-center">
        Your Foods
      </h3>
      <Form></Form>
      <FoodList></FoodList>
    </MDBContainer>
  );
}

export default Foods;
