import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBadge,
  MDBRow,
} from "mdb-react-ui-kit";

function Recipe() {
  return (
    <MDBTableBody>
      <tr id="food-display">
        <td>
          <div className="mx-auto" id="food-meal-name-display">
            <p className="fw-bold mb-1" id="food-name-display">
              {/* {recipes[0].ingredients[0].name} */}
            </p>
            <p className="text-muted mb-0" id="food-meal-display">
              underline
            </p>
          </div>
        </td>
        <td>
          <input
            id="edit-weight-input"
            type="number"
            className="food-input-boxes"
            // onChange={weightOnChange}
            // onKeyDown={weightOnChange}
            // value={weight}
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
            {/* {weightCal} */}
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
  );
}

export default Recipe;
