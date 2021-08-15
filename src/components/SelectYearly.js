import {Button, ButtonGroup} from "react-bootstrap";

const variant="secondary";

function SelectYearly(props) {
    const handleClick = (e) => {
        props.parentSetYearly(e.target.value);
    }


    return (
        <div>
            <ButtonGroup onClick={handleClick} size="sm">
                <Button variant={variant} value={false} active={!props.yearly}>By Quarter</Button>
                <Button variant={variant} value={true} active={props.yearly}>By Year</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectYearly;