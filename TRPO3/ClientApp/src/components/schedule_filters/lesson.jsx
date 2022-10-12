import React, {useState} from "react";
import "./filters.css"

function Lesson () {
    const [lesson, setLesson] = useState("Предмет")

    const handleChange = (event) => {
        setLesson(event.target.value)
    }

    return (
        <div className = "App">

            <form>
                <select className = "lesson" value={lesson} onChange={handleChange}>
                    <label>Номер группы </label>
                    <option value="ТРПО">ТРПО</option>
                    <option value="Экология">Экология</option>
                    <option value="ТАУ">ТАУ</option>
                </select>

            </form>
        </div>
    );
}

export default Lesson;