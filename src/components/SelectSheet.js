import {Button, ButtonGroup} from "react-bootstrap";

const variant = "primary";

function SelectSheet(props) {

    const handleClick = (e) => {
        props.parentSetSheet(e.target.value);
    }

    const handleActive = (sheet) => {
        console.log(this);
        return sheet === props.sheet;
    }

    return (
        <div>
            <ButtonGroup onClick={handleClick}>
                <Button variant={variant} value="is" active={handleActive("is")} selected={true}>Income Statement</Button>
                <Button variant={variant} value="cfs" active={handleActive("cfs")}>Cash Flow Statement</Button>
                <Button variant={variant} value="bs" active={handleActive("bs")}>Balance Sheet</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectSheet;