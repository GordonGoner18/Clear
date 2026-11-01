import React from "react";
import "./home-page.css"

const Home = function({SetMode}){
    return(
        <div id="home-body">
            <p id="welcome-label">Добро пожаловать в Прозрачно!</p>
            <button id="start-button">Начать проверку</button>
        </div>
    )
}

export default Home