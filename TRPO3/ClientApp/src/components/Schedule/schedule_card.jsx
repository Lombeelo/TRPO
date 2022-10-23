import React, {useState} from "react";

import Pair_Card from "./pair_card";

import "./schedule_styles/schedule_card.css";
import "./schedule_styles/subject_name.css";
import "./schedule_styles/teacher_fio.css";
import "./schedule_styles/time.css";
import "./schedule_styles/subject_type.css";
import "./schedule_styles/cabinet.css";


function ScheduleCard (props) {

    const [pairs, setPairs] = useState ([
        {id: 1, time: '9:00-10:30', subj_name: "Теория автоматического управления", teach_fio: "Вестяк Анатолий Васильевич",
            pair_type: "ПЗ", cabinet: 303, groups: "М3О-309Б-20"},
        {id: 2, time: '10:45-12:15', subj_name: "Теория автоматического управления", teach_fio: "Вестяк Анатолий Васильевич",
            pair_type: "Лекция", cabinet: "Гук-В 221", groups: "М3О-309Б-20, М3О-307Б-20Б, М3О-310Б-20"}
    ])

    return (


        <div className = "list_elem_card">
            <div>
                <span className = "date_text"> {props.days.weekday} {props.days.day_date}</span>
            </div>

            {pairs.map(pairs =>
                <Pair_Card pairs = {pairs} key = {pairs.id}/>
                )}
        </div>

    );

}

export default ScheduleCard;