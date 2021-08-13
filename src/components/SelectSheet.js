import {Button, ButtonGroup} from "react-bootstrap";

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
                <Button variant="secondary" value="is" active={handleActive("is")} selected={true}>Income Statement</Button>
                <Button variant="secondary" value="cfs" active={handleActive("cfs")}>Cash Flow Statement</Button>
                <Button variant="secondary" value="bs" active={handleActive("bs")}>Balance Sheet</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectSheet;