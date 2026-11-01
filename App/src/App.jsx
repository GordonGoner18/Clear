import './App.css'
import Header from'./Components/Header/header.jsx'
import Home from './Components/home-page/home-page.jsx'
import Reg from './Components/loginform-regform-page/reg.jsx'
import SuccessRegmessage from './Components/success-regmessage-page/success-regmessage-page.jsx'
import RecoveryPage from './Components/recovery-page/recovery-page.jsx'
import { useState } from 'react'
import Loginform from './Components/loginform-regform-page/loginform-page.jsx'

function App() {
  const [mode, SetMode] = useState('home')
  const [login, SetLogin] = useState(false)

  switch(mode){
    case 'home':
      return(
        <div className='conteiner'>
          <Header SetMode={SetMode}/>
          <Home/>
        </div>
      )
    case 'login':
        return(
          <div className='conteiner'>
          <Header SetMode={SetMode}/>
          {login? <div>Получилось</div>: <Loginform SetLogin={SetLogin} SetMode={SetMode}/>}
        </div>
      )
      case 'succes-reg-message': 
      return(
        <div className='conteiner'>
          <Header SetMode={SetMode}/>
          <SuccessRegmessage SetMode={SetMode}/>
        </div>
      )
      case 'reg':
        return(
          <div className='conteiner'>
              <Header SetMode={SetMode}/>
              <Reg SetMode={SetMode}/>
            </div>
          )
      case 'recovery-password':
        return(
          <div className='conteiner'>
            <Header SetMode={SetMode}/>
            <RecoveryPage SetMode={SetMode}/>
          </div>
        )
  }
}
export default App
