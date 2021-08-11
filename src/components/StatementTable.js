import {Table} from "react-bootstrap";
import {useState, useEffect} from "react";
import {allKeys} from "./StatementKeys";
import "./StatementTable.css";

function StatementTable(props) {
    const [sheet, setSheet] = useState(null);

    useEffect(() => {
        setSheet("is");
    },[]);


    const fillIncome = () => {
        const rows = allKeys[sheet].map((str,ind) => {
            const keyData = props.data["facts"]["us-gaap"][str];
            if(keyData) {
                const usdVals = keyData["units"]["USD"];
                return (
                    <tr key={ind}>
                        <td className="label">{keyData["label"]}</td>
                        <td className="data">{usdVals[usdVals.length - 1]["val"] / 1000000}</td>
                    </tr>
                );
            } else return null;
        });
        return rows;
    }

    const fillCashFlow = () => {

    }

    const fillBalance = () => {

    }

    const fillData = () => {
        if(sheet === "is") {
            return fillIncome();
        } else if(sheet === "cfs") {
            return fillCashFlow();
        } else if(sheet === "bs") {
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
        <div>{createTable()}</div>
    );
}

export default StatementTable;
