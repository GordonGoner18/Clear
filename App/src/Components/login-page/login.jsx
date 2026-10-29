import React, { useState} from "react";
import "./login.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"

const Login = function(){

    const [showPassword, setShowPassword] = useState(false)
    const [eyePositon, setEyePosition] = useState(openeye)
    const [mode, setMode] = useState('login')
    const [send, setSend] = useState(false)
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState("")
    const [verepthy, setVerepthy] = useState(false)

    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordReapet] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [checkbox, setCheckBox] = useState("not state")
    
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

    const checkAll = function(){
        if(checkPassword() === "" && checkEmail() === "" && checkCheckBox() === "" && userName !== "" && send){
            if(submid)
                return "Запрос отправлен";
            else
                return "";
        }else{
            if(send)
                return "Проверьте все поля";
        }
    }

    const reqest = async function(){
        const Userdata = {
            name: userName,
            email: email,
            accept: checkbox,
            password: password
        }

        if(checkPassword() === "" && checkEmail() === "" && checkCheckBox() === "" && userName !== "" && password !== "" && !submid){
            setSubmit(true);
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
                    setCheckBox(false);
                    setSend(false);
                    setEmail("");
                    setPassword("");
                    setPasswordReapet("");
                    setSubmit(false);
                    setMode('login');
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
    
    const loginreqest = async function () {
        const login_data = {
            email: email,
            password: password,
            accept: checkbox
        }
        
        if(checkPassword() === "" && checkEmail() === "" && checkCheckBox() === ""){
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
                        setSend(false);
                        setEmail("");
                        setPassword("");
                        setSubmit(false);
                        setVerepthy(true);
                    }else{
                        setSubmit(false)
                        setServerMessage(Array.isArray(result.message) ? result.message.join(". ") : result.message)
                    }
            }
            catch(err){
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
        else if(checkCheckBox() !== "" && send)
            return <label className="error-message">{checkCheckBox()}</label>
    }
    
    if(verepthy){
        console.log('succes');
    }
    else if(mode === "forgetpassword"){
        return(
            <div id="recovery-body">

            </div>
        )
    }
    else if(mode === "recovery"){
        return(
            <div id="recovery-body">

            </div>
        )
    }
    else if(mode === 'login'){
        const switchMode = (newMode) => {
            setMode(newMode)
            setEmail("")
            setPassword("")
            setPasswordReapet("")
            setUserName("")
            setCheckBox(false)
            setSend(false)
            setSubmit(false)
            setServerMessage("")
        }
        
        return(
            <div id="login-body">
                <label id="main-label">Войдите в свой профиль</label>
                <div id="switchmode"><button className={mode === 'login' ? 'active' : ''} onClick={()=>switchMode('login')}>Вход</button><button className={mode === 'reg' ? 'active' : ''} onClick={()=>switchMode('reg')}>Регистрация</button></div>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-area" placeholder="Введите email"></input>
                <div id="password-complex">
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input-area" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                    <button id="eye-button" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img id="eye" src={showPassword ? openeye : closeeye} alt=""></img></button>
                </div>
                {ErrorMessage()}
                <label onChange={(e)=>{setCheckBox(e.target.checked)}} id="accept-politic"><input id="accept" type="checkbox"></input>Я принимаю политику пользования</label>
                <button onClick={()=>{setSend(true), loginreqest()}} id="continue">Продолжить</button>
                <label onClick={()=>{setMode("forgetpassword")}} id="forget-password">Забыли пароль?</label>
            </div> 
        )
    }else if(mode === 'reg'){
        const switchMode = (newMode) => {
            setMode(newMode)
            setEmail("")
            setPassword("")
            setPasswordReapet("")
            setUserName("")
            setCheckBox(false)
            setSend(false)
            setSubmit(false)
            setServerMessage("")
        }
        return(
            <div id="login-body">
                <label id="main-label">Зраегистрироватся</label>
                <div id="switchmode"><button className={mode === 'login' ? 'active' : ''} onClick={()=>switchMode('login')}>Вход</button><button className={mode === 'reg' ? 'active' : ''} onClick={()=>switchMode('reg')}>Регистрация</button></div>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className="input-area" placeholder="Введите email"></input>
                <label className="error-message">{checkEmail()}</label>
                <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} className="input-area" placeholder="Введите ваше имя"></input>
                <label className="error-message"></label>
                <div id="password-complex">
                    <input value={password} onChange={(e)=> {setPassword(e.target.value)}} className="input-area" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                    <button id="eye-button" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img id="eye" src={showPassword ? openeye : closeeye} alt=""></img></button>
                </div>
                <input value={passwordRepeat} onChange={(e)=> setPasswordReapet(e.target.value)} className="input-area" placeholder="Повторите пароль" type={showPassword ? "text" : "password"}></input>
                <label className="error-message">{checkPassword()}</label>
                <label onChange={(e)=>{setCheckBox(e.target.checked)}} id="accept-politic"><input id="accept" type="checkbox"></input>Я принимаю политику пользования</label>
                <label className="error-message">{checkCheckBox()}</label>
                <label className="error-message">{checkAll()}</label>
                <label className="error-message">{serverMessage}</label>
                <button onClick={()=>{setSend(true), reqest()}} id="continue">Продолжить</button>
            </div> 
        )
    }
}

export default Login