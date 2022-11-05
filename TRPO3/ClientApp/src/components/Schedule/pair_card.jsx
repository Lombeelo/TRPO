import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import "./schedule_styles/schedule_card.css";
import "./schedule_styles/subject_name.css";
import "./schedule_styles/teacher_fio.css";
import "./schedule_styles/time.css";
import "./schedule_styles/subject_type.css";
import "./schedule_styles/cabinet.css";
import "./schedule_styles/group_list.css";
import "../Buttons/button.css";


import "react-multiple-select-dropdown-lite/dist/index.css";



import { callApiPost } from '../../requests.js';


function Pair_Card(props) {


    // REMINDER
    // USE "DeleteEntryById" API CALL TO REMOVE ENTRY
    // INPUT "{ id: int }"
    // RETURNS "true or UnprocessableEntity exception"

    const inEdit = props.editing;

    function onRemove() {
        callApiPost("DeleteEntryById", {
            id: props.pairs.id
        }, (resp) => {
        })
        props.parentCallback();
    }

    return (
        <div className="pair_card">
            <div>
                    <div className="time"> {props.pairs.time} </div>
                    <div className="lesson_name">{props.pairs.subj_name}  </div>
                    <div className="teacher_fio">{props.pairs.teach_fio} </div>
                    <div className="lesson_type">{props.pairs.pair_type} </div>
                    <div className="cabinet">{props.pairs.cabinet}</div>
                    <div className="group_list">{props.pairs.groups}</div>
                </div>

            {props.editing == false ?
                <div>
                    
                </div>
                :
                <div> 
                        <Link to="/AddingPage" state = {{editingId: props.pairs.id}}><button className="Pair_Editing"></button></Link>
                    <button className = "Pair_Removal" onClick = {onRemove}> </button>
                </div>
            }

        </div>
    )
}

export default Pair_Card;