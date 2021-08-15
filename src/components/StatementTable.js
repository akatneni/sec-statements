import {Table} from "react-bootstrap";
import {allKeys, sheets} from "./constants";
import "./StatementTable.css";
import {useState} from "react";
import SelectSheet from "./SelectSheet";
import SelectYearly from "./SelectYearly";

const FORM_COUNT = 3;

function StatementTable(props) {

    const [sheet,setSheet] = useState(sheets.IS);
    const [yearly,setYearly] = useState(false);
    let endDates = [];
    const CASH_KEY = "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents";

    const getColHeader = () => {
        if(sheet !== sheets.BS) {
            return (
                <tr>
                    <th className="label"/>
                    <th colSpan={FORM_COUNT}>{yearly ? "Twelve Months Ended" : "Three Months Ended"}</th>
                </tr>)
        }
    }

    const isValidVal = (val, str) => {
        if(sheet === sheets.BS || str === CASH_KEY) {
            return endDates.includes(val["end"]);
        }
        return yearly ? val["frame"].length === 6 : val["frame"].length === 8;
    }

    const isValidDate = (form) => {
        return yearly ? form === "10-K" : form === "10-Q" || form === "10-K";
    }

    const getVals = (usdVals,str) => {
        let vals = [];
        let count = 0;
        for(let i=usdVals.length-1;i>=0 && count<FORM_COUNT;--i) {
            if(usdVals[i]["frame"] && isValidVal(usdVals[i],str)) {
                vals.push(usdVals[i]["val"]);
                ++count;
            }
        }
        while(count < FORM_COUNT) {
            vals.push("N/A");
            ++count;
        }
        return vals;
    }

    const formatVals = (vals,str) => {
        for(let i=0;i<vals.length;++i) {
            let val = vals[i];
            if(!isNaN(val)) {
                if (!str.includes("PerShare")) {
                    val /= 1000000
                }
                if (Math.abs(val) > 100) {
                    val = Math.round(val);
                }
                val = val < 0 ? "(" + val.toLocaleString().substr(1) + ")" : val.toLocaleString();
                vals[i] = val;
            }
        }
        return vals;
    }

    const fillDates = () => {
        const filings = props.submissions["filings"]["recent"];
        let count = 0, i = 0, indices = [];
        while(count < FORM_COUNT && i < filings["form"].length) {
            if(isValidDate(filings["form"][i])) {
                indices.push(i);
                ++count;
            }
            ++i;
        }
        endDates = [];
        return indices.map((val, ind) => {
            endDates.push(filings["reportDate"][val]);
            return (<th key={ind}>{filings["reportDate"][val]}</th>);
        });
    }

    const fillData = () => {
        return allKeys[sheet].map((str, ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if (keyData) {
                let usdVals = [];
                for (const key in keyData["units"]) {
                    usdVals = usdVals.concat(keyData["units"][key]);
                }
                const label = keyData["label"];
                let vals = getVals(usdVals,str);
                vals = formatVals(vals,str);
                const tableData = vals.map((val,ind) => {
                    return (<td className="data" key={ind}>{val}</td>);
                });
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        {tableData}
                    </tr>
                );
            } else return null;
        });
    }

    if(props.loaded) {
        return (
            <div>
                <div className="table-settings">
                    <div className="select-sheet">
                        <SelectSheet sheet={sheet} parentSetSheet={setSheet}/>
                    </div>
                    <div className="select-yearly">
                        <SelectYearly yearly={yearly} parentSetYearly={setYearly}/>
                    </div>
                </div>
                <h6 className="caption">(in millions)</h6>
                <Table striped bordered hover size="sm">
                    <thead className="statement-header">
                    {getColHeader()}
                    <tr>
                        <th className="label"/>
                        {fillDates()}
                    </tr>
                    </thead>
                    <tbody>
                    {fillData()}
                    </tbody>
                </Table>
            </div>);
    } else return null;
}

export default StatementTable;
