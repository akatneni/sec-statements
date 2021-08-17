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
    const CASH_KEY = "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents";
    let millions = false;

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
            return yearly ? val["form"] === "10-K" : val["form"] === "10-Q" || val["form"] === "10-K" ;
        }
        if(val["frame"]) {
            return yearly ? val["frame"].length === 6 : val["frame"].length === 8;
        }
        return false;
    }

    const isValidDate = (form) => {
        return yearly ? form === "10-K" : form === "10-Q" || form === "10-K";
    }

    const getVals = (usdVals,str) => {
        let vals = [];
        let count = 0;
        for(let i=usdVals.length-1;i>=0 && count<FORM_COUNT;--i) {
            if(isValidVal(usdVals[i],str)) {
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
                    val /= (millions ? 1000000 : 1000);
                    val = Math.round(val);
                }
                if(val === -0) {
                    val = 0;
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
        indices = indices.map((val) => {return filings["reportDate"][val];});
        while(indices.length < FORM_COUNT) {
            const lastDate = indices[indices.length-1];
            const newYear =  parseInt(lastDate.substr(0,4))-1;
            indices.push(newYear + lastDate.substring(4));
        }
        return indices.map((val, ind) => {
            return (<th key={ind}>{val}</th>);
        });
    }

    const fillData = () => {
        let set = false;
        let revenueArr = props.data["facts"]["us-gaap"]["RevenueFromContractWithCustomerExcludingAssessedTax"];
        if(revenueArr) {
            revenueArr = revenueArr["units"]["USD"];
            if(revenueArr && revenueArr[revenueArr.length-1]["val"]>10000000000) {
                millions = true;
                set = true;
            } else if(revenueArr){
                set = false;
            }
        }
        return allKeys[sheet].map((str, ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if (keyData) {
                let usdVals = [];
                for (const key in keyData["units"]) {
                    usdVals = usdVals.concat(keyData["units"][key]);
                }
                const label = keyData["label"];
                let vals = getVals(usdVals,str);
                if(!set && ind===0 && vals[0]>10000000000) {
                    set = true;
                    millions = true;
                }
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
        const colHeader = getColHeader();
        const dates = fillDates();
        const tableData = fillData();
        return (
            <div className="statement-table">
                <div className="table-settings">
                    <div className="select-sheet">
                        <SelectSheet sheet={sheet} parentSetSheet={setSheet}/>
                    </div>
                    <div className="select-yearly">
                        <SelectYearly yearly={yearly} parentSetYearly={setYearly}/>
                    </div>
                </div>
                <h6 className="caption">(in {millions ? "millions" : "thousands"})</h6>
                <Table striped bordered hover size="sm">
                    <thead className="statement-header">
                        {colHeader}
                    <tr>
                        <th className="label"/>
                        {dates}
                    </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </Table>
            </div>);
    } else return null;
}

export default StatementTable;
