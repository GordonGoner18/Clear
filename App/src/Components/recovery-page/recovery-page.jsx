import { useEffect, useState } from "react"
import "./recovery-page.css"
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"
import { checkEmail, checkPassword } from "../../utils/validation.js"

const RecoveryPage = function({SetMode}) {
    
    const [time, SetTime] = useState(0)
    const [navigatin, setNavigain] = useState("first-state")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordReaped, setNewPasswordReaped] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [started, setStarted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const backlogick = function(){
        if(navigatin === "first-state"){
            SetMode('login')
            setEmail('')
            setCode('')
            setServerMessage('')
            setSubmit(false)
            setErrorMessage('')
        } 
        else if (navigatin === 'second-state' ){
            setNavigain('first-state')
            setServerMessage('')
            setErrorMessage('')
        }
        else if (navigatin === "third-state"){
            SetMode('login')
            setNavigain('first-state')
            setServerMessage('')
            setSubmit(false)
        }
    }

    const SendNewPassword = async function(){
        const data = {password: newPassword, email: email, code: code}
        const passwordError = checkPassword(newPassword, newPasswordReaped)
        if(passwordError !== ""){
            setServerMessage(passwordError)
        }
        else{
            try{
                const reqest = await fetch("http://localhost:3000/users/new-password",
                    {
                        method: "PATCH",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(data)
                    }
                )
                if(reqest.ok){
                    const reqest_text = await reqest.text() 
                    if(reqest_text === "success"){
                        setNavigain('foth')
                    }
                    else{
                        setServerMessage(reqest_text)
                    }
                }
                else{
                    const response = await reqest.json()
                    setErrorMessage(response.message)
                }
            }catch(err){
                setServerMessage('что-то пошло не так')
            }
        }
    }

    const checkcode = async function () {
        if(code !== ""){
            const data = {code: code, email: email}
            try{
                const reqest = await fetch("http://localhost:3000/users/Recovery-Password-Code",
                    {
                        method: "POST",
                        headers:{
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(data)
                    }
                )

                if(reqest.ok){
                    const response = await reqest.text()
                    if(await response === 'success'){
                        setNavigain('third-state')
                        setServerMessage('')
                    }else if(await response === 'не верный код'){
                        setErrorMessage(await response)
                    }
                    else{
                        setServerMessage('что-то пошло не так попробуйте позже')
                    }
                }else{
                    const ErrorResponse = await reqest.json()
                    setErrorMessage(ErrorResponse.message)
                }
            }catch(err){
                setErrorMessage('Произошла ошибка')
            }
        }else{
            setErrorMessage('введите код')
        }
    }

    useEffect(()=>{
        const id = setInterval(()=>{
            if(started)
                if(time !== 0) {
                    SetTime(time - 1)
                    setServerMessage(`код отправлен будет действителен в течение ${Math.trunc(time / 60)}:${String(time % 60).padStart(2, "0")}`)
                }
                else{
                    setServerMessage('Срок действия кода истек. Нажмите чтоб отпрвить повторно')
                    setStarted(false)
                    setSubmit(false)
                }
        }, 1000)
        return () => clearInterval(id)
    }, [time, started])

    useEffect(()=>{
        setErrorMessage('')
        return () =>{}
    },[code])
    
    const SendData = async function(){
        setSubmit(false)
        if(!submid && checkEmail(email) === "" && time === 0){
            const UserData = {email: email}
            try{
                const reqest = await fetch("http://localhost:3000/users/Recovery-Password",
                    {
                        method: "POST",
                        headers:{
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify(UserData)
                    }
                )
                if(reqest.ok) {
                    setSubmit(true)
                    setNavigain('second-state')
                    setStarted(true)
                    SetTime(300)
                    setErrorMessage('')
                }else{
                    const response = await reqest.json()
                    setErrorMessage(response.message)
                }
            }catch(err){
                setSubmit(false)
                console.log(err)
                setServerMessage('что-то пошло не так')
            }
        }else{
            setServerMessage(checkEmail(email))
        }
    }

    if(navigatin === 'first-state'){
        return (
            <div id="recovery-email-body">
                <label className="recovery-title">Востановление пароля</label>
                <label>Ваш email</label>
                <input className="form-input" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                <label className="message">{serverMessage}</label>
                <label className="message">{errorMessage}</label>
                <div className="recovery-button-complex">
                    <label onClick={()=>{backlogick()}} className="recovery-back">Назад</label>
                    <button className="recovery-submit" onClick={()=>{SendData()}}>Продолжить</button>
                </div>
            </div>
        )
    }
    else if(navigatin === 'second-state'){
        return (
            <div id="recovery-code-body">
                <label className="recovery-title">Востановление пароля</label>
                <label>Введите код</label>
                <input className="form-input" value={code} onChange={(e)=>{setCode(e.target.value)}}></input>
                <label onClick={()=>{SendData()}} className="message">{serverMessage}</label>
                <label className="message">{errorMessage}</label>
                <div className="recovery-button-complex">
                    <label onClick={()=>{backlogick()}} className="recovery-back">Назад</label>
                    <button onClick={()=>{checkcode()}} className="recovery-submit">Продолжить</button>
                </div>
             </div>
        )
    }
    else if(navigatin === 'third-state'){
        return(
            <div id="New-Password-form">
                <label className="recovery-title">Придумайте новый пароль</label>
                <label className="info-labels">Введите новый пароль</label>
                <div className="password-row">
                    <input value={newPassword} onChange={(e)=> {setNewPassword(e.target.value)}} className="form-input" type={showPassword ? "text" : "password"}></input>
                    <button className="password-toggle" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img className="password-toggle-icon" src={showPassword ? openeye : closeeye} alt=""></img></button>
                </div>
                <label className="info-labels">Повторите пароль</label>
                <input value={newPasswordReaped} onChange={(e)=> {setNewPasswordReaped(e.target.value)}} className="form-input" type={showPassword ? "text" : "password"}></input>
                <label className="message">{serverMessage}</label>
                <label className="message">{errorMessage}</label>
                <div className="recovery-button-complex">
                    <label onClick={()=>{backlogick()}} className="recovery-back">Назад</label>
                    <button className="recovery-submit" onClick={()=>{SendNewPassword()}}>Продолжить</button>
                </div>
            </div>
        )
    }
    else if(navigatin === 'foth'){
        return(
            <div id="success-body">
                <label className="recovery-title">Успешная смена пароля</label>
                <button className="success-continue" onClick={()=>{SetMode('login')}}>Войти</button>
            </div>
        )
    }

}

export default RecoveryPage