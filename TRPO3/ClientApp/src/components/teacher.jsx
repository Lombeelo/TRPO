import React , {useState} from 'react';
import "./button.css";

const Teacher = function () {
    const [Visibility, setVisibility] = useState(false);

    function OpenTeacher() {
        setVisibility (true);

    }



    return (
        <div>
            <h1>{Visibility}</h1>
            <button className = "Teacher" onClick = {OpenTeacher}> Преподаватель </button>
        </div>
    );

};

export default Teacher;