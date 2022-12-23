import { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";
import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./macroCalcNav.css";

function MacroCalcNav() {
  const [foodList, setFoodList] = useState();
  let [totalCal, setTotalCal] = useState(0);
  let [totalProtein, setTotalProtein] = useState(0);
  let [totalCarbs, setTotalCarbs] = useState(0);
  let [totalFat, setTotalFat] = useState(0);

  useEffect(() => {
    const foodRef = firebase.database().ref("foods");
    foodRef.on("value", (snapshot) => {
      const foods = snapshot.val();
      const foodList = [];
      for (let id in foods) {
        foodList.push({ id, ...foods[id] });
      }

      setFoodList(foodList);

      let calcCalTotal = 0;
      let calcProteinTotal = 0;
      let calcCarbsTotal = 0;
      let calcFatTotal = 0;

      foodList.forEach((food) => {
        calcCalTotal = calcCalTotal + +food.cal;
        calcProteinTotal = calcProteinTotal + +food.protein;
        calcCarbsTotal = calcCarbsTotal + +food.carbs;
        calcFatTotal = calcFatTotal + +food.fat;
      });
      setTotalCal(calcCalTotal);
      setTotalProtein(calcProteinTotal);
      setTotalCarbs(calcCarbsTotal);
      setTotalFat(calcFatTotal);
    });
  }, [totalCal, totalProtein, totalCarbs, totalFat]);

  return (
    <MDBContainer id="nav-macro">
      <span id="nav-macro-cal">Cal: {totalCal}</span>
      <span id="nav-macro-p">P: {totalProtein}</span>
      <span id="nav-macro-c">C: {totalCarbs}</span>
      <span id="nav-macro-f">F: {totalFat}</span>
    </MDBContainer>
  );
}

export default MacroCalcNav;

// ATTEMPTED CODE
// const [total, setTotal] = useState(0);

// // useEffect(() => {});

// foodList.forEach((food, idx, arr) => {
//   arr[idx] = food.cal * 15;
// });

// console.log(foodList);

// example of this working in a local array
// const items = [{ price: 600 }, { price: 500 }, { price: 100 }];

// let itemTotal = 0;
// items.forEach((item) => {
//   itemTotal += item.price;
// });
// console.log(itemTotal);
// end example

// another example but with multiplication
// const numbers = [1, 2, 3, 4, 5];
// numbers.forEach((item, index, array) => {
//   array[index] = item * 10;
// });
// console.log(numbers);
// end example

// function MathTest() {
//   const items = [
//     { name: "first thing", price: 600 },
//     { name: "second thing", price: 400 },
//     { name: "third thing", price: 350 },
//     { name: "fourth thing", price: 200 },
//   ];

//   let total = 0;

//   items.forEach((item) => {
//     total += item.price;
//   });

//   //   console.log(total);
//   // return ();
// }

// export default MathTest;
