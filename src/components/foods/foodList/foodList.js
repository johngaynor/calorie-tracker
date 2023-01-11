import Food from "../food/food";
import React, { useState, useEffect } from "react";
import firebase from "../../../utilities/firebase";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBContainer,
} from "mdb-react-ui-kit";
import styles from "./foodList.css";

function FoodList({ category }) {
  // const [foodList, setFoodList] = useState();
  // let [total, setTotal] = useState(0);

  // useEffect(() => {
  //   const foodRef = firebase.database().ref("foods");
  //   foodRef.on("value", (snapshot) => {
  //     const foods = snapshot.val();
  //     const foodList = [];
  //     for (let id in foods) {
  //       foodList.push({ id, ...foods[id] });
  //     }

  //     setFoodList(foodList);
  //     console.log(foodList);
  //   });
  // }, []);

  return (
    <MDBContainer fluid>
      {/* begin for each loop */}
      <h3>{category}</h3>
      <MDBContainer className="food-table p-4 w-75">
        <MDBTable align="middle" className="w-100 mx-auto text-white">
          <MDBTableHead>
            <tr>
              <th scope="col" className="col-4">
                Food/Meal
              </th>
              <th scope="col">Servings</th>
              <th scope="col">Calories</th>
              <th scope="col">P/C/F</th>
              <th scope="col" className="col-2">
                Actions
              </th>
            </tr>
          </MDBTableHead>
        </MDBTable>
      </MDBContainer>
      {/* end loop */}
    </MDBContainer>
  );
}

export default FoodList;

// old loop for foods
// {foodList
// ? foodList.map((food, index) => <Food food={food} key={index} />)
// : ""}
