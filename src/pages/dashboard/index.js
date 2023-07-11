import { useState, useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import firebase from "../../utilities/firebase";
import MacroDashboard from "./dashboard";
import Log from "./log";
import styles from "./styles/index.css";

function Dashboard() {
  const [userMacros, setUserMacros] = useState({
    cal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [cal, setCal] = useState(0);

  const [userLog, setUserLog] = useState({});

  useEffect(() => {
    let userLogRef = firebase.database().ref("user-log");

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userLogRef = firebase.database().ref(`users/${user.uid}/log`);
      }

      userLogRef.on("value", (snapshot) => {
        const log = snapshot.val();
        setUserLog(log);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let calTotal = 0;
    let proteinTotal = 0;
    let carbTotal = 0;
    let fatTotal = 0;

    for (let food in userLog) {
      const foodCal = userLog[`${food}`].cal;
      const foodProtein = userLog[`${food}`].protein;
      const foodCarbs = userLog[`${food}`].carbs;
      const foodFat = userLog[`${food}`].fat;

      calTotal += foodCal;
      proteinTotal += foodProtein;
      carbTotal += foodCarbs;
      fatTotal += foodFat;

      setUserMacros({ calTotal, proteinTotal, carbTotal, fatTotal });
    }
  }, [userLog]);

  useEffect(() => {
    console.log(userMacros);
  }, [userMacros]);

  return (
    <>
      <MDBContainer fluid className="dashboard-container pb-3 px-4">
        <MDBRow>
          <h3 className="p-3 text-start">Dashboard</h3>
        </MDBRow>
        <MacroDashboard></MacroDashboard>
      </MDBContainer>
      <Log></Log>
    </>
  );
}

export default Dashboard;
