import React, { useState } from "react";
import "./header.css"

const Header = function({SetMode, auntification, }){
    return(
        <div id="Header-body">
            <nav id="header-nav">
                <a onClick={()=>{SetMode('home')}} id="prozrachno-label">Прозрачно</a>
                <a onClick={()=>{SetMode('fast-check')}} id="fast-start">Быстрая проверка</a>
                <a id="about">О нас</a>
                <a id="help">Помощь</a>
                <a onClick={()=>SetMode('prsonal-account')} id="acount">Личный кабинет</a>
            </nav>
        </div>
    );
}

export default Header