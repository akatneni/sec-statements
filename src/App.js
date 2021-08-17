import './App.css';
import SearchBar from './components/SearchBar';
import StatementTable from './components/StatementTable';
import {Alert} from "react-bootstrap";
import {useState, useEffect} from "react";
import fetch from "axios";
import SelectSubmissions from "./components/SelectSubmissions";
import FilingTable from "./components/FilingTable";

function App() {
  const [name, setName] = useState(sessionStorage.getItem('name') || null);
  const [cik,setCik] = useState(sessionStorage.getItem('cik') || null);
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [submissions,setSubmissions] = useState({});
  const [userInput,setUserInput] = useState(sessionStorage.getItem('userInput') || "");
  const [showAlert,setShowAlert] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);

  useEffect(() => {
      if(cik) {
          let loaded1 = false, loaded2 = false;
          setLoading(true);
          setLoaded(false);
          fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`)
              .then(
                  (result) => {
                      console.log(result.data);
                      setData(result.data);
                      loaded1 = true;
                      if(loaded2) {
                          setLoaded(true);
                          setLoading(false);
                      }
                  },
                  (error) => {
                      console.log(error);
                      setLoaded(false);
                      setLoading(false);
                      setShowAlert(true);
                  }
              )
          fetch(`https://data.sec.gov/submissions/CIK${cik}.json`)
              .then(
                  (result) => {
                      console.log(result.data);
                      setSubmissions(result.data);
                      loaded2 = true;
                      if(loaded1) {
                          setLoaded(true);
                          setLoading(false);
                      }
                  },
                  (error) => {
                      console.log(error);
                      setLoaded(false);
                      setLoading(false);
                      setShowAlert(true);
                  }
              )
      }
  }, [cik]);

  const loadTable = () => {
      if(showSubmissions) {
          return (
              <div className="submissions-table app-table">
                  <FilingTable cik={cik} submissions={submissions} loaded={loaded} loading={loading}/>
              </div>
          );
      } else {
          return (
              <div className="statement-table app-table">
                  <StatementTable submissions={submissions} data={data} loaded={loaded} loading={loading}/>
              </div>
          );
      }
  }

  const makePage = () => {
      if(cik) {
          return (
              <div className="loaded-page">
                  <h1 className="name">{name}</h1>
                  <div className="search-bar-loaded">
                      <SearchBar input={userInput} parentSetInput={setUserInput} parentSetCik={setCik} parentSetName={setName}/>
                      <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                          Unable to fetch statements
                      </Alert>
                  </div>
                  <div className="select-submissions">
                      <SelectSubmissions showSubmissions={showSubmissions} parentSetShowSubmissions={setShowSubmissions}/>
                  </div>
                  {loadTable()}
              </div>
          );
      } else {
          return (
              <div>
                  <div className="search-bar-home">
                      <h5>Search for a company by ticker or by name</h5>
                      <SearchBar input={userInput} parentSetInput={setUserInput} parentSetCik={setCik} parentSetName={setName}/>
                  </div>
                  <div className="card-footer">
                      <p> by <a href="https://github.com/akatneni" target="_blank" rel="noreferrer">Aryan Katneni</a>.
                          View the source
                          code on <a href="https://github.com/akatneni/sec-statements" target="_blank" rel="noreferrer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-github" viewBox="0 0 16 16">
                                  <path
                                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                              </svg> Github
                          </a>.
                      </p>
                  </div>
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
