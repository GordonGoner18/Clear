import "./success-regmessage-page.css"

const SuccessRegmessage = function({SetMode}) {
    
    return(
        <div id="body-form">
            <label className="registration-success-title">Вы успешно зарегистрировались</label>
            <button className="success-continue" onClick={()=>{SetMode('login')}}>Войти</button>
        </div>
    )
}

export default SuccessRegmessage