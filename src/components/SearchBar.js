import { toUpper } from "lodash";
import {useState, useEffect} from "react";
import dict from "../resources/company_tickers.json";
import {Alert} from "react-bootstrap";


let tickers = [];
let names = [];
let tickToCik = {};
let nameToTick = {};
let tickToName = {};

function SearchBar(props) {
    const MAX_SUGGESTIONS = 50;
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState(props.input);
    const [showAlert,setShowAlert] = useState(false);

    const loadTickers = () => {
        const c = "cik_str", n = "title", t = "ticker";
        for(const key in dict) {
            const obj = dict[key];
            tickToCik[toUpper(obj[t])] = obj[c];
            nameToTick[obj[n]] = toUpper(obj[t]);
            tickToName[toUpper(obj[t])] = obj[n];
        }
        tickers = Object.keys(tickToCik).sort();
        names = Object.keys(nameToTick).sort();
    }

    useEffect(() => {
        loadTickers();
    }, []);

    // can be optimized
    const onTextChanged = (e) => {
        const val = e.target.value;
        setValue(val);
        if(suggestions.includes(val)) {
            submitVal(val);
            return;
        }
        let allSug = [];
        let sug1 = [];
        let sug2 = [];
        try {
            if (val.length > 0) {
                const regex = new RegExp(`^${encodeURI(val)}`, 'i');
                sug1 = tickers.filter(v => regex.test(v));
                sug2 = names.filter(v => regex.test(v));
                sug2 = sug2.map(str => {
                    if (!sug1.includes(nameToTick[str])) {
                        return `(${nameToTick[str]}) ${str}`;
                    } else return null;
                });
                sug1 = sug1.map(str => {
                    return `(${str}) ${tickToName[str]}`;
                });
                allSug = sug1.concat(sug2);
                allSug.sort();
                allSug = allSug.slice(0, MAX_SUGGESTIONS);
            }
            setSuggestions(allSug);
        } catch (e) {
            console.log(e);
        }
    }

    const getSuggestions = () => {
        return (
            <datalist id='tickers'>
                {suggestions.map((item,index)=><option key={index} value={item}/>)}
            </datalist>
        );
    }

    const handleSubmit = (e) => {
        submitVal(e.target.value);
        e.preventDefault();
    }

    const submitVal = (val) => {
        let finalCik = null, finalName = null;
        if(toUpper(val) in tickToCik) {
            const cikNum = tickToCik[toUpper(val)];
            let cik = cikNum.toString();
            while(cik.length < 10) {
                cik = '0' + cik;
            }
            finalName = tickToName[toUpper(val)];
            finalCik = cik;
        } else if(val in nameToTick) {
            const cikNum = tickToCik[nameToTick[val]];
            let cik = cikNum.toString();
            while(cik.length < 10) {
                cik = '0' + cik;
            }
            finalName = val;
            finalCik = cik;
        } else {
            let input = val;
            if(!suggestions.includes(input) && suggestions.length > 0) {
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
        props.parentSetInput(val);
        sessionStorage.setItem('userInput', val);
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
