import {Button, ButtonGroup} from "react-bootstrap";
import {sheets} from "./constants"

const variant = "secondary";

function SelectSheet(props) {

    const handleClick = (e) => {
        props.parentSetSheet(e.target.value);
    }

    const isActive = (sheet) => {
        return sheet === props.sheet;
    }

    return (
        <div>
            <ButtonGroup onClick={handleClick} size="sm">
                <Button variant={variant} value={sheets.IS} active={isActive(sheets.IS)}>Income Statement</Button>
                <Button variant={variant} value={sheets.CFS} active={isActive(sheets.CFS)}>Cash Flow Statement</Button>
                <Button variant={variant} value={sheets.BS} active={isActive(sheets.BS)}>Balance Sheet</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectSheet;