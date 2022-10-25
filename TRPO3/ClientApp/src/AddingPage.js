import React, {useState} from "react";
import "./App.css";
import "../src/components/Editing/editing_styles.css";

import { useAlert } from 'react-alert';
import { differenceInCalendarDays } from 'date-fns';

import DatePicker, {CalendarContainer} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';

import MultiSelect from 'react-multiple-select-dropdown-lite';
import "react-multiple-select-dropdown-lite/dist/index.css";

import {BrowserRouter as Router, Route, Link, Outlet} from 'react-router-dom';

function AddingPage () {

    //---------------- ФЛАГИ ------------------------------
    const [approve, setApprove] = useState(false)
    const [dateChange, setDateChange] = useState(false)
    const [firstChange, setFirstChange] = useState (false)
    const [cabinetSelect, setCabinetSelect] = useState(false)
    const [lastChange, setLastChange] = useState(false)

    const [many_groups_flag, setManyGroupsFlag] = useState (false)
    const [many_fios_flag, setManyFiosFlag] = useState (false)

    function ChangeFiosFlag () {
        setManyFiosFlag(!many_fios_flag);
    }

    function ChangeGroupsFlag () {
        setManyGroupsFlag(!many_groups_flag);
    }


    //----------------------------------------------
    const [addGroups, setAddGroups] = useState ([
        {id: 1, label: "309Б", value: "М3О-309Б-20"},
        {id: 2, label: "310Б", value: "М3О-310Б-20"}
    ])
    const [groups, setGroups] = useState(null)
    const handleChangeGroups = (value) => {
        debugger;
        setGroups(value);
        if (value != null) setFirstChange (true);
    }

    const [addFio, setAddFio] = useState ([
        {id: 1, label: "Вестяк А.В.", value: "Вестяк Анатолий Васильевич"},
        {id: 2, label: "Чечиков Ю.Б.", value: "Чечиков Юрий Борисович"}
    ])
    const [fio, setFio] = useState(null)
    const handleChangeFio = (value) => {
        setFio(value);
        if (value != null) setFirstChange (true);
    }

    const [addType, setAddType] = useState ([
        {id: 0, value: "Тип занятия"},
        {id: 1, value: "Лекция"},
        {id: 2, value: "ПЗ"},
        {id: 3, value: "ЛР"}
    ])
    const [type, setType] = useState(null)
    const handleChangeType = (event) => {
        setType(event.target.value)
        if (event.target.value == "Лекция") {
            ChangeGroupsFlag();
            if (many_fios_flag==true) ChangeFiosFlag();
        }
        else if (event.target.value == "ЛР")
        {
            ChangeFiosFlag();
            if (many_groups_flag==true) ChangeGroupsFlag()}
        else if (event.target.value == "ПЗ"){
            if (many_fios_flag == true) ChangeFiosFlag();
            if (many_groups_flag == true) ChangeGroupsFlag();
        }
        if (event.target.value != null) setFirstChange (true);

    }
    const [addSubjType, setAddSubjType] = useState ([
        {id: 0, value: "Тип занятия"},
        {id: 1, value: "Лекция"},
        {id: 2, value: "ПЗ"},
        {id: 3, value: "ЛР"}
    ])

    const [addPara, setAddPara] = useState ([
        {id: 0, value: "Номер пары"},
        {id: 1, value: "Первая"},
        {id: 2, value: "Вторая"}
    ])
    const [para, setPara] = useState(null)
    const handleChangePara = (event) => {
        setPara(event.target.value)
        if (event.target.value != null) setCabinetSelect (true);
    }


    const [addSubj, setAddSubj] = useState ([
        {id: 0, value: "Предмет"},
        {id: 1, value: "Матан"},
        {id: 2, value: "ООП"}
    ])
    const [subj, setSubj] = useState(null)
    const handleChangeSubj = (event) => {
        setSubj(event.target.value)
    }

    const [addCab, setAddCab] = useState ([
        {id: 0, value: "Кабинет"},
        {id: 1, value: 330},
        {id: 2, value: 222}
    ])
    const [cabinet, setCabinet] = useState(null)
    const handleChangeCabinet = (event) => {
        setCabinet(event.target.value)
    }





    //-----------------------------------------------

    //КАЛЕНДАРЬ -------------------------------------
    const [date, setDate] = useState( new Date ());

    const maximumDate = new Date ("2023/07/01");
    const minimumDate = new Date ("2022/09/01");



    function isSameDay(a, b) {
      return differenceInCalendarDays(a, b) === 0;
    }

    const disabledDates = [
        new Date ("2022/10/10"),
        new Date ("2022/10/12")];

        function tileDisabled({ date, view }) {
        
            if (view === 'month') {
             
              return disabledDates.find(dDate => isSameDay(dDate, date));
            }
          }

    const handleClickDay = (value) => {
        setDateChange(true);
        setDate(value);
        if(disabledDates.includes(value) == true){
              alert.show('this date is disabled')
        }else{
            //do something with the date
        }        
        }


        const MyContainer = ({ className, children }) => {
            return (
              <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
                <CalendarContainer className={className}>
                  <div style={{ background: "#f0f0f0" }}>
                    What is your favorite day?
                  </div>
                  <div style={{ position: "relative" }}>{children}</div>
                </CalendarContainer>
              </div>
            );
          };
    //-----------------------------------------

    function refreshPage(){ 
        window.location.reload(false); 
      
    }


    return (
        
        
        <div className = "App">
        
            <h1> Это страница для добавления пар </h1>
            <label className = "group_list_label"> Выбор группы </label>
             <MultiSelect
                className="group_list_editing" onChange={handleChangeGroups} options={addGroups}
                singleSelect={many_groups_flag? false: true}/>

            <label className = "fio_label"> Выбор преподавателя </label>
            <MultiSelect
                className="fio_editing" onChange={handleChangeFio} options={addFio}
                singleSelect={many_fios_flag? false: true}/>

            <select className = "type_editing" value={type} onChange={handleChangeType}>
                {addType.map(subj_type =>
                    <option key = {subj_type.id} value = {subj_type.value}>{subj_type.value}</option>)}
            </select>



            
             
             
            <div className = "calendar">
                <DatePicker 
                    selected={date} 
                    onChange={(date) => setDate(date)}
                    CalendarContainer={MyContainer}
                    minDate = {minimumDate}
                    maxDate = {firstChange?maximumDate:minimumDate}
                    excludeDates={disabledDates}
                    inline
                    />
             </div>


            <div>
                <select disabled = {(dateChange == true) ? false: true} className = "para" value={para} onChange={handleChangePara}>
                        {addPara.map(addingPara =>
                    <option key = {addingPara.id} value = {addingPara.value}>{addingPara.value}</option>)}
                </select>

                 <select disabled = {(firstChange)? false : true} className = "subj_editing" value = {subj} onChange = {handleChangeSubj}>
                            {addSubj.map(addingSubj => <option key = {addingSubj.id}
                            value = {addingSubj.value}>{addingSubj.value} </option>)}
                 </select>

                 <select disabled = {(cabinetSelect)? false: true}className = "cabinet_editing" value = {cabinet} onChange = {handleChangeCabinet}>
                                {addCab.map(addingCab => <option key = {addingCab.id}
                                value = {addingCab.value}> {addingCab.value}</option>)}
                 </select>

            </div>


           {
            <div>
                <Link to="/Schedule"><button disabled = {true} className = "Approve_button"> Подтвердить </button></Link>
                <Link to="/" state = {{from: "AddingPage", update: true}}><button className = "Exit_button"> Главное меню </button></Link>
                <Outlet/>
            </div>
           }


        </div>

    );

}

export default AddingPage;