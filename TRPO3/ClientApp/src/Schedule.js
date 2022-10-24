import React, {useState} from "react";
import "./App.css";
import {useLocation, setLocationState} from "react-router-dom";
import ScheduleCard from "./components/Schedule/schedule_card";

import Lesson from "./components/Schedule/schedule_filters/subject";
import Type from "./components/Schedule/schedule_filters/type";
import Week_Day from "./components/Schedule/schedule_filters/week_day";
import Study_Week from "./components/Schedule/schedule_filters/study_week";
import Subject from "./components/Schedule/schedule_filters/subject";
import Pair_Card from "./components/Schedule/pair_card";

function Schedule (props) {

    //Передаём состояния, откуда прибыли + группу и ФИО преподавателя
    const location  = useLocation();
    const [locationState, setLocationState] = React.useState({from: '', group: '', fio: ''})

    React.useState (() => {
        if (location.state) {
            setLocationState(location.state)
        }
    })

    const [week, setWeek] = useState("default")

    const [filter, setFilter] = useState ([
        {week_f: null, week_day_f: null, subject_f: null, type_f: null}]);

    const [filter_type, setFilterType] = useState ("null");

    const handleCallback = (childData, filter_t) =>{
        setFilterType(filter_t);
        switch (filter_t) {
            case "week":
                if (childData !== "Учебная неделя") return setFilter({week_f: childData});
                else return setFilter({week_f: null});
            case "weekday":
                if (childData !== "День недели") return setFilter({week_day_f: childData});
                else return setFilter({week_day_f: null});
            case "subject":
                if (childData !== "Предмет") return setFilter({subject_f: childData});
                else return setFilter({subject_f: null});
            case "subj_type":
                if (childData !== "Тип занятия") return setFilter({type_f: childData});
                else return setFilter({type_f: null});
            default:
                return null;
        };
    }





    const [days, setDays] = useState ([
        {id: 1, day_date: "10.10", weekday: "Понедельник"},
        {id: 2, day_date: "11.10", weekday: "Вторник"}
    ])

    const [weeks, setWeeks] = useState ([
        {id: 0, week: "Учебная неделя"},
        {id: 1, week: "1-я (01.09 - 07.09)"},
        {id: 2, week: 2}
    ])

    const [weekdays, setWeekdays] = useState ([
        {id: 0, weekday: "День недели"},
        {id: 1, weekday: "Понедельник"},
        {id: 2, weekday: "Вторник"},
        {id: 3, weekday: "Среда"},
        {id: 4, weekday: "Четверг"},
        {id: 5, weekday: "Пятница"},
        {id: 6, weekday: "Суббота"},
        {id: 7, weekday: "Воскресенье"}
    ])

    const [subjects, setSubjects] = useState ([
        {id: 0, subject_name:"Предмет"},
        {id: 1, subject_name:"ТАУ"},
        {id: 2}
    ])

    const [pair_types, setPair_types] = useState ([
        {id: 0, pair_type:"Тип занятия"},
        {id: 1, pair_type:"Лекция"},
        {id: 2, pair_type:"ПЗ"},
        {id: 3, pair_type:"ЛР"}

    ])

    return (

        <div className = "App">
            <Study_Week weeks = {weeks} key = {weeks.id} parentCallback = {handleCallback} />
            <Week_Day weekdays = {weekdays} key = {weekdays.id} parentCallback = {handleCallback}/>
            <Subject subjects = {subjects} key = {subjects.id} parentCallback = {handleCallback}/>
            <Type pair_types = {pair_types} key = {pair_types.id} parentCallback = {handleCallback}/>
            <div>
                {days.map(days =>
                        <ScheduleCard days = {days} key = {days.id}/>
                )}
            </div>
        </div>
    );

}

export default Schedule;