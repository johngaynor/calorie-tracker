import { useState, useEffect } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import firebase from "../../utilities/firebase";
import MacroDashboard from "./dashboard";
import Log from "./log";

function Dashboard() {
  const [userMacros, setUserMacros] = useState({
    cal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [userLog, setUserLog] = useState({});
  const [userGoals, setUserGoals] = useState({});

  useEffect(() => {
    let userLogRef = firebase.database().ref("user-log");

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const goalRef = firebase
          .database()
          .ref(`users/${user.uid}/macro-goals`);

        goalRef.on("value", (snapshot) => {
          const goals = snapshot.val();
          setUserGoals(goals);
        });

        userLogRef = firebase.database().ref(`users/${user.uid}/log`);
      } else {
        setUserGoals({
          cal: 4000,
          protein: 200,
          carbs: 505,
          fat: 185,
        });
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
    let cal = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    for (let food in userLog) {
      const foodCal = userLog[`${food}`].cal;
      const foodProtein = userLog[`${food}`].protein;
      const foodCarbs = userLog[`${food}`].carbs;
      const foodFat = userLog[`${food}`].fat;

      cal += foodCal;
      protein += foodProtein;
      carbs += foodCarbs;
      fat += foodFat;

      setUserMacros({ cal, protein, carbs, fat });
    }
  }, [userLog]);

  return (
    <>
      <MDBContainer fluid className="dashboard-container pb-3 px-4">
        <MDBRow>
          <h3 className="p-3 text-start">Dashboard</h3>
        </MDBRow>
        <MacroDashboard
          userMacros={userMacros}
          userGoals={userGoals}
        ></MacroDashboard>
      </MDBContainer>
      <Log userLog={userLog}></Log>
    </>
  );
}

export default Dashboard;
