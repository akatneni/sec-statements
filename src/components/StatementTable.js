import {Table} from "react-bootstrap";
import {allKeys} from "./StatementKeys";
import "./StatementTable.css";

function StatementTable(props) {

    const fillIncome = () => {
        const rows = allKeys[props.sheet].map((str,ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if(keyData) {
                const usdVals = keyData["units"]["USD"];
                const label = keyData["label"];
                let val = usdVals[usdVals.length - 1]["val"];
                if(!str.includes("PerShare")) {
                    val /= 1000000
                }
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        <td className="data">{val}</td>
                    </tr>
                );
            } else return null;
        });
        return rows;
    }

    const fillCashFlow = () => {
        const rows = allKeys[props.sheet].map((str,ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if(keyData) {
                const usdVals = keyData["units"]["USD"];
                const label = keyData["label"];
                let val = usdVals[usdVals.length - 1]["val"];
                if(!str.includes("PerShare")) {
                    val /= 1000000
                }
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        <td className="data">{val}</td>
                    </tr>
                );
            } else return null;
        });
        return rows;
    }

    const fillBalance = () => {
        const rows = allKeys[props.sheet].map((str,ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if(keyData) {
                const usdVals = keyData["units"]["USD"];
                const label = keyData["label"];
                let val = usdVals[usdVals.length - 1]["val"];
                if(!str.includes("PerShare")) {
                    val /= 1000000
                }
                return (
                    <tr key={ind}>
                        <td className="label">{label}</td>
                        <td className="data">{val}</td>
                    </tr>
                );
            } else return null;
        });
        return rows;
    }

    const fillData = () => {
        if(props.sheet === "is") {
            return fillIncome();
        } else if(props.sheet === "cfs") {
            return fillCashFlow();
        } else if(props.sheet === "bs") {
            return fillBalance();
        }
    }

    const createTable = () => {
        if(props.loaded) {
            return (
                <Table striped bordered hover size="sm">
                    <tbody>
                    {fillData()}
                    </tbody>
                </Table>);
        }
    }

    return (
        <div>
            {createTable()}
        </div>
    );
}

export default StatementTable;
