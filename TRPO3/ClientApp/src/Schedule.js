import React, { useState } from "react";
import DateTime from "luxon";
import "./App.css";
import "./components/Buttons/button.css";
import "./components/Schedule/schedule_filters/filters.css";
import { useLocation, useNavigate } from "react-router-dom";
import ScheduleCard from "./components/Schedule/schedule_card";

import Study_Week from "./components/Schedule/schedule_filters/study_week";

import startAndEndOfWeek from "./WeekDays";

import { callApiGet, callApiPost } from "./requests.js";

import { weekNumber } from 'weeknumber';

function Schedule(props) {

    // REMINDER
    // USE "DeleteEntryById" API CALL TO REMOVE ENTRY
    // INPUT "{ id: int }"
    // RETURNS "true or UnprocessableEntity exception"

    const [scheduleObject, setScheduleObject] = useState(
        [
            {
                id: 1,
                date: "2022-10-23T00:00:00",
                para: 2,
                cabinet: 304,
                subject: {
                    id: 1,
                    name: "Теория графов"
                },
                type: {
                    id: 1,
                    name: "ЛК"
                },
                groups: [
                    {
                        id: 1,
                        name: "М3О-309Б-20"
                    },
                    {
                        id: 2,
                        name: "М3О-307Б-20"
                    }
                ],
                professors: [
                    {
                        id: 1,
                        name: "Ратников"
                    },
                    {
                        id: 2,
                        name: "Чугаев"
                    }
                ]
            }
        ]
    )

    //-----------------------------------
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    const [editing, setEditing] = useState(false);
    //-----------------------------------------------
    function OnEditing() {
        setEditing(!editing);
    }

    //------------------------------------------------

    //Передаём состояния, откуда прибыли + группу и ФИО преподавателя
    const location = useLocation();
    const [locationState, setLocationState] = React.useState({ from: '', group: '', fio: '' })

    const [weekdays, setWeekDays] = useState(startAndEndOfWeek());
    const [weeks, setWeeks] = useState([])
    const [firstDate, setFirstDate] = useState(new Date("2022-09-01T00:00:00"))
    const maxDate = new Date("2023-01-01T00:00:00")



    function sorting(a, b) {
        return (a.date > b.date ? 1 : -1)
    }


    React.useEffect(() => {


        let apiFunc, apiArg;

        if (location.state) {
            setLocationState(location.state)
        }

        if (location.state.from === "StudentPage") {
            apiFunc = "GetScheduleByDateIntervalAndGroupId"
            apiArg = location.state.group
        }
        else if (location.state.from === "TeacherPage") {
            apiFunc = "GetScheduleByDateIntervalAndProfessorId"
            apiArg = location.state.fio
        }

        setLoading(true)
        callApiPost(apiFunc, {
            DateSpan: {
                BeginDate: (weekdays[0]).toISOString(),
                EndDate: (weekdays[1]).toISOString()
            },
            GroupId: apiArg,
            ProfessorId: apiArg
        }, (resp) => {
            setLoading(false)
            setScheduleObject(resp.data.sort(sorting))
            console.log(resp.data)
        })
    }, [])


    const [week, setWeek] = useState("default")

    function get_current_week() {
        return (
            weekNumber(new Date()) - weekNumber(firstDate) + 1
        )

    }

    //console.log(weekNumber(new Date()) - weekNumber(firstDate) )

    const [filter, setFilter] = useState(
        { week_f: get_current_week(), week_day_f: null, subject_f: null, type_f: null });

    const [filter_type, setFilterType] = useState(null);

    const handleCallback = (childData, filter_t) => {
        setFilterType(filter_t);
        let newFilter = { ...filter };
        switch (filter_t) {
            case "week":
                if (childData !== "Учебная неделя") {
                    newFilter.week_f = childData;
                    setFilter({ ...filter, week_f: childData });
                }
                else setFilter({ ...filter, week_f: null });
                break;
            case "weekday":
                if (childData !== "День недели") setFilter({ ...filter, week_day_f: childData });
                else setFilter({ ...filter, week_day_f: null });
                break;
            case "subject":
                if (childData !== "Предмет") {
                    newFilter.subject_f = childData;
                    setFilter({ ...filter, subject_f: childData })
                }
                else setFilter({ ...filter, subject_f: null });
                break;
            case "subj_type":
                if (childData !== "Тип занятия") setFilter({ ...filter, type_f: childData });
                else setFilter({ ...filter, type_f: null });
                break;
            default:
                break;

        };
        Filtering(newFilter);
    }


    const [filterLoading, setFilterLoading] = useState(false);


    const chooseWeekOption = [{ id: 0, text: "Выберите учебную неделю", weekBeginDate: {}, weekEndDate: {} }];
    function FindWeeks() {
        let id = 0;
        let temp = weeks;
        for (let i = new Date(firstDate); i < maxDate; i.setDate(i.getDate() + 7)) {
            let wd = startAndEndOfWeek(i);
            temp.push({ id: id + 1, weekBeginDate: new Date(wd[0]), weekEndDate: new Date(wd[1]) });
            id++;
        }

        setWeeks(chooseWeekOption.concat(temp));
    }

    React.useState(() => {
        FindWeeks();
    })


    const [weeksOptions] = useState([])

    const filteringData = scheduleObject;

    function Filtering(filter_params) {
        if (filter_params.week_f != null) {

            let apiFunc, apiArg;

            if (location.state.from === "StudentPage") {
                apiFunc = "GetScheduleByDateIntervalAndGroupId"
                apiArg = location.state.group
            }
            else if (location.state.from === "TeacherPage") {
                apiFunc = "GetScheduleByDateIntervalAndProfessorId"
                apiArg = location.state.fio
            }
            setLoading(true)
            callApiPost(apiFunc, {
                DateSpan: {
                    BeginDate: (weeks[filter_params.week_f].weekBeginDate).toISOString(),
                    EndDate: (weeks[filter_params.week_f].weekEndDate).toISOString()
                },
                GroupId: apiArg,
                ProfessorId: apiArg
            }, (resp) => {
                setLoading(false)
                setScheduleObject(resp.data.sort(sorting))
                console.log(resp.data)
            })
        }

        if (filter_params.subject_f != null) {

        }


    }


    const [subjects, setSubjects] = useState([
        { id: 0, name: "Предмет" }
    ])
    const chooseOptionSubj = [{ id: 0, name: "Предмет" }]

    const chooseOptionSubjType = [{ id: 0, name: "Тип занятия" }]

    const [pair_types, setPair_types] = useState([
        { id: 0, name: "Тип занятия" }])

    const scheduleByDate = scheduleObject.reduce((groups, item) => {
        const group = (groups[item.date] || []);
        group.push(item);
        groups[item.date] = group;
        return groups;
    }, {});


    console.log(scheduleObject);
    console.log(weeks);
    console.log(filter.week_f);
    return (

        <div className="App">
            <Study_Week disabled={filterLoading} weeks={weeks} key={weeks.id} parentCallback={(handleCallback)} />

            {
                loading ?
                    <div>
                        <div className="info"> Загрузка данных </div>
                    </div>
                    :
                    <div>
                        <div>
                            {
                                (scheduleObject.length === 0)
                                    ? (
                                        <div>
                                            <div className="info"> На {filter.week_f}-й неделе (
                                                {(weeks[filter.week_f].weekBeginDate).toLocaleDateString()}
                                                - {(new Date(weeks[filter.week_f].weekEndDate)).toLocaleDateString()})
                                                пар нет </div>
                                        </div>)
                                    :
                                    <div>
                                        {

                                            Object.entries(scheduleByDate).map(([date, schObj], index) =>
                                                <ScheduleCard propsdate={date} scheduleObject={schObj} propsediting={editing} key={index}
                                            
                                                parentCallback = {(refreshPage)}
                                                />
                                            )
                                        }
                                        <button className="Schedule_Editing" onClick={OnEditing} />
                                        {console.log(editing)}
                                    </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );

}

export default Schedule;