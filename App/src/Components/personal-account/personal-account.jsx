import { useEffect, useState } from "react"
import './personal-accont.css'
import profileicon from '../../icons/profileicon.png'
import lock from '../../icons/lock.png'
import home from '../../icons/home.png'
import data from '../../icons/data.png'
import personaldata from '../../icons/personaldata.png'
import exit from '../../icons/exit.png'
import seak from '../../icons/seak.png'
import openeye from "../../icons/eye-open.png"
import closeeye from "../../icons/eye-close.png"
import { checkName } from "../../utils/validation"


const PersonalAccount = function({SetMode,SetUser, user}){
    const[possition, setPossition] = useState('main')
    const[open, SetOpen] = useState(false)
    const[search, SetSearch] = useState('')
    const[errorMessage, setErrorMessage] = useState('')
    const[password, setPassword] = useState('')
    const[showPassword, setShowPassword] = useState(false)
    const[newName, setNewName] = useState('')
    const[result, setResult] = useState([])

    const word = [
        {
            title: "Безопасноть",
            keywords: ["пароль", "сменить пароль", "безопасность", "защита", "сменить имя", "поменять имя", "редактировать имя", "имя", "редактировать email", "сменить email", "редактировать почту", "сменить почту", "активные сессии", "сессии", "двухэтапная аунтефикация", "Удалить аккаунт"],
            possition: 'safaty-info'
        },
        {
            title: "Личные данные",
            keywords: ['данные', "личные данные", "email", "почта", "имя", "регистрация", "дата регистрации"],
            possition: 'personal-info'
        },
        {
            title: "Данные",
            keywords: ['данные'],
            possition: 'data-info'
        }
    ]

    useEffect(()=>{
        if(search !== ''){
            SetOpen(true)
            setResult(word.filter(({keywords}) => keywords.includes(search.trim().toLowerCase())))
            console.log(result)
        }else{
            SetOpen(false)
        }
        return
    },[search])

    useEffect(()=>{
        setResult([])
        SetSearch('')
        return
    },[possition])

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

    const editname = async function () {
        const data = {
            
        }        
    }

    const delaccount = async function() {
        const data = {
            email: user.email,
            password: password
        }
        
        try{
            const reqest = await fetch("http://localhost:3000/users/delete-acount",{
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            if(reqest.ok){
                SetMode('login')
                SetUser(null)
            }else{
                setErrorMessage('не верный пароль')
            }
        }catch(err){
            console.log(err)
        }
    }

    const checkPossition = function(){
        if(possition === 'main') return(
            <div className="body-info">
                <label id="Hello-label">Здравствуйте {user?.name}</label>
                <label id="email-label">{user?.email}</label>
                {errorMessage ? <label id="err">{errorMessage}</label>: <label></label>}
                <div id="search-complex"><img src={seak} alt="seak"></img><input placeholder="поиск" className="search" onChange={(e)=>{SetSearch(e.target.value)}}></input></div>
                {open ? <div id="open-search-container">
                    <label onClick={()=>{if(result.length > 0)setPossition(result[0].possition)}}>{result.length > 0 && search !== '' ? result[0].title : 'ничего не нашлось'}</label>
                </div> : <div id="close-search-container"><label id="search-notfound"></label></div>}
            </div>
        )
        else if(possition === 'personal-info') return(
            <div className="body-info">
                <p className="personal-info-felds">Имя</p>
                <label className="personal-info-felds">{user.name}</label>
                <p className="personal-info-felds">Почта</p>
                <label className="personal-info-felds">{user.email}</label>
                <p className="personal-info-felds">Дата регистрации</p>
                <label className="personal-info-felds">{new Date(user.regdate).toLocaleDateString('ru-RU')}</label>
            </div>
        )
        else if(possition === 'safaty-info') return(
            <div className="body-info">
                <div id="pleace-area">
                    <div className="safaty-info-cntainer"><label className="topic">Дата регистрации</label><label className="info-felds">{new Date(user.regdate).toLocaleDateString('ru-RU')}</label></div>
                    <div className="safaty-info-cntainer"><label className="topic">Редактировать имя</label><label className="info-felds"></label></div>
                    <div className="safaty-info-cntainer"><label className="topic">Редактировать email</label><label className="info-felds"></label></div>
                    <div className="safaty-info-cntainer"><label className="topic">Пароль</label><label className="info-felds"></label></div>
                    <div className="safaty-info-cntainer"><label className="topic">Активные сессии</label><label className="info-felds"></label></div>
                    <div className="safaty-info-cntainer"><label className="topic">Двухэтапная аунтефикация</label><label className="info-felds"></label></div>
                    <div className="safaty-info-cntainer"><label onClick={()=>{setPossition('accept-password')}} className="topic">Удалить аккаунт</label><label className="info-felds"></label></div>
                </div>
            </div>
        )
        else if(possition === 'data-info') return(
            <div className="body-info">
                <label>Какая-то информация</label>
                <label></label>
                <label></label>
                <label></label>
            </div> 
        )
        else if(possition === 'accept-password')return(
                <div id="accept-delete-form">
                    <label>Введите пароль от аккаунта</label>
                    <div id="password-complex">
                        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className="input-area" placeholder="Введите пароль" type={showPassword ? "text" : "password"}></input>
                        <button id="eye-button" type="button" aria-label="Показать пароль" onClick={()=> setShowPassword(!showPassword)} ><img id="eye" src={showPassword ? openeye : closeeye} alt=""></img></button>
                    </div>
                    <p id="error-mesege">{errorMessage}</p>
                    <button onClick={()=>{delaccount()}} id="accept-button">Подтвердить</button>
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