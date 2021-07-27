import './App.css';
import SearchBar from './components/SearchBar';
import {useState, useEffect} from "react";
import fetch from "axios";
import { incomeStatementKeys } from './components/StatementKeys';

function App() {
  const [name, setName] = useState("");
  const [cik,setCik] = useState("");
  const [data,setData] = useState({});
  const [loaded,setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json")
      .then(
        (result) => {
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
      )
      fetch("https://data.sec.gov/api/xbrl/companyfacts/CIK0001018724.json")
      .then(
        (result) => {
            console.log(result.data.facts);
            setData(result.data);
            setLoaded(true);
        },
        (error) => {
            console.log(error);
        }
      )
  }, []);

  const renderTable = () => {
    if(cik !== null && loaded) {
      console.log(data);
      return (
        <table className="table table-striped">
          <tbody>
          {incomeStatementKeys.map((str) => {
            const keyData = data["facts"]["us-gaap"][str];
            const usdVals = keyData["units"]["USD"];
            return (
              <tr>
                <th scope="row">{keyData["label"]}</th>
                <td>{usdVals[usdVals.length-1]["val"]/1000000}</td>
              </tr>
            );
          })}  
          </tbody>
        </table>
      );
    }
  }

  return (
    <div className="App">
      <h1>{name} {cik}</h1>
      <SearchBar parentSetCik={setCik} parentSetName={setName}/>
      {renderTable()}
    </div>
  );
}

export default App;
