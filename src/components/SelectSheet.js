import {Button, ButtonGroup} from "react-bootstrap";
import {sheets} from "./constants"

const variant = "secondary";

function SelectSheet(props) {

    const handleClick = (e) => {
        props.parentSetSheet(e.target.value);
    }

    const handleActive = (sheet) => {
        return sheet === props.sheet;
    }

    return (
        <div>
            <ButtonGroup onClick={handleClick}>
                <Button variant={variant} value={sheets.IS} active={handleActive(sheets.IS)} selected={true}>Income Statement</Button>
                <Button variant={variant} value={sheets.CFS} active={handleActive(sheets.CFS)}>Cash Flow Statement</Button>
                <Button variant={variant} value={sheets.BS} active={handleActive(sheets.BS)}>Balance Sheet</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectSheet;