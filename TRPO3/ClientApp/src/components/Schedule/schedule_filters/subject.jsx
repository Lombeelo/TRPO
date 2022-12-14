import React, { useState } from "react";
import "./filters.css"

function Subject(props) {
    const [lesson, setLesson] = useState("default")

    const handleChange = (event) => {
        setLesson(event.target.value)
        props.parentCallback(event.target.value, "subject")
    }

    return (
        <div className="App">

            <form>
                <select className="lesson" value={lesson} onChange={handleChange}>
                    {props.subjects.map(subjects =>
                        <option disabled={props.disabled ? true : false} key={subjects.id} value={subjects.name}>{subjects.name}</option>)}
                </select>

            </form>
        </div>
    );
}

export default Subject;