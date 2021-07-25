import './App.css';
import SearchBar from './components/SearchBar';
import {useState, useEffect} from "react";
import fetch from "axios"

function App() {
  const [name, setName] = useState("");
  const [cik,setCik] = useState("");

  useEffect(() => {
    fetch("https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json")
      .then(
        (result) => {
            console.log(result.data.facts);
        },
        (error) => {
            console.log(error);
        }
      )
  }, []);

  return (
    <div className="App">
      <h1>{name} {cik}</h1>
      <SearchBar parentSetCik={setCik} parentSetName={setName}/>
    </div>
  );
}

export default App;
