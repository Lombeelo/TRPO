import React, { useState } from "react";
import "./filters.css";

function Study_Week(props) {
    const [week, setWeek] = useState(null)

    const handleChange = (event) => {
        setWeek(event.target.value)
        props.parentCallback(event.target.value, "week")
    }


    return (
        <div>

            <form>
                <select className="week" value={week} onChange={handleChange}>
                    {props.weeks.map(weeks =>
                        <option key={weeks.id}
                            value={weeks.id}>

                            {weeks.id == 0 ?
                                weeks.text
                                :

                                ((new Date(weeks.weekBeginDate)).toLocaleDateString() + ' - ' +
                                    (new Date(weeks.weekEndDate)).toLocaleDateString())}  </option>)}
                </select>

            </form>
        </div>

    );
}

export default Study_Week;