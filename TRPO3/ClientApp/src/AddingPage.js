import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/components/Editing/editing_styles.css";
import "./components/Schedule/schedule_filters/filters.css";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

import Select from 'react-select';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { callApiPost } from "./requests.js";
import startAndEndOfWeek from "./WeekDays";


function AddingPage() {

    const locationState = useLocation().state;
    const isEditMode = !(locationState?.editingId === undefined)

    const navigate = useNavigate();
    const refreshPage = () => {
        navigate(0);
    }

    const [form, setForm] = useState({
        id: null,
        date: null,
        para: null,
        cabinet: null,
        subject: null,
        type: null,
        groups: [],
        professors: []
    });

    const [formLoading, setFormLoading] = useState(false);
    useEffect(() => {
        if (!isEditMode) return;

        setFormLoading(true)
        callApiPost("GetFormFromScheduleEntryId", { id: locationState.editingId }, (resp) => {
            let form = resp.data
            form.para = { id: form.para, name: form.para }
            form.cabinet = { id: form.cabinet, name: form.cabinet }
            console.log("loaded Form ", form)
            setForm(form)
            return form
        })
            .then((form) => updateFiosGroupsFlag(form.type.id))
            .then(updateDisabledDates(form))
            .then(setFormLoading(false));
    }, [])

    // HELPER FUNCTIONS

    function mapFormToApiFormat(form) {
        return {
            editingEntryId: form.id,
            date: form.date,
            para: form.para?.id,
            cabinet: form.cabinet?.id,
            subjectId: form.subject?.id,
            subjectTypeId: form.type?.id,
            groupIds: form.groups.map(g => g.id),
            professorIds: form.professors.map(g => g.id)
        }
    }

    const mapToMultiselectFormat = (obj) => {
        return obj ? { label: obj.name, value: "" + obj.id, isDisabled: obj?.isDisabled } : null
    }

    const mapFromMultiselectFormat = (obj) => {
        return { name: obj.label, id: obj.value }
    }

    const multiselectGetShownValue = (selected, isMulti) => {
        if (selected === undefined || selected.length === 0) return null;
        let values = selected.map(mapToMultiselectFormat);
        if (isMulti) {
            return values;
        }
        return values[0];
    }


    const createApiLoadCall = (apiFuncName, loadingSetterFunc, fieldSetterFunc, changeDataCallback) => {
        return (form) => {
            loadingSetterFunc(true);
            console.log("calling with form ", form)
            return callApiPost(apiFuncName, mapFormToApiFormat(form), (resp) => {
                console.log(apiFuncName + " ", resp.data)
                let newData = changeDataCallback(resp.data)
                fieldSetterFunc(newData)
                loadingSetterFunc(false)
                return newData
            })
        }
    }

    const createMultiSelectChangeHandler = (field, updateFunc, isMulti, shouldGetArray) => {
        return (value) => {
            console.log("changing field " + field + " to value ", value)
            let result = isMulti ? value.map(mapFromMultiselectFormat)
                : (value === null ? [] : [mapFromMultiselectFormat(value)])
            let newForm = { ...form, [field]: shouldGetArray ? result : result[0] }
            setForm(newForm)
            updateFunc(newForm)
        };
    }

    // END HELPER FUNCTIONS

    // DatePicker state
    const [dateChosen, setDateChosen] = useState(false)
    const [calendarUpdating, setCalendarUpdating] = useState(false)
    const [disabledDates, setDisabledDates] = useState([
        new Date("2022/10/10"),
        new Date("2022/10/12")]);

    const maximumDate = new Date("2023/07/01");
    const minimumDate = new Date("2022/09/01");

    const handleClickDay = (value) => {
        setForm({ ...form, date: value })
        setDateChosen(true)
    }
    const firstDate = new Date("2022-09-01T00:00:00")
    const lastDate = new Date("2023-01-01T00:00:00")
    function FindWeekEnds(firstDate, lastDate) {
        let temp = [];
        for (let i = firstDate; i < lastDate; i.setDate(i.getDate() + 7)) {
            let sunday = startAndEndOfWeek(i)[1];
            // Doing explicit copies here
            temp.push(new Date(sunday));
            sunday.setDate(sunday.getDate() - 1);
            temp.push(new Date(sunday));
        }
        return temp;
    }
    const updateDisabledDates = (form) => {
        createApiLoadCall(
            "GetDatesOccupied",
            setCalendarUpdating,
            setDisabledDates,
            (data) => data.map(dateString => new Date(dateString))
        )(form).then((disabledDates) => {
            setDisabledDates(disabledDates.concat(FindWeekEnds(firstDate, lastDate)))
        })
    }
    useEffect(() => {
        updateDisabledDates(form)
    }, [form.groups, form.professors])

    // Group multiselect state
    const [groupsLoading, setGroupsLoading] = useState(false)
    const [manyGroupsFlag, setManyGroupsFlag] = useState(false)
    const [groupOptions, setGroupOptions] = useState([
       
    ])
    const updateGroups = createApiLoadCall(
        "GetGroupsAvailable",
        setGroupsLoading,
        setGroupOptions,
        (data) => data)


    // Fios multiselect state
    const [manyFiosFlag, setManyFiosFlag] = useState(false)
    const [fiosLoading, setFiosLoading] = useState(false)
    const [fioOptions, setFioOptions] = useState([
       
    ])
    const updateFios = createApiLoadCall(
        "GetProfessorsAvailable",
        setFiosLoading,
        setFioOptions,
        (data) => data)

    // SubjectType select state
    const [subjTypesLoading, setSubjTypesLoading] = useState(false)
    const [subjectTypeOptions, setSubjectTypeOptions] = useState(
        [
            
        ])
    const updateSubjectTypes = createApiLoadCall(
        "GetSubjectTypeAvailable",
        setSubjTypesLoading,
        setSubjectTypeOptions,
        (data) => data
    )

    const updateFiosGroupsFlag = (subjTypeId) => {
        let typeToGroupsAndFiosMapping = {
            1: { manyGroups: true, manyFios: false },
            2: { manyGroups: false, manyFios: false },
            3: { manyGroups: false, manyFios: true }
        }

        let curMapping = typeToGroupsAndFiosMapping[subjTypeId];
        setManyFiosFlag(curMapping.manyFios);
        setManyGroupsFlag(curMapping.manyGroups);
    }

    const handleChangeType = (value) => {
        let nextForm = { ...form, type: mapFromMultiselectFormat(value) }
        setForm(nextForm)
        updateFiosGroupsFlag(value.value)
        updateSubjectTypes(nextForm)
    }

    // Para select state
    const [paraLoading, setParaLoading] = useState(false)
    const [paraOptions, setParaOptions] = useState(
        [
            
        ])
    const updatePara = createApiLoadCall(
        "GetParaAvailable",
        setParaLoading,
        setParaOptions,
        (data) =>
            data.map((para) => { return { id: para, name: para } })
    )

    // Subject select state
    const [subjectsLoading, setSubjectsLoading] = useState(false)
    const [subjectOptions, setSubjectOptions] = useState(
        [
            
        ])

    const updateSubjects = createApiLoadCall(
        "GetSubjectsAvailable",
        setSubjectsLoading,
        setSubjectOptions,
        (data) => data
    )

    // Cabinet select state
    const [cabinetsLoading, setCabinetsLoading] = useState(false)
    const [cabinetOptions, setCabinetOptions] = useState(
        [
            
        ])
    const updateCabinet = createApiLoadCall(
        "GetCabinetsOccupied",
        setCabinetsLoading,
        setCabinetOptions,
        (data) =>
            Array(999).fill().map(
                (_, index) => {
                    index += 1;
                    return { id: index, name: index, isDisabled: data.includes(index) };
                }
            )
    )

    const formSubmit = () => {
        if (isEditMode) {
            setFormLoading(true)
            callApiPost("EditScheduleEntryFromForm", mapFormToApiFormat(form), (resp) => {
                console.log("Tried to edit the form: ", resp.data)
                .then(setFormLoading(false))
            });
        } else {
            setFormLoading(true)
            callApiPost("PostScheduleEntryFromForm", mapFormToApiFormat(form), (resp) => {
                console.log("Tried to submit the form: ", resp.data)
                .then(setFormLoading(false))
            });
            refreshPage();
        }
    }

    return (
        <div className="App">

            <h1> Это страница для добавления и редактирования пар </h1>
            {
                formLoading ?
                    <div className="info"> Загрузка данных </div>
                    :
                    <div>
                   
                        <Select className="group_list_editing"
                            isMulti={manyGroupsFlag}
                            isClearable={true}
                            value={multiselectGetShownValue(form.groups, manyGroupsFlag)}
                            options={groupOptions.map(mapToMultiselectFormat)}
                            onChange={createMultiSelectChangeHandler("groups", updateGroups, manyGroupsFlag, true)}
                            onFocus={() => updateGroups(form)}
                            isLoading={groupsLoading}
                            placeholder={"Группа(ы)"}
                        />
                  
                        <Select
                            className="fio_editing"
                            isMulti={manyFiosFlag}
                            isClearable={true}
                            value={multiselectGetShownValue(form.professors, manyFiosFlag)}
                            options={fioOptions.map(mapToMultiselectFormat)}
                            onChange={createMultiSelectChangeHandler("professors", updateFios, manyFiosFlag, true)}
                            onFocus={() => updateFios(form)}
                            isLoading={fiosLoading}
                            placeholder={"Преподаватель(и)"}
                        />

                        <Select
                            className="type_editing"
                            isClearable={true}
                            value={mapToMultiselectFormat(form.type)}
                            options={subjectTypeOptions.map(mapToMultiselectFormat)}
                            onChange={handleChangeType}
                            onFocus={() => updateSubjectTypes(form)}
                            isLoading={subjTypesLoading}
                            placeholder={"Тип занятия"}
                        />

                        <div className="calendar">
                            <DatePicker
                                selected={dateChosen ? form.date : new Date()}
                                onChange={handleClickDay}
                                minDate={minimumDate}
                                // Disable Datepicker
                                maxDate={(form.groups.length === 0 && form.professors.length === 0)
                                    || calendarUpdating
                                    ? minimumDate : maximumDate}
                                excludeDates={disabledDates}
                                inline
                                calendarStartDay={1}
                            />
                        </div>

                        <div>
                            <Select
                                className="para"
                                isDisabled={!dateChosen}
                                isClearable={true}
                                value={mapToMultiselectFormat(form.para)}
                                options={paraOptions.map(mapToMultiselectFormat)}
                                onChange={createMultiSelectChangeHandler("para", updatePara, false, false)}
                                onFocus={() => updatePara(form)}
                                isLoading={paraLoading}
                                placeholder={"Номер пары"}
                            />

                            <Select
                                className="subj_editing"
                                isDisabled={(form.groups.length === 0 && form.professors.length === 0)}
                                isClearable={true}
                                value={mapToMultiselectFormat(form.subject)}
                                options={subjectOptions.map(mapToMultiselectFormat)}
                                onChange={createMultiSelectChangeHandler("subject", updateSubjects, false, false)}
                                onFocus={() => updateSubjects(form)}
                                isLoading={subjectsLoading}
                                placeholder={"Предмет"}
                            />

                            <Select
                                className="cabinet_editing"
                                isDisabled={form.subject === null}
                                isClearable={true}
                                value={mapToMultiselectFormat(form.cabinet)}
                                options={cabinetOptions.map(mapToMultiselectFormat)}
                                onChange={createMultiSelectChangeHandler("cabinet", updateCabinet, false, false)}
                                onFocus={() => updateCabinet(form)}
                                isLoading={cabinetsLoading}
                                placeholder={"Кабинет"}
                            />

                        </div>
                        {
                            <div>
                            {
                                isEditMode?
                                <Link to="/" >
                                    <button disabled={form.cabinet === null}
                                        className="Approve_button"
                                        onClick={formSubmit}>
                                        Подтвердить
                                    </button>
                                </Link>
                                :
                                <button disabled={form.cabinet === null}
                                        className="Approve_button"
                                        onClick={formSubmit}>
                                        Подтвердить
                                    </button>

                            }
                                <Link to="/" state={{ from: "AddingPage", update: true }}>
                                    <button className="Exit_button">
                                        Главное меню
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>
            }
        </div>
    );
}

export default AddingPage;