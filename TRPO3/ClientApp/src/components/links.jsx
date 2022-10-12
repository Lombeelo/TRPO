import React from "react";
import { useNavigate, Outlet, Link} from "react-router-dom";
import "./button.css";

function Links () {
    const navigate = useNavigate();

    return (
        <div>
            <Link to="/StudentPage"> <button className = "Student"> Студент </button></Link>
            <Link to="/TeacherPage"> <button className = "Teacher"> Преподаватель </button></Link>
            <Link to="/"><button className = "Exit"> Назад </button></Link>
        </div>


    );

}

export default Links;