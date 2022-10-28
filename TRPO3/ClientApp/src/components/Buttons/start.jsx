import React, { useState } from 'react';
import "./button.css";

const Start = function () {
    const [Visibility, setVisibility] = useState(false);

    function OpenSchedule() {
        setVisibility(true);
        alert();
    }

    return (
        <div>
            <h1>{Visibility}</h1>
            <button className="Start" onClick={OpenSchedule}> Открыть расписание </button>
        </div>
    );

};

export default Start;