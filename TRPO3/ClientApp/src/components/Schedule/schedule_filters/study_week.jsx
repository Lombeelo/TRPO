import React, {useState} from "react";
import "./filters.css";

function Study_Week (props) {
    const [week, setWeek] = useState("default")

    const handleChange = (event) => {
        setWeek(event.target.value)
        props.parentCallback(event.target.value)
    }


    return (
        <div>

            <form>
                <select className = "week" value={week} onChange={handleChange}>
                    {props.weeks.map(weeks =>
                        <option key = {weeks.id} value = {weeks.weekday}>{weeks.week}</option>)}
                </select>

            </form>
        </div>

    );
}

export default Study_Week;