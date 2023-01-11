import { MDBContainer } from "mdb-react-ui-kit";
import CategoryList from "../../components/foods/categoryList/categoryList";

function Foods() {
  return (
    <MDBContainer>
      <h3 className="p-3 d-flex basic-header justify-content-center">
        Your Foods
      </h3>
      <CategoryList></CategoryList>
    </MDBContainer>
  );
}

export default Foods;
