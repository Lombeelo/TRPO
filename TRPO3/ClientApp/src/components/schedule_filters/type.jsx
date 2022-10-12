import React, {useState} from "react";
import "./filters.css"

function Type () {
    const [type, setType] = useState("Тип предмета")

    const handleChange = (event) => {
        setType(event.target.value)
    }

    return (
        <div>

            <form>
                <select className = "type" value={type} onChange={handleChange}>
                    <label>Тип предмета </label>
                    <option value="Лекция">Лекция</option>
                    <option value="ПЗ">ПЗ</option>
                    <option value="ЛР">ЛР</option>
                </select>

            </form>
        </div>
    );
}

export default Type;