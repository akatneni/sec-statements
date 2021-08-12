import './App.css';
import SearchBar from './components/SearchBar';
import StatementTable from './components/StatementTable';
import SelectSheet from './components/SelectSheet';
import {useState, useEffect} from "react";
import fetch from "axios";

function App() {
  const [name, setName] = useState(null);
  const [cik,setCik] = useState(null);
  const [sheet,setSheet] = useState("is");
  const [data,setData] = useState({});
  const [loading,setLoading] = useState(false);
  const [loaded,setLoaded] = useState(false);

  useEffect(() => {
      if(cik) {
          setLoading(true);
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
      }
  }, [cik]);


  return (
    <div className="App">
        <h1>{name} {cik}</h1>
        <div className="search-bar">
            <SearchBar parentSetCik={setCik} parentSetName={setName}/>
        </div>
        <div className="select-sheet">
            <SelectSheet parentSetSheet={setSheet}/>
        </div>
        <div className="statement-table">
            <StatementTable sheet={sheet} data={data} loading={loading} loaded={loaded}/>
        </div>
    </div>
  );
}

export default App;
