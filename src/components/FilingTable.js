import {Table} from "react-bootstrap";

const formDescription = {
    "10-K" : "Annual Report",
    "10-Q" : "Quarterly Report",
}

function FilingTable(props) {

    const fillTable = () => {
        const recent = props.submissions["filings"]["recent"];
        return recent["form"].map((form,ind) => {
            if(form === "10-K" || form === "10-Q") {
                const accNum = recent["accessionNumber"][ind].replace(/-/g,'');
                const doc=recent["primaryDocument"][ind];
                const link = `https://www.sec.gov/ix?doc=/Archives/edgar/data/${props.cik}/${accNum}/${doc}`;
                return (
                    <tr key={ind}>
                        <td>{form}</td>
                        <td><a rel="noreferrer" target="_blank" href={link}>{formDescription[form]}</a></td>
                        <td>{recent["filingDate"][ind]}</td>
                        <td>{recent["reportDate"][ind]}</td>
                    </tr>
                )
            } else return null;
        });
    }

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Form type</th>
                    <th>Form Description</th>
                    <th>Filing Date</th>
                    <th>Reporting Date</th>
                </tr>
            </thead>
            <tbody>
                {fillTable()}
            </tbody>
        </Table>
    );
}

export default FilingTable;