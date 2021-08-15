import './App.css';
import SearchBar from './components/SearchBar';
import StatementTable from './components/StatementTable';
import {useState, useEffect} from "react";
import fetch from "axios";

function App() {
  const [name, setName] = useState(null);
  const [cik,setCik] = useState(null);
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [submissions,setSubmissions] = useState({});
  const [userInput,setUserInput] = useState("");

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
                      console.log(result.data);
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
                      <SearchBar input={userInput} parentSetInput={setUserInput} parentSetCik={setCik} parentSetName={setName}/>
                  </div>
                  <div className="statement-table">
                      <StatementTable submissions={submissions} data={data} loading={loading} loaded={loaded}/>
                  </div>
              </div>
          );
      } else {
          return (
              <div className="search-bar-home">
                  <SearchBar input={userInput} parentSetInput={setUserInput} parentSetCik={setCik} parentSetName={setName}/>
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
