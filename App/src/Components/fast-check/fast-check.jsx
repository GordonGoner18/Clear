import { useEffect, useState } from "react"
import './fast-check.css'
import AiIcon from '../../icons/ai.png'

const FastCheck = function(){
    const[answer, setAnswer] = useState('')
    const[reqest_text, SetReqestText] = useState('')
    const [animation, SetAnimation] = useState(false)
    const[loading, setLoading] = useState(false)
    const[message, setMessage] = useState('Здесь будет ответ')


    const GetAiResponse = async function(){
        setLoading(true)

        const data = {
            qestion: reqest_text
        }
        
        try{
            const reqest = await fetch('http://localhost:3000/users/aiqestion',{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            if(reqest.ok){
                setMessage('Ответ получен')
            }else{
                setLoading(false)
                setMessage('Произошла ошибка')
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        const callback = function(entries){
            if(entries[0].isIntersecting)
            SetAnimation(true)
        }
            const MainLabel = document.getElementById('main-label-check')
            const listener = new IntersectionObserver(callback)
            listener.observe(MainLabel);
        return ()=>{listener.disconnect()}
    },[])

    return(
        <div id="fast-check-main-body">
            <label className={animation ? 'acive-label-check' : 'pasive-label-check'} id="main-label-check">Проверте сайт или ресурс</label>
            <div id="fast-check-body">
                <div id="input-check-complex">
                    <label>Ведите имя или адрес ресурса для проверки</label>
                    <input value={reqest_text} onChange={(e)=>{SetReqestText(e.target.value)}}></input>
                    <button onClick={GetAiResponse}>Продолжить</button>
                </div>
                <div id="answer-body">
                {loading ?
                    <div id="loading-complex">
                        <label id="dots1">.</label>
                        <label id="dots2">.</label>
                        <label id="dots3">.</label>
                        <label id="loading">Готовлю ответ</label>
                        <img id="AiIocn" src={AiIcon} alt="AiIcon"></img>
                    </div>
                  : <div id="loading-complex"><label id="loading">{message}</label></div>}
                    <label id="aianswer">{answer}</label>
                <label id="ai-mistake">ИИ может ошибатся</label>
                </div>
                <label id="qustion-label"></label>
            </div>
        </div>
    )
}

export default FastCheck