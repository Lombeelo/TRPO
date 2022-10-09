import React, {useState} from "react";
import Start from "./components/start";
import Exit from "./components/exit";
import Student from "./components/student";
import Teacher from "./components/teacher";
import "./components/button.css"

import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  const [visibility, setVisibility] = useState(false)

    function Show()
    {
        setVisibility(!visibility);
    }

  return (
      <div className = "App"
      style = {{backgroundColor: '#FFFFFF',
      width: '1920px',
      height: '1080px'
      }}>

    {
        visibility ?<Student / >:null
    }

    {
        visibility ?<Teacher />:null

    }

    {
        visibility ?

            <button className = "Exit" onClick = {Show}> Назад </button>
    : null
    }

    {
        visibility? null:
        <div>
            <button className = "Start" onClick = {Show}> Открыть расписание </button>
            <Exit/>
        </div>
    }


      </div>
  );
}

export default App;
