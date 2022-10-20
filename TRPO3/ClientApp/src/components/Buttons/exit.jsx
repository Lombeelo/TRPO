import React from 'react';
import "./button.css";
import {BackHandler} from 'react';


const Exit = function () {

    function Close() {
        if (window.confirm('Вы действительно хотите закрыть страницу?')) {
            window.close();
        }
    }

    return (

        <button className = "Exit" onClick = {Close}> Выйти </button>
    );

}
export default Exit;