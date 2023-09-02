import axios from "axios";
import { useEffect, useState } from "react";
import "./home.css";

export default function Home() {
  ///CacCulating Meal
  const [lists, setLists] = useState();
  const [MealData, setMeals] = useState({
    totalMeal: 0,
    sourav: 0,
    mehedi: 0,
    shakil: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/meal");
      setLists(res);
    };
    fetchData();
  }, []);

  if (lists) {
    const List = lists.data;
    let sum = List.map(
      (v) => parseFloat(v.sourav) + parseFloat(v.mehedi) + parseFloat(v.shakil)
    );
    let sm = List.map((v) => parseFloat(v.sourav));
    let am = List.map((v) => parseFloat(v.shakil));
    let mm = List.map((v) => parseFloat(v.mehedi));

    var Sum = 0,
      Souravm = 0,
      Mehedim = 0,
      Shakilm = 0;
    for (let i = 0; i < sum.length; i++) {
      Sum += sum[i];
    }
    for (let i = 0; i < am.length; i++) {
      Shakilm += am[i];
      Souravm += sm[i];
      Mehedim += mm[i];
    }
  }
  useEffect(() => {
    setMeals({
      totalMeal: Sum,
      shakil: Shakilm,
      sourav: Souravm,
      mehedi: Mehedim,
    });
  }, [Sum, Shakilm, Souravm, Mehedim]);

  //Deposit Calculation
  const [depositList, setDeopsitList] = useState();
  const [Deposite, SetDeposit] = useState({
    totalDeposite: 0,
    shakil: 0,
    sourav: 0,
    mehedi: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/deposite");
      setDeopsitList(res);
    };
    fetchData();
  }, []);
  if (depositList) {
    const List = depositList.data;
    let sum = List.map((v) => parseFloat(v.amount));
    let sm = List.map((v) => (v.name === "Sourav" ? parseFloat(v.amount) : 0));
    let am = List.map((v) => (v.name === "Shakil" ? parseFloat(v.amount) : 0));
    let mm = List.map((v) => (v.name === "Mehedi" ? parseFloat(v.amount) : 0));

    var S = 0,
      Sm = 0,
      Mm = 0,
      Am = 0;
    for (let i = 0; i < sum.length; i++) {
      S += sum[i];
    }
    for (let i = 0; i < am.length; i++) {
      Am += am[i];
      Sm += sm[i];
      Mm += mm[i];
    }
  }
  useEffect(() => {
    SetDeposit({
      totalDeposite: S,
      shakil: Am,
      sourav: Sm,
      mehedi: Mm,
    });
  }, [S, Am, Sm, Mm]);

  //Expense Calculation
  const [ExpenseList, setExpenseList] = useState();
  const [Expense, SetExpense] = useState({
    totalExpense: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/expense");
      setExpenseList(res);
    };
    fetchData();
  }, []);
  if (ExpenseList) {
    const List = ExpenseList.data;
    var SD = 0;
    let sum = List.map((v) => parseFloat(v.amount));
    for (let i = 0; i < sum.length; i++) {
      SD += sum[i];
    }
  }
  useEffect(() => {
    SetExpense({
      ...Expense,
      totalExpense: SD,
    });
  }, [SD]);

  // Meal Rate
  const [mealRate, setMealRate] = useState();
  const calcul = MealData.totalMeal
    ? parseFloat(Expense.totalExpense / MealData.totalMeal).toFixed(2)
    : 0;
  useEffect(() => {
    setMealRate(calcul);
  }, [calcul]);

  //Personal Expense
  const [PersonalExpense, setPersonalExpense] = useState({
    sourav: 0,
    mehedi: 0,
    shakil: 0,
    sc: 0,
    ac: 0,
    mc: 0,
  });
  //Sourav
  const sExp = (mealRate * MealData.sourav).toFixed(0);
  const mExp = (mealRate * MealData.mehedi).toFixed(0);
  const aExp = (mealRate * MealData.shakil).toFixed(0);
  const Sc =
    PersonalExpense.sourav - Deposite.sourav < 0
      ? Deposite.sourav - PersonalExpense.sourav
      : PersonalExpense.sourav - Deposite.sourav;
  const Mc =
    PersonalExpense.mehedi - Deposite.mehedi < 0
      ? Deposite.mehedi - PersonalExpense.mehedi
      : PersonalExpense.mehedi - Deposite.mehedi;
  const Ac =
    PersonalExpense.shakil - Deposite.shakil < 0
      ? Deposite.shakil - PersonalExpense.shakil
      : PersonalExpense.shakil - Deposite.shakil;

  useEffect(() => {
    setPersonalExpense({
      sourav: sExp,
      mehedi: mExp,
      shakil: aExp,
      sc: Sc,
      mc: Mc,
      ac: Ac,
    });
  }, [sExp, aExp, mExp, Sc, Mc, Ac]);
  return (
    <div className="main">
      <div className="homeHeader">
        <h3>
          Meal Rate:{" "}
          <span style={{ marginLeft: "10px", color: "#9c5400" }}>
            {mealRate}
          </span>
        </h3>
        <h3>
          Total Meal:{" "}
          <span style={{ marginLeft: "10px", color: "#9c5400" }}>
            {MealData.totalMeal}
          </span>
        </h3>
        <h3>
          Total Deposit:{" "}
          <span style={{ marginLeft: "10px", color: "#9c5400" }}>
            {Deposite.totalDeposite}
          </span>
        </h3>
        <h3>
          Total Expense:{" "}
          <span style={{ marginLeft: "10px", color: "#9c5400" }}>
            {Expense.totalExpense}
          </span>
        </h3>
      </div>
      <table>
        <caption>
          <h3>Members Shortcut Information</h3>
        </caption>
        <tr>
          <th>Name</th>
          <th>Deposit</th>
          <th>Expense</th>
          <th>Total Consumed Meal</th>
          <th>Comment</th>
        </tr>
        <tr key={Math.random()}>
          <td>Ahsan Amin</td>
          <td>{Deposite.sourav}</td>
          <td>{PersonalExpense.sourav}</td>
          <td>{MealData.sourav}</td>
          <td>
            {PersonalExpense.sourav - Deposite.sourav > 0 ? (
              <span>
                Have to Pay{" "}
                <b style={{ color: "red" }}>{PersonalExpense.sc} </b>Taka
              </span>
            ) : (
              <span>
                Will get return <b>{PersonalExpense.sc}</b> Taka{" "}
              </span>
            )}
          </td>
        </tr>
        <tr key={Math.random()}>
          <td>Mirza Shakil</td>
          <td>{Deposite.shakil}</td>
          <td>{PersonalExpense.shakil}</td>
          <td>{MealData.shakil}</td>
          <td>
            {PersonalExpense.shakil - Deposite.shakil > 0 ? (
              <span>
                Have to Pay <b style={{ color: "red" }}>{PersonalExpense.ac}</b>{" "}
                Taka
              </span>
            ) : (
              <span>
                Will get return <b>{PersonalExpense.ac}</b> Taka
              </span>
            )}
          </td>
        </tr>
        <tr key={Math.random()}>
          <td>Mehedi Hasan</td>
          <td>{Deposite.mehedi}</td>
          <td>{PersonalExpense.mehedi}</td>
          <td>{MealData.mehedi}</td>
          <td>
            {PersonalExpense.mehedi - Deposite.mehedi > 0 ? (
              <span>
                Have to Pay <b style={{ color: "red" }}>{PersonalExpense.mc}</b>{" "}
                Taka
              </span>
            ) : (
              <span>
                Will get return <b>{PersonalExpense.mc}</b> Taka
              </span>
            )}
          </td>
        </tr>
        {/* <MembersTable members={arr}/> */}
      </table>
    </div>
  );
}
