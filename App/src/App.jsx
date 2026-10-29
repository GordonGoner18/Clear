import './App.css'
import Header from'./Components/Header/header.jsx'
import Home from './Components/home-page/home-page.jsx'
import Login from './Components/login-page/login.jsx'
import SuccessRegmessage from './Components/success-regmessage-page/success-regmessage-page.jsx'

function App() {
  return (
    <div>
      <Header/>
      <Home/>
      <Login/>
      <SuccessRegmessage/>
    </div>
  )
}

export default App
