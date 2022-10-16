import React from "react";
import { Switch, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentPage from "../StudentPage";
import TeacherPage from "../TeacherPage";
import Main from "../App";
import Links from "./links";


function Choose () {

    return (
    <Router>
        <Routes>
            <Route index element={<Main/>}/>
            <Route exact path="/StudentPage" element={<StudentPage/>}/>
            <Route exact path="/TeacherPage" element={<TeacherPage/>}/>
        </Routes>
    </Router>

);
}

export default Choose;