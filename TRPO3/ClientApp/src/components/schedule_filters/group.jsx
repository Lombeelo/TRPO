import React, {useState} from "react";
import "./filters.css"

function Group () {
    const [myGroup, setMyGroup] = useState("Номер группы")

    const handleChange = (event) => {
        setMyGroup(event.target.value)
    }

    return (
        <div className = "App">

            <form>
                <select className = "group" value={myGroup} onChange={handleChange}>
                    <label>Номер группы </label>
                    <option value="М3О-307Б-20">М3О-307Б-20</option>
                    <option value="М3О-309Б-20">М3О-309Б-20</option>
                    <option value="М3О-310Б-20">М3О-310Б-20</option>
                </select>

            </form>
        </div>
    );
}

export default Group;