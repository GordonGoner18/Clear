import React, { useState} from "react";
import "./reg-login.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"
import { checkEmail, checkCheckBox } from "../../utils/validation.js"

const Loginform = function({SetMode, SetUser}){

    const [showPassword, setShowPassword] = useState(false)
    const [send, setSend] = useState(false)
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState("")
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [checkbox, setCheckBox] = useState(false)
    
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
                        credentials: 'include',
                        body: JSON.stringify(login_data)
                    })
                    
                    const result = await reqest.json();
                    
                    if(reqest.ok){
                        setCheckBox(false);
                        setEmail("");
                        setPassword("");
                        setSubmit(true);
                        SetMode('prsonal-account')
                        SetUser({name: result.name, email: result.email, regdate: result.regdate, id: result.id})
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
        <div className="auth-login-body">
            <label className="auth-title">Войдите в свой профиль</label>
            <div className="auth-switchmode"><button className="active" onClick={()=>SetMode('login')}>Вход</button><button onClick={()=>SetMode('reg')}>Регистрация</button></div>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-input" placeholder="Введите email"></input>
            <div className="password-row">
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-input" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                <button className="password-toggle" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img className="password-toggle-icon" src={showPassword ? openeye : closeeye} alt=""></img></button>
            </div>
            {ErrorMessage()}
            <label onChange={(e)=>{setCheckBox(e.target.checked)}} className="auth-accept-politic"><input className="auth-accept" type="checkbox"></input>Я принимаю политику пользования</label>
            <button onClick={()=>{loginreqest()}} className="auth-continue">Продолжить</button>
            <label onClick={()=>{SetMode("recovery-password")}} className="auth-forget-password">Забыли пароль?</label>
        </div> 
    )
}

export default Loginform