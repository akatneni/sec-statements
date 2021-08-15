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

    const getVals = (usdVals) => {
        let vals = [];
        let count = 0;
        for(let i=usdVals.length-1;i>=0 && count<FORM_COUNT;--i) {
            if(usdVals[i]["frame"] && usdVals[i]["frame"].includes("Q")) {
                vals.push(usdVals[i]["val"]);
                ++count;
            }
        }
        while(count < FORM_COUNT) {
            vals.push(0);
            ++count;
        }
        return vals;
    }

    const formatVals = (vals,str) => {
        for(let i=0;i<vals.length;++i) {
            let val = vals[i];
            if (!str.includes("PerShare")) {
                val /= 1000000
            }
            val = val < 0 ? "(" + val.toLocaleString().substr(1) + ")" : val.toLocaleString();
            vals[i] = val;
        }
        return vals;
    }

    const fillDates = () => {
        const filings = props.submissions["filings"]["recent"];
        let count = 0, i = 0, indices = [];
        while(count < FORM_COUNT && i < filings["form"].length) {
            if(filings["form"][i] === "10-Q"  || filings["form"][i]==="10-K") {
                indices.push(i);
                ++count;
            }
            ++i;
        }
        return indices.map((val, ind) => {
            return <th key={ind}>{filings["reportDate"][val]}</th>
        });
    }

    const fillData = () => {
        return allKeys[sheet].map((str, ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if (keyData) {
                let usdVals;
                for (const key in keyData["units"]) {
                    usdVals = keyData["units"][key];
                }
                const label = keyData["label"];
                let vals = getVals(usdVals);
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

    const createTable = () => {
        if(props.loaded) {
            return (
                <div>
                    <div className="select-sheet">
                        <SelectSheet sheet={sheet} parentSetSheet={setSheet}/>
                    </div>
                    <div className="select-yearly">
                        <SelectYearly yearly={yearly} parentSetYearly={setYearly}/>
                    </div>
                    <h6 className="caption">(in millions)</h6>
                    <Table striped bordered hover size="sm">
                        <thead className="statement-header">
                            <tr>
                                <th></th>
                                <th colSpan={FORM_COUNT}>Three Months Ended</th>
                            </tr>
                            <tr>
                                <th></th>
                                {fillDates()}
                            </tr>
                        </thead>
                        <tbody>
                            {fillData()}
                        </tbody>
                    </Table>
                </div>);
        }
    }

    return (
        <div>
            {createTable()}
        </div>
    );
}

export default StatementTable;
