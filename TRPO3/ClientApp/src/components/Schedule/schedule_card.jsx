import React, { useState } from "react";

import Pair_Card from "./pair_card";

import "./schedule_styles/schedule_card.css";
import "./schedule_styles/subject_name.css";
import "./schedule_styles/teacher_fio.css";
import "./schedule_styles/time.css";
import "./schedule_styles/subject_type.css";
import "./schedule_styles/cabinet.css";


function ScheduleCard(props) {

    const day =
    {
        day_date: (new Date(props.propsdate)).toLocaleDateString(),
        weekday: (new Date(props.propsdate)).toLocaleString('default', { weekday: 'long' })
    }

    const para_time = ["9:00-10:30",
        "10:45-12:15",
        "13:00-14:30",
        "14:45-16:15",
        "16:30-18:00",
        "18:15-19:45",
        "20:00-21:30"]


    props.scheduleObject.sort((a, b) => a.para - b.para);

    // function ForceRender() {
    //     props.parentCallback();
    // }

    const pairs = props.scheduleObject.map((schObj) => {
        return {
            id: schObj.id,
            time: para_time[schObj.para - 1],
            subj_name: schObj.subject.name,
            teach_fio: schObj.professors.map((schObjProff) => schObjProff.name).join(", \n"),
            pair_type: schObj.type.name,
            cabinet: schObj.cabinet,
            groups: schObj.groups.map((schObjGroups) => schObjGroups.name).join(", ")
        }
    })


    return (


        <div className="list_elem_card">
            <div>
                <span className="date_text"> {day.day_date}, {day.weekday}</span>
            </div>
            {pairs.map(pairs =>
                <Pair_Card pairs={pairs} editing={props.propsediting} key={pairs.time} 
                parentCallback = {(props.parentCallback)}
                />
            )}
        </div>

    );

}

export default ScheduleCard;