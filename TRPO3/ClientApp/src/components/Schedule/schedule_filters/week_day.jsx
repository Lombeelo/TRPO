import React, {useState} from "react";
import "./filters.css";

function Week_Day (props) {


    const weekdays = props.weekdays;

    const [weekday, setWeekday] = useState("default")

    const handleChange = (event) => {
        setWeekday(event.target.value)
    }

    return (
        <div>
            <form>
                    <select className = "weekday" value={weekday} onChange={handleChange}>
                        {weekdays.map(weekdays =>
                            <option key = {weekdays.id} value = {weekdays.weekday}>{weekdays.weekday}</option>)}
                    </select>
            </form>
        </div>
);
}
export default Week_Day;