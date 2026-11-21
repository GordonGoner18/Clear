import React, { useState } from "react";
import "./header.css"

const Header = function({SetMode}){
    return(
        <div id="Header-body">
            <nav id="header-nav">
                <a onClick={()=>{SetMode('home')}} id="prozrachno-label">Прозрачно</a>
                <a onClick={()=>{
                    const fastcheck = document.getElementById('fast-check-main-body')
                    if(fastcheck){
                        fastcheck.scrollIntoView({
                            behavior: "smooth",
                            block: 'start'
                        })
                    }
                    
                }} id="fast-start">Быстрая проверка</a>
                <a onClick={()=>{
                    const about = document.getElementById('about-body')
                    if(about){
                        about.scrollIntoView({
                            behavior: "smooth",
                            block: 'start'
                        })
                    }
                }} id="about">О нас</a>
                <a onClick={()=>{
                    const help = document.getElementById('popular-qeustion-body')
                    if(help){
                        help.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }
                }} id="help">Помощь</a>
                <a onClick={()=>SetMode('prsonal-account')} id="acount">Личный кабинет</a>
            </nav>
        </div>
    );
}

export default Header