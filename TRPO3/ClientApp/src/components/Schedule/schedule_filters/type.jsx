import React, {useState} from "react";
import "./filters.css"

function Type (props) {
    const [type, setType] = useState("default")

    const handleChange = (event) => {
        setType(event.target.value)
        props.parentCallback(event.target.value)
    }

    return (
        <div>
            <form>
                <select className = "type" value={type} onChange={handleChange}>
                    {props.pair_types.map(pair_types =>
                        <option key = {pair_types.id} value = {pair_types.pair_type}>{pair_types.pair_type}</option>)}
                </select>
            </form>
        </div>
    );
}

export default Type;