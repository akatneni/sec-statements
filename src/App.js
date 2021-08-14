import './App.css';
import SearchBar from './components/SearchBar';
import StatementTable from './components/StatementTable';
import SelectSheet from './components/SelectSheet';
import {useState, useEffect} from "react";
import {sheets} from "./components/constants";
import fetch from "axios";

function App() {
  const [name, setName] = useState(null);
  const [cik,setCik] = useState(null);
  const [sheet,setSheet] = useState(sheets.IS);
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [submissions,setSubmissions] = useState({});

  useEffect(() => {
      if(cik) {
          setLoading(true);
          setLoaded(false);
          fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`)
              .then(
                  (result) => {
                      console.log(result.data);
                      setData(result.data);
                      setLoaded(true);
                      setLoading(false);
                  },
                  (error) => {
                      console.log(error);
                      setLoading(false);
                  }
              )
          fetch(`https://data.sec.gov/submissions/CIK${cik}.json`)
              .then(
                  (result) => {
                      setSubmissions(result.data);
                  },
                  (error) => {
                      console.log(error);
                  }
              )
      }
  }, [cik]);

  const makePage = () => {
      if(cik) {
          return (
              <div className="loaded-page">
                  <h1 className="name">{name}</h1>
                  <div className="search-bar-loaded">
                      <SearchBar parentSetCik={setCik} parentSetName={setName}/>
                  </div>
                  <div className="select-sheet">
                      <SelectSheet sheet={sheet} parentSetSheet={setSheet}/>
                  </div>
                  <div className="statement-table">
                      <StatementTable submissions={submissions} sheet={sheet} data={data} loading={loading} loaded={loaded}/>
                  </div>
              </div>
          );
      } else {
          return (
              <div className="search-bar-home">
                  <SearchBar parentSetCik={setCik} parentSetName={setName}/>
              </div>
          );
      }
  }

  return (
    <div className="App">
        {makePage()}
    </div>
  );
}

export default App;
