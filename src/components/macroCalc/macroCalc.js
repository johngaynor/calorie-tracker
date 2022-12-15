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
import { useState, useEffect } from "react";
import firebase from "../../utilities/firebase";

function MacroCalc() {
  const [foodList, setFoodList] = useState();
  let [totalCal, setTotalCal] = useState(0);
  let [totalProtein, setTotalProtein] = useState(0);

  useEffect(() => {
    const foodRef = firebase.database().ref("crud-final");
    foodRef.on("value", (snapshot) => {
      const foods = snapshot.val();
      const foodList = [];
      for (let id in foods) {
        foodList.push({ id, ...foods[id] });
      }

      setFoodList(foodList);
      console.log(foodList);

      // foodList.forEach((food) => {
      //   setTotal((total += +food.cal));
      // });

      let calcCalTotal = 0;
      let calcProteinTotal = 0;

      foodList.forEach((food) => {
        console.log("cal: " + food.cal);
        // console.log("protein: " + food.protein);
        calcCalTotal = calcCalTotal + +food.cal;
        calcProteinTotal = calcProteinTotal + +food.protein;
        console.log("calcCalTotal: " + calcCalTotal);
        // console.log("calcProteinTotal: " + calcProteinTotal);
      });
      setTotalCal(calcCalTotal);
      setTotalProtein(calcProteinTotal);
      console.log("totalCal: " + totalCal);
      // console.log("total protein: " + totalProtein);
    });
  }, [totalCal, totalProtein]);

  return (
    <div>
      <h1>totalCal: {totalCal}</h1>
      <h1>totalProtein: {totalProtein}</h1>
    </div>
  );
}

export default MacroCalc;

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
