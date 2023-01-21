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

function FoodCategoryList() {
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

  return (
    <MDBContainer fluid className="px-md-5">
      <h3 className="p-3 text-start">Your Foods</h3>

      {categoryList
        ? categoryList.map((category, index) => (
            <FoodList category={category} key={index} />
          ))
        : null}
    </MDBContainer>
  );
}

export default FoodCategoryList;
