import {Table} from "react-bootstrap";
import {sheets,allKeys} from "./constants";
import "./StatementTable.css";

function StatementTable(props) {

    const formatVal = (val,str) => {
        if (!str.includes("PerShare")) {
            val /= 1000000
        }
        val = val < 0 ? "(" + val.toLocaleString().substr(1) + ")": val.toLocaleString();
        return val;
    }

    const fillIncome = () => {
        return allKeys[props.sheet].map((str, ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if (keyData) {
                let usdVals;
                for (const key in keyData["units"]) {
                    usdVals = keyData["units"][key];
                }
                const label = keyData["label"];
                let val = usdVals[usdVals.length - 1]["val"];
                val = formatVal(val,str);
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        <td className="data">{val}</td>
                    </tr>
                );
            } else return null;
        });
    }

    const fillCashFlow = () => {
        return allKeys[props.sheet].map((str, ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if (keyData) {
                const usdVals = keyData["units"]["USD"];
                const label = keyData["label"];
                let val = usdVals[usdVals.length - 1]["val"];
                val = formatVal(val,str);
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        <td className="data">{val}</td>
                    </tr>
                );
            } else return null;
        });
    }

    const fillBalance = () => {
        return allKeys[props.sheet].map((str, ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if (keyData) {
                const usdVals = keyData["units"]["USD"];
                const label = keyData["label"];
                let val = usdVals[usdVals.length - 1]["val"];
                val = formatVal(val,str);
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        <td className="data">{val}</td>
                    </tr>
                );
            } else return null;
        });
    }

    const fillData = () => {
        if(props.sheet === sheets.IS) {
            return fillIncome();
        } else if(props.sheet === sheets.CFS) {
            return fillCashFlow();
        } else if(props.sheet === sheets.BS) {
            return fillBalance();
        }
    }

    const createTable = () => {
        if(props.loaded) {
            return (
                <div>
                    <h6 className="caption">(in millions)</h6>
                    <Table striped bordered hover size="sm">
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
