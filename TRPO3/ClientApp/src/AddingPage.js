import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/components/Editing/editing_styles.css";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

import Select from 'react-select';

import { Link, useLocation } from 'react-router-dom';
import { callApiPost } from "./requests.js";


function AddingPage() {

    const locationState = { editingId: 1 } // useLocation().state;
    const isEditMode = true // !(locationState?.editingId === undefined)

    const [form, setForm] = useState({
        editingEntryId: null,
        date: null,
        para: null,
        cabinet: null,
        subject: null,
        subjectType: null,
        groups: [],
        professors: []
    });

    const [formLoading, setFormLoading] = useState(false);
    useEffect(() => {
        if (!isEditMode) return;

        setFormLoading(true)
        callApiPost("GetFormFromScheduleEntryId", { id: locationState.editingId }, (resp) => {
            let form = mapFormToPageFormat(resp.data)
            console.log("loaded Form ", form)
            setForm(form)
        }).then(updateSubjectTypes(form))
            .then(updateFios(form))
            .then(updateGroups(form))
            .then(updateCabinet(form))
            .then(updatePara(form))
            .then(updateSubjects(form))
            .then(setFormLoading(false));
    }, [])

    // HELPER FUNCTIONS

    function mapFormToApiFormat(form) {
        return {
            editingEntryId: form.editingEntryId,
            date: form.date,
            para: form.para?.id,
            cabinet: form.cabinet?.id,
            subjectId: form.subject?.id,
            subjectTypeId: form.subjectType?.id,
            groupIds: form.groups.map(g => g.id),
            professorIds: form.professors.map(g => g.id)
        }
    }

    function mapFormToPageFormat(form) {
        return {
            editingEntryId: form.editingEntryId,
            date: form.date,
            para: { id: form.para, name: form.para },
            cabinet: { id: form.cabinet, name: form.cabinet },
            subject: { id: form.subjectId, name: '' },
            subjectType: { id: form.subjectId, name: '' },
            groups: form.groupIds.map(g => { return { id: g, name: '' } }),
            professors: form.professorIds.map(g => { return { id: g, name: '' } })
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
                fieldSetterFunc(changeDataCallback(resp.data))
                loadingSetterFunc(false)
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

    useEffect(() => {
        createApiLoadCall(
            "GetDatesOccupied",
            setCalendarUpdating,
            setDisabledDates,
            (data) => data.map(dateString => new Date(dateString))
        )(form)
    }, [form.groups, form.professors])

    // Group multiselect state
    const [groupsLoading, setGroupsLoading] = useState(false)
    const [manyGroupsFlag, setManyGroupsFlag] = useState(false)
    const [groupOptions, setGroupOptions] = useState([
        { name: "309Б", id: 1 },
        { name: "310Б", id: 2 }
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
        { name: "Вестяк А.В.", id: 1 },
        { name: "Чечиков Ю.Б.", id: 2 }
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
            { id: 1, name: "Лекция" },
            { id: 2, name: "Семинар" },
            { id: 3, name: "Лаба" }
        ])
    const updateSubjectTypes = createApiLoadCall(
        "GetSubjectTypeAvailable",
        setSubjTypesLoading,
        setSubjectTypeOptions,
        (data) => data
    )

    const handleChangeType = (value) => {
        let nextForm = { ...form, subjectType: mapFromMultiselectFormat(value) }
        setForm(nextForm)
        let typeToGroupsAndFiosMapping = {
            1: { manyGroups: true, manyFios: false },
            2: { manyGroups: false, manyFios: false },
            3: { manyGroups: false, manyFios: true }
        }

        let curMapping = typeToGroupsAndFiosMapping[value.value];
        setManyFiosFlag(curMapping.manyFios);
        setManyGroupsFlag(curMapping.manyGroups);
        updateSubjectTypes(nextForm)
    }

    // Para select state
    const [paraLoading, setParaLoading] = useState(false)
    const [paraOptions, setParaOptions] = useState(
        [
            { id: 1, name: "Первая" },
            { id: 2, name: "Вторая" }
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
            { id: 1, name: "Матан" },
            { id: 2, name: "ООП" }
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
            { id: 1, name: 330 },
            { id: 2, name: 222 }
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
        callApiPost("PostScheduleEntryFromForm", mapFormToApiFormat(form), (resp) => {
            console.log("Tried to submit the form: ", resp.data)
        }
        );
    }
    const createGetFieldApiCall = (apiFuncName, loadingSetterFunc) => {
        return (id) => {
            loadingSetterFunc(true);
            console.log("calling with form ", form)
            return callApiPost(apiFuncName, { id: id }, (resp) => {
                console.log(apiFuncName + " ", resp.data)
                loadingSetterFunc(false)
                return resp.data;
            })
        }
    }

    const getGroupElem = createGetFieldApiCall("GetGroupById", setGroupsLoading)
    const getProfElem = createGetFieldApiCall("GetProfessorById", setFiosLoading)
    const getTypeElem = createGetFieldApiCall("GetSubjectTypeById", setSubjTypesLoading)
    const getSubjectElem = createGetFieldApiCall("GetSubjectById", setSubjectsLoading)
    const fillFormEmptyStrigns = (form) => {
        if (form.groups && form.groups.length > 0) {
            let newGroups = [];
            let promises = []
            form.groups.forEach((element) => {
                promises.push(
                    getGroupElem(element.id)
                        .then((elem) => newGroups.push(elem))
                        .catch((error) => {
                            console.log('Error: ', error);
                        })
                );
            });
            Promise.all(promises).then(() => {
                console.log("newGroups are", newGroups)
            }

            );
        }
        if (form.professors && form.professors.length > 0) {
            form?.professors.forEach((p) => {
                if (p.name === "") {
                    getProfElem(p.id)
                }
            })
        }
        if (form.subject && form.subject.name === "") {
            getSubjectElem(form.subject.id);
        }
        if (form.subjectType && form.subjectType.name === "") {
            getTypeElem(form.subjectType.id);
        }
        setForm(form)
    }

    useEffect(() => {
        fillFormEmptyStrigns(form);
    }, [subjectOptions])

    return (
        <div className="App">

            <h1> Это страница для добавления пар </h1>
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
                value={mapToMultiselectFormat(form.subjectType)}
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
                    <Link to="/">
                        <button disabled={false}
                            className="Approve_button"
                            onClick={formSubmit}>
                            Подтвердить
                        </button>
                    </Link>

                    <Link to="/" state={{ from: "AddingPage", update: true }}>
                        <button className="Exit_button">
                            Главное меню
                        </button>
                    </Link>

                </div>
            }
        </div>
    );
}

export default AddingPage;