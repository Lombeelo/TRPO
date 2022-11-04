import React, { useState } from "react";
import MultiSelect from 'react-multiple-select-dropdown-lite';

import "./schedule_styles/schedule_card.css";
import "./schedule_styles/subject_name.css";
import "./schedule_styles/teacher_fio.css";
import "./schedule_styles/time.css";
import "./schedule_styles/subject_type.css";
import "./schedule_styles/cabinet.css";
import "./schedule_styles/group_list.css";
import "../Buttons/button.css";


import "react-multiple-select-dropdown-lite/dist/index.css";


function Pair_Card(props) {


    const inEdit = props.editing;

    const [newInfo, setEditInfo] = useState([
        {
            id: 0, new_subject: props.pairs.subj_name, new_teach_fio: props.pairs.teach_fio, new_pair_type: props.pairs.pair_type,
            new_cabinet: props.pairs.cabinet, new_group_list: props.pairs.groups
        },

        {
            id: 1, new_subject: "Матан", new_teach_fio: "Чечиков Юрий Борисович", new_pair_type: "Лекция",
            new_cabinet: "228", new_group_list: "М3О-307Б-20, М3О-309Б-20"
        }
    ])

    const [sel_subj, setSelSubj] = useState("default")
    const handleChangeSubj = (event) => {
        setSelSubj(event.target.value)
    }

    const [sel_fio, setSelFio] = useState("default")
    const handleChangeFio = (event) => {
        setSelFio(event.target.value)
    }

    const [sel_type, setSelType] = useState("default")
    const handleChangeType = (event) => {
        setSelType(event.target.value)
        if (event.target.value == "Лекция") ChangeG();
        else if (event.target.value == "ЛР") ChangeMF();
        else if (event.target.value == "ПЗ") {
            if (mf_flag == false) ChangeMF();
            if (g_flag == false) ChangeG();
        }

    }

    const [sel_cabinet, setSelCabinet] = useState("default")
    const handleChangeCabinet = (event) => {
        setSelCabinet(event.target.value)
    }

    const [sel_groups, setSelGroups] = useState("default")
    const handleChangeGroups = (event) => {
        setSelGroups(event.target.value)
    }

    //------------------------------------------------------------

    const [value_groups, setValueGroups] = useState("");
    const handleOnchangeGroups = (value_groups) => {
        if (value_groups.count <= 1) setValueGroups(value_groups);
    }
    const group_options = [
        { label: "307Б", value: "М3О-307Б-20" },
        { label: "309Б", value: "М3О-309Б-20" },
        { label: "310Б", value: "М3О-310Б-20" }
    ];


    const [value_fio, setValueFio] = useState("");
    const handleOnchangeFio = (value_fio) => {
        if (value_fio.count <= 1) setValueFio(value_fio);
    }
    const fio_options = [
        { label: "Вестяк А.В", value: "Вестяк Анатолий Васильевич" },
        { label: "Вестяк А.В", value: "Вестяк Анатолий Васильевич" }
    ]

    const [mf_flag, setMFflag] = useState(true);
    const [g_flag, setGflag] = useState(true);

    function ChangeMF() {
        setMFflag(!mf_flag);
    }

    function ChangeG() {
        setGflag(!g_flag);
    }
    //----------------------------------------------------------

    function Remove() {

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
                    {/* <div className="time"> {props.pairs.time} </div>
                    <select className="lesson_name_sel" value={sel_subj} onChange={handleChangeSubj}>
                        {newInfo.map(newInfos =>
                            <option key={newInfos.id} value={newInfos.new_subject}>{newInfos.new_subject}</option>)}
                    </select>

                    <MultiSelect
                        className="teacher_fio_sel" onChange={handleOnchangeFio} options={fio_options}
                        singleSelect={mf_flag} />


                    <select className="lesson_type_sel" value={sel_type} onChange={handleChangeType}>
                        {newInfo.map(newInfos =>
                            <option key={newInfos.id} value={newInfos.new_pair_type}>{newInfos.new_pair_type}</option>)}
                    </select>

                    <select className="cabinet_sel" value={sel_cabinet} onChange={handleChangeCabinet}>
                        {newInfo.map(newInfos =>
                            <option key={newInfos.id} value={newInfos.new_cabinet}>{newInfos.new_cabinet}</option>)}
                    </select>

                    <MultiSelect
                        className="group_list_sel" onChange={handleOnchangeGroups} options={group_options}
                        singleSelect={g_flag} /> */}

                    
                    <button className="Pair_Editing" ></button>
                    <button className = "Pair_Removal"> </button>
                </div>
            }

        </div>
    )
}

export default Pair_Card;