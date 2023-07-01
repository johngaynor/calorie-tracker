import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";

import firebase from "../../utilities/firebase";
import Food from "./components/food";
import styles from "./styles/foodList.css";

function FoodList({ category }) {
  const [foodList, setFoodList] = useState();
  const [clickCategory, setClickCategory] = useState(false);

  useEffect(() => {
    const foodRef = firebase.database().ref("foods").child(`${category}`);
    foodRef.on("value", (snapshot) => {
      const foods = snapshot.val();
      const foodList = [];
      for (let id in foods) {
        foodList.push({ id, ...foods[id] });
      }

      setFoodList(foodList);
    });
  }, []);

  return (
    <MDBContainer
      fluid
      className={clickCategory ? "food-table mx-auto my-3" : "mx-auto my-3"}
    >
      {clickCategory ? (
        <div
          className="d-flex justify-content-between align-items-center select"
          onClick={() => setClickCategory(false)}
        >
          <FontAwesomeIcon icon={faSquareCaretUp} className="food-caret" />
          <h2 className="p-2">{category}</h2>
          <FontAwesomeIcon icon={faSquareCaretUp} className="food-caret" />
        </div>
      ) : (
        <div
          className="d-flex justify-content-between align-items-center unselect"
          onClick={() => setClickCategory(true)}
        >
          <FontAwesomeIcon icon={faSquareCaretDown} className="food-caret" />
          <h2 className="p-2">{category}</h2>
          <FontAwesomeIcon icon={faSquareCaretDown} className="food-caret" />
        </div>
      )}

      {clickCategory ? (
        <MDBContainer className="p-md-4">
          <MDBTable align="middle" className="w-100 mx-auto text-white">
            <MDBTableHead>
              <tr>
                <th scope="col" className="col-4">
                  Food
                </th>
                <th scope="col" className="d-none d-sm-table-cell">
                  Weight
                </th>
                <th scope="col" className="d-table-cell d-lg-none">
                  Macros
                </th>
                <th scope="col" className="d-none d-lg-table-cell">
                  Calories
                </th>
                <th scope="col" className="d-none d-lg-table-cell">
                  P/C/F
                </th>
                <th scope="col-3" className="d-none d-md-table-cell">
                  Actions
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {foodList
                ? foodList.map((food, index) => (
                    <Food food={food} key={index} />
                  ))
                : null}
            </MDBTableBody>
          </MDBTable>
        </MDBContainer>
      ) : null}
    </MDBContainer>
  );
}

export default FoodList;
