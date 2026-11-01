import React, { useState} from "react";
import "./reg-login.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"
import { checkEmail, checkCheckBox } from "../../utils/validation.js"

const Loginform = function({SetMode, SetLogin}){

    const [showPassword, setShowPassword] = useState(false)
    const [send, setSend] = useState(false)
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState("")
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [checkbox, setCheckBox] = useState(false)
    
    // при входе правила пароля не проверяем: подсказка о правилах помогла бы подбору чужого пароля
    const firstError = function(){
        if(password === "") return checkEmail(email) || "Введите пароль"
        return checkEmail(email) || checkCheckBox(checkbox)
    }

    
    const loginreqest = async function () {
        setSend(true)

        const login_data = {
            email: email,
            password: password,
            accept: checkbox
        }
        
        if(firstError() === "" && !submid){
            try{
                const reqest = await fetch("http://localhost:3000/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(login_data)
                    })
                    
                    const result = await reqest.json();
                    
                    if(reqest.ok){
                        setCheckBox(false);
                        setEmail("");
                        setPassword("");
                        setSubmit(true);
                        SetLogin(true)
                    }else{
                        setSend(false)
                        setSubmit(false)
                        setServerMessage(Array.isArray(result.message) ? result.message.join(". ") : result.message)
                    }
            }
            catch(err){
                setSend(false)
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
    }
    
    return(
        <div id="login-body">
            <label id="main-label">Войдите в свой профиль</label>
            <div id="switchmode"><button className="active" onClick={()=>SetMode('login')}>Вход</button><button onClick={()=>SetMode('reg')}>Регистрация</button></div>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-area" placeholder="Введите email"></input>
            <div id="password-complex">
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input-area" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                <button id="eye-button" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img id="eye" src={showPassword ? openeye : closeeye} alt=""></img></button>
            </div>
            {ErrorMessage()}
            <label onChange={(e)=>{setCheckBox(e.target.checked)}} id="accept-politic"><input id="accept" type="checkbox"></input>Я принимаю политику пользования</label>
            <button onClick={()=>{loginreqest()}} id="continue">Продолжить</button>
            <label onClick={()=>{SetMode("recovery-password")}} id="forget-password">Забыли пароль?</label>
        </div> 
    )
}

export default Loginform