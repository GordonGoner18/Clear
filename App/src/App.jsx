import './App.css'
import Header from'./Components/Header/header.jsx'
import Home from './Components/home-page/home-page.jsx'
import Login from './Components/login-page/login.jsx'
import Reg from './Components/reg-page/reg.jsx'
import SuccessRegmessage from './Components/success-regmessage-page/success-regmessage-page.jsx'
import RecoveryPage from './Components/recovery-page/recovery-page.jsx'

function App() {
  return (
    <div>
      <Header/>
      <Home/>
      <RecoveryPage/>
    </div>
  )
}

export default App
