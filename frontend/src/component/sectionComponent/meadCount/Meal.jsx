import axios from "axios";
import { useEffect, useState } from "react";
import MealList from "./component/MealList";
import "./meal.css";
const sc = "tmatrix@19";
export default function Meal() {
  const [Data, setData] = useState({
    date: "",
    sourav: "",
    shakil: "",
    mehedi: "",
    secret: "",
  });
  const [lists, setLists] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/meal");
      setLists(res);
    };
    fetchData();
  }, [Data]);
  if (lists) {
    let sum = lists.data.map(
      (v) => parseFloat(v.sourav) + parseFloat(v.mehedi) + parseFloat(v.shakil)
    );
    var Sum = 0;
    for (let i = 0; i < sum.length; i++) {
      Sum += sum[i];
    }
  }

  const handleSubmit = (e) => {
    if (e.target.name === "sourav") {
      setData({
        ...Data,
        sourav: e.target.value,
      });
    } else if (e.target.name === "shakil") {
      setData({
        ...Data,
        shakil: e.target.value,
      });
    } else if (e.target.name === "mehedi") {
      setData({
        ...Data,
        mehedi: e.target.value,
      });
    } else if (e.target.name === "date") {
      setData({
        ...Data,
        date: e.target.value,
      });
    } else if (e.target.name === "secret") {
      setData({
        ...Data,
        secret: e.target.value,
      });
    }
  };
  const Submit = async (e) => {
    e.preventDefault();
    const { sourav, shakil, mehedi, date } = Data;

    const mealData = {
      date,
      sourav,
      shakil,
      mehedi,
    };
    // console.log(mealData)
    await axios.post("http://localhost:8800/meal", mealData).then((res) => {
      console.log(res.data);
    });
    setData({
      date: "",
      sourav: "",
      shakil: "",
      mehedi: "",
      secret: "",
    });
  };

  const DltHandle = async (e) => {
    const url = `http://localhost:8800/meal/${e.target.name}`;
    await axios.delete(url).then((res) => console.log(res.data));
    setData({
      ...Data,
      secret: "",
    });
  };
  return (
    <div>
      <form action="" onSubmit={Submit}>
        <div className="fieldSet">
          <fieldset>
            <legend>
              {" "}
              <h3>Date</h3>
            </legend>
            <input
              required={true}
              onChange={handleSubmit}
              value={Data.date}
              type="date"
              name="date"
            />
          </fieldset>
          <fieldset>
            <legend>
              <h3>Input Meal</h3>
            </legend>
            <label htmlFor="">Sourav</label>
            <input
              style={{ width: "50px", marginLeft: "15px" }}
              onChange={handleSubmit}
              type="text"
              name="sourav"
              value={Data.sourav}
            />
            <br />
            <label htmlFor="">Shakil</label>
            <input
              style={{ width: "50px", marginLeft: "44px" }}
              onChange={handleSubmit}
              type="text"
              name="shakil"
              value={Data.shakil}
            />
            <br />
            <label htmlFor="">Mehedi</label>
            <input
              style={{ width: "50px", marginLeft: "5px" }}
              onChange={handleSubmit}
              type="text"
              name="mehedi"
              value={Data.mehedi}
            />
          </fieldset>
          <fieldset>
            <legend>
              {" "}
              <h3>Secret Code</h3>
            </legend>
            <input
              placeholder="for delete and submit button"
              onChange={handleSubmit}
              value={Data.secret}
              type="password"
              name="secret"
              id=""
            />
          </fieldset>
        </div>
        {Data.secret === sc ? (
          <input className="submit" type="submit" value="Submit" />
        ) : (
          <p></p>
        )}
      </form>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Sourav</th>
            <th>Shakil</th>
            <th>Mehedi</th>
          </tr>

          {lists ? (
            <MealList
              Bool={Data.secret === sc ? true : false}
              DltHandle={DltHandle}
              lists={lists.data}
            />
          ) : null}
          <tr>
            <th colSpan={3}>Total Meal</th>
            <th>{Sum ? Sum : "0"}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
