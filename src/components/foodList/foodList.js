import Food from "../food/food";
import React, { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container } from "react-bootstrap";
import styles from "./foodList.css";

function FoodList() {
  const [foodList, setFoodList] = useState();
  // let [total, setTotal] = useState(0);

  useEffect(() => {
    const foodRef = firebase.database().ref("crud-final");
    foodRef.on("value", (snapshot) => {
      const foods = snapshot.val();
      const foodList = [];
      for (let id in foods) {
        foodList.push({ id, ...foods[id] });
      }

      setFoodList(foodList);
      // console.log(foodList);
    });
  }, []);

  return (
    <Container fluid className="food-table p-4 mt-3 w-75">
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
        {foodList
          ? foodList.map((food, index) => <Food food={food} key={index} />)
          : ""}
      </MDBTable>
    </Container>
  );
}

export default FoodList;
