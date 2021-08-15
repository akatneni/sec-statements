import './App.css';
import SearchBar from './components/SearchBar';
import StatementTable from './components/StatementTable';
import {Alert} from "react-bootstrap";
import {useState, useEffect} from "react";
import fetch from "axios";
import SelectSubmissions from "./components/SelectSubmissions";

function App() {
  const [name, setName] = useState(null);
  const [cik,setCik] = useState(null);
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);
  const [submissions,setSubmissions] = useState({});
  const [userInput,setUserInput] = useState("");
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
              <div className="submissions-table">
                  submissions table
                  {/*<SubmissionsTable submissions={submissions} loaded={loaded} loading={loading}/>*/}
              </div>
          );
      } else {
          return (
              <div className="statement-table">
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
