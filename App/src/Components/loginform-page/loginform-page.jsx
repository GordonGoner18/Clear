import React, { useState} from "react";
import "../login-page/login.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"

const loginform = function(){

    const [showPassword, setShowPassword] = useState(false)
    const [eyePositon, setEyePosition] = useState(openeye)
    const [send, setSend] = useState(false)
    const [status, setStatus] = useState(false)
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState("")
    
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [checkbox, setCheckBox] = useState(false)
    
    const checkPassword = () => {
         const passwordRegister = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)\S{8,20}$/;
        if(password === passwordRepeat || passwordRepeat == ""){
            if(password.length >= 20 || password.length <= 8 && !password == "" && !passwordRepeat == ""){
                if(!passwordRegister.test(password)){
                    return "Пароль должен содержать числа и буквы и сецальные символы"
                }
                return "Пароль не должен быть в диапозоне от 8 до 20 символов"
            }else 
                return ""
        }
        else
            return "Пароли не совпадают"
    }

    const checkEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email) && email !== ""){
            return "Некорректный формат email"
        }
        else{
            return ""
        }
    }

    const checkCheckBox = () => {
        if(checkbox)
            return ""
        else
            return "Примите политику пользования"
    }


    
    const loginreqest = async function () {
        setSend(true)

        const login_data = {
            email: email,
            password: password,
            accept: checkbox
        }
        
        if(password !== "" && email !== "" && checkbox && !submid){
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
                        setVerepthy(true);
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
        if(checkEmail() !== "")
            return <label className="error-message">{checkEmail()}</label>
        else if(serverMessage !== "" )
            return <label className="error-message">{serverMessage}</label>
        else if(checkCheckBox() && send )
            return <label className="error-message">{checkCheckBox()}</label>
    }
    
    return(
        <div id="login-body">
            <label id="main-label">Войдите в свой профиль</label>
            <div id="switchmode"><button className="active" onClick={()=>setMode('login')}>Вход</button><button className="active" onClick={()=>setMode('reg')}>Регистрация</button></div>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-area" placeholder="Введите email"></input>
            <div id="password-complex">
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input-area" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                <button id="eye-button" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img id="eye" src={showPassword ? openeye : closeeye} alt=""></img></button>
            </div>
            {ErrorMessage()}
            <label onChange={(e)=>{setCheckBox(e.target.checked)}} id="accept-politic"><input id="accept" type="checkbox"></input>Я принимаю политику пользования</label>
            <button onClick={()=>{loginreqest()}} id="continue">Продолжить</button>
            <label onClick={()=>{setMode("forgetpassword")}} id="forget-password">Забыли пароль?</label>
        </div> 
    )
}

export default loginform