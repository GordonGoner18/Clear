import { useEffect, useState } from "react"
import "./recovery-page.css"

const RecoveryPage = function() {
    
    const [time, SetTime] = useState(300)
    const [navigatin, setNavigain] = useState(false)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [submid, setSubmit] = useState(false)
    const [serverMessage, setServerMessage] = useState(false)

    const backlogick = function(){
        if(navigatin){
            setNavigain(false)
        } 
        else if (navigatin === false ){setMode('login'); setNavigain(undefined);}
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
        const data = {code: code}
        const reqest = await fetch()
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
                    setNavigain(true)
                    setEmail('')
                    setServerMessage(`код отправлен будет действиьелен в течение ${Math.trunc(time / 60)}:${String(time % 60).padStart(2, "0")}`)
                }
            }catch(err){
                setSubmit(false)
                console.log(err)
                setServerMessage('что-то пошло не так')
            }
        }
    }

    if(navigatin === false){
        return (
            <div id="recovery-email-body">
                <label id="main-label">Востановление пароля</label>
                <label id="input-area">Ваш email</label>
                <input onChange={(e)=>{setEmail(e.target.value)}}></input>
                <label id="mesage"></label>
                <div id="button-complex">
                    <label onClick={()=>{backlogick}} id="back">Назад</label>
                    <button id="submit" onClick={()=>{if(checkEmail() == "") SendData()}}>Продолжить</button>
                </div>
            </div>
        )
    }
    else if(navigatin){
        return (
            <div id="recovery-code-body">
                <label id="main-label">Востановление пароля</label>
                <label id="mesage">{serverMessage}</label>
                <label id="input-area">Ввведите код</label>
                <input onChange={(e)=>{setCode(e.target.value)}}></input>
                <div id="button-complex">
                    <label onClick={()=>{backlogick}} id="back">Назад</label>
                    <button onClick={()=>{}} id="submit">Продолжить</button>
                </div>
             </div>
        )
    }

}

export default RecoveryPage