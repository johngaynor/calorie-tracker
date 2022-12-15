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

import { useState } from "react";
import firebase from "../../utilities/firebase";

function MathTest() {
  const [total, setTotal] = useState(0);

  // useEffect(() => {});

  foodList.forEach((food, idx, arr) => {
    arr[idx] = food.cal * 15;
  });

  console.log(foodList);

  // example of this working in a local array
  const items = [{ price: 600 }, { price: 500 }, { price: 100 }];

  let itemTotal = 0;
  items.forEach((item) => {
    itemTotal += item.price;
  });
  // console.log(itemTotal);
  // end example

  // another example but with multiplication
  const numbers = [1, 2, 3, 4, 5];
  numbers.forEach((item, index, array) => {
    array[index] = item * 10;
  });
  // console.log(numbers);
  // end example

  return (
    <div>
      <h1>
        {test} <button onClick={() => setTest(test + 1)}>hello</button>
      </h1>
      <h1>total: {total}</h1>
    </div>
  );
}

export default MathTest;
