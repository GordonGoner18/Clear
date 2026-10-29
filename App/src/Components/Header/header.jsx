import React, { useState } from "react";
import "./header.css"

const Header = function(){
    const[state, setState] = useState([])
    return(
        <div id="Header-body">
            <nav id="header-nav">
                <a id="prozrachno-label">Прозрачно</a>
                <a id="fast-start">Быстрая проверка</a>
                <a id="about">О нас</a>
                <a id="help">Помощь</a>
                <a id="acount">Личный кабинет</a>
            </nav>
        </div>
    );
}

export default Header