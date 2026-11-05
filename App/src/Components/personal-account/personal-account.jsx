import { useEffect, useState } from "react"
import './personal-accont.css'
import profileicon from '../../icons/profileicon.png'
import lock from '../../icons/lock.png'
import home from '../../icons/home.png'
import data from '../../icons/data.png'
import personaldata from '../../icons/personaldata.png'
import exit from '../../icons/exit.png'


const PersonalAccount = function({SetMode,SetUser, user}){
    const[possition, setPossition] = useState('main')
    const[open, SetOpen] = useState(false)
    const[search, SetSearch] = useState()
    const[errorMessage, setErrorMessage] = useState('')

    useEffect(()=>{
        SetOpen(true)
        return
    },[search])


    const exite = async function () {
        try{
            const reqest = await fetch("http://localhost:3000/users/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            SetUser(null)
            SetMode('login')
        }catch(err){
            console.log(err)
            setErrorMessage('Произошла ошибка')
            setPossition('main')
        }
    }


    const checkPossition = function(){
        if(possition === 'main') return(
            <div className="body-info">
                <label id="Hello-label">Здравствуйте {user?.name}</label>
                <label id="email-label">{user?.email}</label>
                {errorMessage ? <label id="err">{errorMessage}</label>: <label></label>}
                <input onChange={(e)=>{SetSearch(e.target.value)}}></input>
                {open ? <div id="open-search-container">
                </div> : <div id="close-search-container"><label id="search-notfound"></label></div>}
            </div>
        )
        else if(possition === 'personal-info') return(
            <div className="body-info">
                <label></label>
                <label></label>
                <label></label>
                <label></label>
            </div>
        )
        else if(possition === 'safaty-info') return(
            <div className="body-info">
                <label></label>
                <label></label>
                <label></label>
                <label></label>
            </div>
        )
        else if(possition === 'data-info') return(
            <div className="body-info">
                <label></label>
                <label></label>
                <label></label>
                <label></label>
            </div> 
        )
    }

    return(
        <div id="body">
            <div id="navigation">
                <div id="account-photo">
                    <img src={profileicon} alt="Profile Icon"></img>
                </div>
                <div className="felds" onClick={()=>{setPossition('main')}}>
                    <img className="icon" src={home} alt="Home Icon"></img>
                    <label>Главная</label>
                </div>
                <div className="felds" onClick={()=>{setPossition('personal-info')}}>
                    <img className="icon" src={personaldata} alt="Personal Data Icon"></img>
                    <label>Личные данные</label>
                </div>
                <div className="felds" onClick={()=>{setPossition('safaty-info')}}>
                    <img className="icon" src={lock} alt="Lock Icon"></img>
                    <label>Безопасность</label>
                </div>
                <div className="felds" onClick={()=>{setPossition('data-info')}}>
                    <img className="icon" src={data} alt="Data Icon"></img>
                    <label>Данные</label>
                </div>
                <div className="felds" onClick={()=>{exite()}}>
                    <img className="icon" src={exit} alt="Exit Icon"></img>
                    <label id="exit-label">Выход</label>
                </div>
            </div>
            <div id="info-place">
                {checkPossition()}
            </div>
        </div>
    )
}

export default PersonalAccount