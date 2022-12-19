import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";

function Recipes() {
  return (
    <MDBContainer fluid className="recipe-table p-4 my-auto w-75">
      <MDBTable align="middle" className="w-100 mx-auto text-white">
        <MDBTableHead>
          <tr>
            <th scope="col" className="col-4">
              Food
            </th>
            <th scope="col">Weight</th>
            <th scope="col">Calories</th>
            <th scope="col">P/C/F</th>
            <th scope="col" className="col-2">
              Actions
            </th>
          </tr>
          {/* each food will store a serving size */}
        </MDBTableHead>
        <MDBTableBody>
          <tr id="food-display">
            <td>
              <div className="mx-auto" id="food-meal-name-display">
                <p className="fw-bold mb-1" id="food-name-display">
                  hello
                </p>
                <p className="text-muted mb-0" id="food-meal-display">
                  underline
                </p>
              </div>
            </td>
            <td>
              <input
                id="edit-servings-input"
                type="number"
                className="food-input-boxes"
              />
              <p className="text-muted mb-0">in grams</p>
            </td>
            <td>
              <MDBBadge
                color="success"
                pill
                className="d-flex"
                id="food-cal-display"
              >
                cal
              </MDBBadge>
            </td>
            <td id="food-macros-display">p/c/f</td>
            <td id="food-log-btns">
              <div>
                <MDBBtn
                  color="link"
                  rounded
                  size="sm"
                  // this is just here to set it back to default
                >
                  Submit
                </MDBBtn>
              </div>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}

export default Recipes;
