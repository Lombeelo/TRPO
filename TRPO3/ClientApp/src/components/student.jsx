import React , {useState} from 'react';
import "./button.css";

const Student = function () {
    const [Visibility, setVisibility] = useState(false);

    function OpenStudent() {
        setVisibility (true);

    }

    return (
        <div>
            <h1>{Visibility}</h1>
            <button className = "Student" onClick = {OpenStudent}> Студент </button>
        </div>
    );

};

export default Student;