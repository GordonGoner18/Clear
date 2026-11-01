import './App.css'
import Header from'./Components/Header/header.jsx'
import Home from './Components/home-page/home-page.jsx'
import Login from './Components/login-page/login.jsx'
import Reg from './Components/reg-page/reg.jsx'
import SuccessRegmessage from './Components/success-regmessage-page/success-regmessage-page.jsx'
import RecoveryPage from './Components/recovery-page/recovery-page.jsx'
import { useState } from 'react'

function App() {
  const [mode, setMode] = useState()
  return (
    <div>
      <Header/>
      <Home/>
      <RecoveryPage/>
      <Login/>
    </div>
  )
}

export default App
