import {Button, ButtonGroup} from "react-bootstrap";
import {useState} from "react";

function SelectSheet(props) {

    const [initActive,setInitActive] = useState(true);

    const handleClick = (e) => {
        props.parentSetSheet(e.target.value);
        setInitActive(false);
    }

    return (
        <div>
            <ButtonGroup onClick={handleClick}>
                <Button variant="secondary" value="is" active={initActive} selected={true}>Income Statement</Button>
                <Button variant="secondary" value="cfs">Cash Flow Statement</Button>
                <Button variant="secondary" value="bs">Balance Sheet</Button>
            </ButtonGroup>
        </div>
    )
}

export default SelectSheet;