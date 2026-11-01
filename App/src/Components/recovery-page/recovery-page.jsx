import { useEffect, useState } from "react"
import "./recovery-page.css"

const RecoveryPage = function({setMode}) {
    
    const [time, SetTime] = useState(300)
    const [navigatin, setNavigain] = useState("first-state")
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordReaped, setNewPasswordReaped] = useState('')
    const [status, setStatus] = useState(false)


    const backlogick = function(){
        if(navigatin === "first-state"){
            setMode('login')
            setEmail('')
            setCode('')
            setServerMessage('')
            setSubmit(false)
        } 
        else if (navigatin === 'second-state' ){
            setNavigain('first-state')
        }
        else if (navigatin === "third-state"){
            setMode('login')
            setNavigain('first-state')
            setCode('')
            setServerMessage('')
            setSubmit(false)
        }
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

    const checkcode = async function () {
        const data = {code: code, email: email}
        const reqest = await fetch("http://localhost:3000/users/Recovery-Password-Code",
            {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            }
        )
        const response = await reqest.text()
        if(await response === 'success'){
            setNavigain('third-state')
        }else if(await response === 'не верный код'){
            setServerMessage(await response)
        }
        else{
            setServerMessage('что-то пошоло не так попробуйте позже')
        }
    }

    const clock = function(){
        useEffect(()=>{
            const id = setInterval(()=>{SetTime(time - 1)},1000)
            return ()=>{clearInterval(id)}
        },[time])
    }

    const SendData = async function(){
        setSubmit(false)
        if(!submid){
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
                    setNavigain('second-state')
                    setServerMessage(`код отправлен будет действиьелен в течение ${Math.trunc(time / 60)}:${String(time % 60).padStart(2, "0")}`)
                }
            }catch(err){
                setSubmit(false)
                console.log(err)
                setServerMessage('что-то пошло не так')
            }
        }
    }

    if(navigatin === 'first-state'){
        return (
            <div id="recovery-email-body">
                <label id="main-label">Востановление пароля</label>
                <label id="input-area">Ваш email</label>
                <input onChange={(e)=>{setEmail(e.target.value)}}></input>
                <label id="mesage"></label>
                <div id="button-complex">
                    <label onClick={()=>{backlogick()}} id="back">Назад</label>
                    <button id="submit" onClick={()=>{if(checkEmail() == "") SendData()}}>Продолжить</button>
                </div>
            </div>
        )
    }
    else if(navigatin === 'second-state'){
        return (
            <div id="recovery-code-body">
                <label id="main-label">Востановление пароля</label>
                <label id="mesage">{serverMessage}</label>
                <label id="input-area">Ввведите код</label>
                <input onChange={(e)=>{setCode(e.target.value)}}></input>
                <div id="button-complex">
                    <label onClick={()=>{backlogick()}} id="back">Назад</label>
                    <button onClick={()=>{checkcode()}} id="submit">Продолжить</button>
                </div>
             </div>
        )
    }
    else if(navigatin === 'third-state'){
        return(
            <div>
                <label></label>
                <label></label>
                <div>
                    <input></input>
                    <button></button>
                </div>
                <label></label>
                <input></input>
                <div>
                    <label></label>
                    <button></button>
                </div>
            </div>
        )
    }
    else if(status){
        return(
            <div>
                <label></label>
                <button></button>
            </div>
        )
    }

}

export default RecoveryPage