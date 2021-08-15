import {Button, ButtonGroup} from "react-bootstrap";

const variant="primary";

function SelectSubmissions(props) {
    const handleClick = (e) => {
        props.parentSetShowSubmissions(e.target.value==="true");
    }

    return (
        <div>
            <ButtonGroup onClick={handleClick}>
                <Button variant={variant} value={false} active={!props.showSubmissions}>Statements</Button>
                <Button variant={variant} value={true} active={props.showSubmissions}>Filings</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectSubmissions;