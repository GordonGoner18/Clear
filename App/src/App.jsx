import './App.css'
import Header from'./Components/Header/header.jsx'
import Home from './Components/home-page/home-page.jsx'
import Reg from './Components/loginform-regform-page/reg.jsx'
import SuccessRegmessage from './Components/success-regmessage-page/success-regmessage-page.jsx'
import RecoveryPage from './Components/recovery-page/recovery-page.jsx'
import { useEffect, useState } from 'react'
import Loginform from './Components/loginform-regform-page/loginform-page.jsx'
import PersonalAccount from './Components/personal-account/personal-account.jsx'


function App() {
  const [mode, SetMode] = useState('home')
  const [login, SetLogin] = useState(false)
  const [user, SetUser] = useState(null)
  
  const auntification = async function() {
    try{
        const reqest = await fetch("http://localhost:3000/users/auntification",{
        method: "POST",
        headers: {
        "Content-Type" : "application/json"
        },
        credentials: "include"
      })
      if(reqest.ok){
        const data = await reqest.json()
        SetUser(data)
        return true
      }else{
        SetUser(null)
        return false
      }
    }catch(err){
      console.log(err)
      SetUser(null)
      return false
    }
  }

  useEffect(()=>{
    auntification()
    return ()=>{}
  },[])
  
  switch(mode){
    case 'home':
      return(
        <div className='conteiner'>
          <Header SetMode={SetMode} auntification={auntification}/>
          <Home/>
        </div>
      )
    case 'login':
        return(
          <div className='conteiner'>
          <Header SetMode={SetMode} auntification={auntification}/>
          {login? <div>Получилось</div>: <Loginform SetLogin={SetLogin} SetMode={SetMode} SetUser={SetUser}/>}
        </div>
      )
      case 'succes-reg-message': 
      return(
        <div className='conteiner'>
          <Header SetMode={SetMode} auntification={auntification}/>
          <SuccessRegmessage SetMode={SetMode}/>
        </div>
      )
      case 'reg':
        return(
          <div className='conteiner'>
              <Header SetMode={SetMode} auntification={auntification}/>
              <Reg SetMode={SetMode}/>
            </div>
          )
      case 'recovery-password':
        return(
          <div className='conteiner'>
            <Header SetMode={SetMode} auntification={auntification}/>
            <RecoveryPage SetMode={SetMode}/>
          </div>
        )
      case 'prsonal-account':
        return(
          <div className='conteiner'>
            <Header SetMode={SetMode} auntification={auntification}/>
            {user? <PersonalAccount SetMode={SetMode} SetUser={SetUser} user={user}/>: <Loginform SetLogin={SetLogin} SetMode={SetMode} SetUser={SetUser}/>}
          </div>
        )
  }
}
export default App
