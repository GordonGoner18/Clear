import React, { useState} from "react";
import "./reg-login.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"
import { checkEmail, checkName, checkPassword, checkCheckBox } from "../../utils/validation.js"

const Reg = function({ SetMode }){

    const [showPassword, setShowPassword] = useState(false)
    const [eyePositon, setEyePosition] = useState(openeye)
    const [send, setSend] = useState(false)
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState("")

    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordReapet] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [checkbox, setCheckBox] = useState(false)
    
    const firstError = function(){
        return checkEmail(email) || checkName(userName) || checkPassword(password, passwordRepeat) || checkCheckBox(checkbox)
    }

    const reqest = async function(){
        const Userdata = {
            name: userName,
            email: email,
            accept: checkbox,
            password: password,
        }

        if(firstError() === "" && !submid){
            setSubmit(true);
            setServerMessage('')
            try {
                const regrespose = await fetch("http://localhost:3000/users/reg",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(Userdata)
                    }
                    
                )

                const result = await regrespose.json();

                if(regrespose.ok){
                    setSubmit(false);
                    SetMode('succes-reg-message');
                }else{
                    setSubmit(false)
                    setServerMessage(Array.isArray(result.message) ? result.message.join(". ") : result.message)
                }
                
            }catch(err){
                console.error(err)                                   
                setSubmit(false)                                     
                setServerMessage("Сервер не отвечает. Попробуйте позже")
            }
        }
    }
    
    const ErrorMessage = function(){
        if(serverMessage !== "")
            return <label className="error-message">{serverMessage}</label>
        if(send && firstError() !== "")
            return <label className="error-message">{firstError()}</label>
        if(submid)
            return <label className="error-message">Запрос отправлен</label>
    }
    
    return(
        <div id="login-body">
            <label id="main-label">Зарегистрироваться</label>
            <div id="switchmode"><button onClick={()=>SetMode('login')}>Вход</button><button className="active" onClick={()=>SetMode('reg')}>Регистрация</button></div>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-area" placeholder="Введите email"></input>
            <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} className="input-area" placeholder="Введите ваше имя"></input>
            <div id="password-complex">
                <input value={password} onChange={(e)=> {setPassword(e.target.value)}} className="input-area" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                <button id="eye-button" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img id="eye" src={showPassword ? openeye : closeeye} alt=""></img></button>
            </div>
            <input value={passwordRepeat} onChange={(e)=> setPasswordReapet(e.target.value)} className="input-area" placeholder="Повторите пароль" type={showPassword ? "text" : "password"}></input>
            <label onChange={(e)=>{setCheckBox(e.target.checked)}} id="accept-politic"><input id="accept" type="checkbox"></input>Я принимаю политику пользования</label>
            {ErrorMessage()}
            <button onClick={()=>{setSend(true), reqest()}} id="continue">Продолжить</button>
        </div> 
    )
}


export default Reg