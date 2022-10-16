import React, {useState} from "react";
import "./filters.css"

function Week_Day () {
    const [weekday, setWeekday] = useState("День недели")

    const handleChange = (event) => {
        setWeekday(event.target.value)
    }

    return (
        <div>

            <form>
                <select className = "weekday" value={weekday} onChange={handleChange}>
                    <label>День недели </label>
                    <option value="Понедельник">Понедельник</option>
                    <option value="Вторник">Вторник</option>
                    <option value="Среда">Среда</option>
                    <option value="Четверг">Четверг</option>
                    <option value="Пятница">Пятница</option>
                    <option value="Суббота">Суббота</option>
                    <option value="Воскресенье">Воскресенье</option>
                </select>

            </form>
        </div>
    );
}

export default Week_Day;