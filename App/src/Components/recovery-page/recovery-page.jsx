import { useState } from "react"
import "./recovery-page.css"

const RecoveryPage = function() {
    
    const [send, setSend] = useState(false)
    const [eamil, setEmail] = useState("")
    const [code, setCode] = useState("")

    const backlogick = function(){
        if(send) setSend(false)
        else if (send === false){setMode('login'); setSend(undefined);}
    }

    const checktocontinue = function(){
    }

    if(send === false){
        return (
            <div id="recovery-email-body">
                <label id="main-label">Востановление пароля</label>
                <label id="input-area">Ваш email</label>
                <input></input>
                <label id="mesage"></label>
                <div id="button-complex">
                    <label onClick={()=>{backlogick}} id="back">Назад</label>
                    <button id="submit">Продолжить</button>
                </div>
            </div>
        )
    }
    else if(send){
        return (
            <div id="recovery-code-body">
                <label id="main-label">Востановление пароля</label>
                <label id="mesage"></label>
                <label id="input-area"></label>
                <input></input>
                <div id="button-complex">
                    <label onClick={()=>{backlogick}} id="back">Назад</label>
                    <button id="submit">Продолжить</button>
                </div>
            </div>
        )
    }

}

export default RecoveryPage