import React from "react";
import "./schedule_styles/schedule_card.css";
import "./schedule_styles/subject_name.css";
import "./schedule_styles/teacher_fio.css";
import "./schedule_styles/time.css";
import "./schedule_styles/subject_type.css";
import "./schedule_styles/cabinet.css";
import "./schedule_styles/group_list.css";


function Pair_Card (props) {

    return (
        <div className = "pair_card">

            <div>
                <div className="time"> {props.pairs.time} </div>
                <div className="lesson_name">{props.pairs.subj_name}  </div>
                <div className="teacher_fio">{props.pairs.teach_fio} </div>
                <div className="lesson_type">{props.pairs.pair_type} </div>
                <div className="cabinet">{props.pairs.cabinet}</div>
                <div className="group_list">{props.pairs.groups}</div>

            </div>

        </div>
    )

}

export default Pair_Card;