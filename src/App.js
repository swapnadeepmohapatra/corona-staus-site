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
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Corna Realtime Status</h1>
      </header>
      <div className="globalStat">
        <h2>Global Status</h2>
        <table>
          <thead>
            <tr>
              <th>Total Cases</th>
              <th>Confirmed Cases</th>
              <th>Recovered Cases</th>
              <th>Deaths Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {globalData.confirmed.value +
                  globalData.recovered.value +
                  globalData.deaths.value}
              </td>
              <td>{globalData.confirmed.value}</td>
              <td>{globalData.recovered.value}</td>
              <td>{globalData.deaths.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="indStat">
        <h2>India Status</h2>
        <table>
          <thead>
            <tr>
              <th>Total Cases</th>
              <th>Indian Cases</th>
              <th>Foreigner Cases</th>
              <th>Death Cases</th>
              <th>Cured Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{indiaData.data.summary.total}</td>
              <td>{indiaData.data.summary.confirmedCasesIndian}</td>
              <td>{indiaData.data.summary.confirmedCasesForeign}</td>
              <td>{indiaData.data.summary.discharged}</td>
              <td>{indiaData.data.summary.deaths}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stateIndStat">
        <h2>India Status</h2>
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
