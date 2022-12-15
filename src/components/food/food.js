import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container } from "react-bootstrap";
import firebase from "../../utilities/firebase";
import styles from "./food.css";

// function Food({ food }) {
//   const completeFood = () => {
//     const foodRef = firebase
//       .database()
//       .ref("crud-calorie-tracker")
//       .child(food.id);

//     foodRef.update({
//       // complete: !recipe.complete,
//     });
//   };
// }

function Food({ food }) {
  const deleteFood = () => {
    const foodRef = firebase.database().ref("crud-final").child(food.id);

    foodRef.remove();
  };

  const editFood = (e) => {
    alert("edited food");
  };

  return (
    <tr>
      <td>
        <div className="mx-auto">
          <p className="fw-bold mb-1">{food.name}</p>
          <p className="text-muted mb-0">{food.meal}</p>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">random</p>
        <p className="text-muted mb-0">random</p>
      </td>
      <td>
        <MDBBadge color="success" pill className="d-flex">
          {food.cal}
        </MDBBadge>
      </td>
      <td>
        {food.protein}/{food.carbs}/{food.fat}
      </td>
      <td>
        <MDBBtn color="link" rounded size="sm" onClick={editFood}>
          Edit
        </MDBBtn>
        <MDBBtn color="link" rounded size="sm" onClick={deleteFood}>
          Delete
        </MDBBtn>
      </td>
    </tr>
  );
}

export default Food;
