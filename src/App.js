import React, { useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [globalData, setData] = useState();
  const [indiaData, setindiaData] = useState();

  fetch("https://covid19.mathdro.id/api")
    .then(res => res.json())
    .then(
      result => {
        console.log(result);
        setData(result);
        // setLoading(false);
        fetch("https://api.rootnet.in/covid19-in/stats/latest")
          .then(res => res.json())
          .then(
            result => {
              console.log(result);
              setindiaData(result);
              setLoading(false);
            },
            error => {
              console.log(error);
            }
          );
      },
      error => {
        console.log(error);
      }
    );

  if (loading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 Realtime Status</h1>
      </header>
      <div className="globalStat">
        <h2>Global Status</h2>
        <table>
          <thead>
            <tr>
              <th className="head" style={{ backgroundColor: "#1abc9c" }}>
                Total Cases
              </th>
              <th className="head" style={{ backgroundColor: "#EEC213" }}>
                Confirmed Cases
              </th>
              <th className="head" style={{ backgroundColor: "#2ecc71" }}>
                Recovered Cases
              </th>
              <th className="head" style={{ backgroundColor: "#e74c3c" }}>
                Deaths Cases
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="total" style={{ backgroundColor: "#1abc9c" }}>
                {globalData.confirmed.value +
                  globalData.recovered.value +
                  globalData.deaths.value}
              </td>
              <td className="confirm" style={{ backgroundColor: "#EEC213" }}>
                {globalData.confirmed.value}
              </td>
              <td className="recovered" style={{ backgroundColor: "#2ecc71" }}>
                {globalData.recovered.value}
              </td>
              <td className="death" style={{ backgroundColor: "#e74c3c" }}>
                {globalData.deaths.value}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="indStat">
        <h2>India Status</h2>
        <table>
          <thead>
            <tr>
              <th className="head" style={{ backgroundColor: "#1abc9c" }}>
                Total Cases
              </th>
              <th className="head" style={{ backgroundColor: "#EEC213" }}>
                Confirmed Cases
              </th>
              <th className="head" style={{ backgroundColor: "#2ecc71" }}>
                Recovered Cases
              </th>
              <th className="head" style={{ backgroundColor: "#e74c3c" }}>
                Deaths Cases
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="total" style={{ backgroundColor: "#1abc9c" }}>
                {indiaData.data.summary.total}
              </td>
              <td className="confirm" style={{ backgroundColor: "#EEC213" }}>
                {indiaData.data.summary.total -
                  indiaData.data.summary.discharged -
                  indiaData.data.summary.deaths}
              </td>
              <td className="recovered" style={{ backgroundColor: "#2ecc71" }}>
                {indiaData.data.summary.discharged}
              </td>
              <td className="death" style={{ backgroundColor: "#e74c3c" }}>
                {indiaData.data.summary.deaths}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stateIndStat">
        <h2>State Wise Status</h2>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Cases</th>
              <th>Death</th>
              <th>Cured</th>
            </tr>
          </thead>
          <tbody>
            {indiaData.data.regional.map(a => (
              <tr>
                <td>{a.loc}</td>
                <td>{a.confirmedCasesIndian + a.confirmedCasesForeign}</td>
                <td>{a.deaths}</td>
                <td>{a.discharged}</td>
              </tr>
            ))}
            {/* <td>{indiaData.data.summary.total}</td>
              <td>{indiaData.data.summary.confirmedCasesIndian}</td>
              <td>{indiaData.data.summary.confirmedCasesForeign}</td>
              <td>{indiaData.data.summary.discharged}</td>
              <td>{indiaData.data.summary.deaths}</td> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
