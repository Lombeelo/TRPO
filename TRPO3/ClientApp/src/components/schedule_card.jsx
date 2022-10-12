import React from "react"

import "./schedule_card.css";


function ScheduleCard () {

    return (
        <div className = "list_elem">
            <div className = "list_elem_card">

                <div className = "date">
                    <p className = "date_text">ПН
                    10.10</p>
                </div>

                <div className = "pair_card">
                    <p className = "time"> 9:00 - 10:30 </p>
                    <p className = "lesson"> Теория автоматического управления </p>
                    <p className = "teacher">Аоаоа Ао АО</p>
                    <p className = "type">ПЗ</p>
                    <p className = "cabinet">3-403</p>
                </div>

            </div>
        </div>
    );

}

export default ScheduleCard;