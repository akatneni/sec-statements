import { toUpper } from "lodash";
import {useState, useEffect} from "react";
import dict from "../resources/company_tickers.json";
import {Alert} from "react-bootstrap";

function SearchBar(props) {
    const MAX_SUGGESTIONS = 20;
    const [suggestions, setSuggestions] = useState([]);
    const [tickers, setTickers] = useState([]);
    const [names, setNames] = useState([]);
    const [tickToCik, setTickToCik] = useState({});
    const [nameToTick, setNameToTick] = useState({});
    const [tickToName, setTickToName] = useState({});
    const [value, setValue] = useState(props.input);
    const [showAlert,setShowAlert] = useState(false);

    const loadTickers = () => {
        const tickToCik = {};
        const nameToTick = {};
        const tickToName = {};
        const c = "cik_str", n = "title", t = "ticker";
        for(const key in dict) {
            const obj = dict[key];
            tickToCik[toUpper(obj[t])] = obj[c];
            nameToTick[obj[n]] = toUpper(obj[t]);
            tickToName[toUpper(obj[t])] = obj[n];
        }
        const tickers = Object.keys(tickToCik).sort();
        const names = Object.keys(nameToTick).sort();
        setTickers(tickers);
        setNames(names);
        setTickToCik(tickToCik);
        setNameToTick(nameToTick);
        setTickToName(tickToName);
    }

    useEffect(() => {
        loadTickers();
    }, []);

    // can be optimized
    const onTextChanged = (e) => {
        setSuggestions([]);
        const value = e.target.value;
        setValue(value);
        let suggestions = [];
        let sug1 = [];
        let sug2 = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${encodeURI(value)}`,'i');
            sug1 = tickers.filter(v => regex.test(v));
            sug2 = names.filter(v => regex.test(v));
            sug2 = sug2.map(str => {
                if(!sug1.includes(nameToTick[str])) {
                    return `(${nameToTick[str]}) ${str}`;
                } else return null;
            });
            sug1 = sug1.map(str => {
                return `(${str}) ${tickToName[str]}`;
            });
            suggestions = sug1.concat(sug2);
            suggestions.sort();
            suggestions = suggestions.slice(0,MAX_SUGGESTIONS);
        }
        setSuggestions(suggestions);
    }

    const getSuggestions = () => {
        return (
            <datalist id='tickers'>
                {suggestions.map((item,index)=><option key={index} value={item}/>)}
            </datalist>
        );
    }

    const handleSubmit = (e) => {
        let finalCik = null, finalName = null;
        if(toUpper(value) in tickToCik) {
            const cikNum = tickToCik[toUpper(value)];
            let cik = cikNum.toString();
            while(cik.length < 10) {
                cik = '0' + cik;
            }
            finalName = tickToName[toUpper(value)];
            finalCik = cik;
        } else if(value in nameToTick) {
            const cikNum = tickToCik[nameToTick[value]];
            let cik = cikNum.toString();
            while(cik.length < 10) {
                cik = '0' + cik;
            }
            finalName = value;
            finalCik = cik;
        } else {
            let input = value;
            if(suggestions.length > 0) {
                input = suggestions[0];
            }
            const regex = /\(([^)]+)\)/;
            const matches = regex.exec(input);
            if(matches !== null && toUpper(matches[1]) in tickToCik) {
                const cikNum = tickToCik[toUpper(matches[1])];
                let cik = cikNum.toString();
                while(cik.length < 10) {
                    cik = '0' + cik;
                }
                finalName = tickToName[toUpper(matches[1])];
                finalCik = cik;
            } else {
                setShowAlert(true);
            }
        }
        if(finalCik) {
            props.parentSetCik(finalCik);
            props.parentSetName(finalName);
            setShowAlert(false);
            sessionStorage.setItem('cik', finalCik);
            sessionStorage.setItem('name', finalName);
        }
        props.parentSetInput(value);
        sessionStorage.setItem('userInput', value);
        e.preventDefault();
    }

    return (
        <div>
            <form className="input-group mb-3" onSubmit={handleSubmit}>
                <input type="text" list="tickers" value={value} className="form-control" placeholder="Ticker" onChange={onTextChanged} aria-label="Ticker" aria-describedby="button-addon2"/>
                {getSuggestions()}
                <input className="btn btn-outline-secondary" type="submit" value="Go" id="button-addon2"/>
            </form>
            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Invalid name/ticker entered
            </Alert>
        </div>
    );
}

export default SearchBar;
