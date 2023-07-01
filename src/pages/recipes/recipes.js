import React, { useState, useEffect } from "react";
import { MDBContainer } from "mdb-react-ui-kit";

import firebase from "../../utilities/firebase";
import List from "./categories";

function Recipes() {
  const [categoryList, setCategoryList] = useState("");

  useEffect(() => {
    const categoryListRef = firebase.database().ref("recipes");
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
      <h3 className="p-3 text-start">Your Recipes</h3>

      {categoryList
        ? categoryList.map((category, index) => (
            <List category={category} key={index} />
          ))
        : null}
    </MDBContainer>
  );
}

export default Recipes;
