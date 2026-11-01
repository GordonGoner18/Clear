import "./success-regmessage-page.css"

const SuccessRegmessage = function({SetMode}) {
    
    return(
        <div id="body-form">
            <label id="main-label">Вы успешно зарегистрировались</label>
            <button id="next" onClick={()=>{SetMode('login')}}>Войти</button>
        </div>
    )
}

export default SuccessRegmessage