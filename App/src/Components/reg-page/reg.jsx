import React, { useState} from "react";
import "../login-page/login.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"

const Reg = function({ setMode }){

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
    
    const checkPassword = () => {
         const passwordRegister = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)\S{8,20}$/;
        if(password === passwordRepeat || passwordRepeat == ""){
            if(password.length > 20 || password.length < 8 && !password == "" && !passwordRepeat == ""){
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

        if(checkPassword() === "" && checkEmail() === "" && checkCheckBox() === "" && userName !== "" && passwordRepeat !== "" && password !== "" && !submid){
            setSubmit(true);
            setServerMessage("")
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
    
    const ErrorMessage = function(){
        if(checkAll() !== "" && send)
            return <label className="error-message">{checkAll()}</label>
        else if(checkEmail() !== "")
            return <label className="error-message">{checkEmail()}</label>
        else if(serverMessage !== "" )
            return <label className="error-message">{serverMessage}</label>
        else if(checkCheckBox() !== "" && send)
            return <label className="error-message">{checkCheckBox()}</label>
        else if(checkPassword() !== "")
            return <label className="error-message">{checkPassword()}</label>
    }
    
    return(
        <div id="login-body">
            <label id="main-label">Зраегистрироватся</label>
            <div id="switchmode"><button onClick={()=>setMode('login')}>Вход</button><button className="active" onClick={()=>setMode('reg')}>Регистрация</button></div>
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