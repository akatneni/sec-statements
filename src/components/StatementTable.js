import {Table} from "react-bootstrap";
import {useState, useEffect} from "react";
import {allKeys} from "./StatementKeys";
import "./StatementTable.css";

function StatementTable(props) {
    const [sheet, setSheet] = useState(null);

    useEffect(() => {
        setSheet("is");
    },[]);

    const createTable = () => {
        if(props.loaded) {
            return (
                <Table striped bordered hover size="sm">
                    <tbody>
                    {allKeys[sheet].map((str) => {
                        const keyData = props.data["facts"]["us-gaap"][str];
                        if(keyData) {
                            const usdVals = keyData["units"]["USD"];
                            return (
                                <tr>
                                    <td className="label">{keyData["label"]}</td>
                                    <td className="data">{usdVals[usdVals.length - 1]["val"] / 1000000}</td>
                                </tr>
                            );
                        } else return null;
                    })}
                    </tbody>
                </Table>);
        }
    }

    return (
        <div>
            {createTable()}
        </div>
    )
}

export default StatementTable;
