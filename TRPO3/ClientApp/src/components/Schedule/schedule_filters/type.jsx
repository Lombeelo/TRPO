import React, {useState} from "react";
import "./filters.css"

function Type (props) {
    const [type, setType] = useState("default")

    const handleChange = (event) => {
        setType(event.target.value)
        props.parentCallback(event.target.value, "subj_type")
    }

    return (
        <div>
            <form>
                <select className = "type" value={type} onChange={handleChange}>
                    {props.pair_types.map(pair_types =>
                        <option disabled = {props.disabled? true: false} key = {pair_types.id} value = {pair_types.name}>{pair_types.name}</option>)}
                </select>
            </form>
        </div>
    );
}

export default Type;