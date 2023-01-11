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
import FoodList from "../foodList/foodList";

function CategoryList() {
  const [categoryList, setCategoryList] = useState("");

  useEffect(() => {
    const categoryListRef = firebase.database().ref("foods");
    categoryListRef.on("value", (snapshot) => {
      const categories = snapshot.val();
      const categoryList = [];
      for (let categoryName in categories) {
        categoryList.push({ categoryName, ...categories[categoryName] });
      }
      const categoryNames = [];
      categoryList.forEach(function (category, index) {
        categoryNames.push(category.categoryName);
      });
      setCategoryList(categoryNames);
    });
  }, []);
  console.log(categoryList);

  return (
    <MDBContainer fluid>
      {/* begin for each loop */}
      {categoryList
        ? categoryList.map((category, index) => (
            <FoodList category={category} key={index} />
          ))
        : null}

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

export default CategoryList;
