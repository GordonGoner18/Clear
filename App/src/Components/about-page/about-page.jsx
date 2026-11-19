import { useEffect, useState } from 'react'
import './about-page.css'

const About = function(){
    const [animation, SetAnimation] = useState(false)

    useEffect(()=>{
        const callback = function(entries){
            if(entries[0].isIntersecting)
            SetAnimation(true)
        }
            const MainLabel = document.getElementById('main-about')
            const listener = new IntersectionObserver(callback)
            listener.observe(MainLabel);
        return ()=>{listener.disconnect()}
    },[])

    return(
        <div id='about-body'>
            <p className={animation ? 'main-active' : 'main-passive'} id='main-about'>Что это за сервис?</p>
            <p>«Прозрачно» — проект, который помогает людям старшего возраста увереннее пользоваться интернетом и распознавать признаки мошенничества.</p>
            <p>Мы разрабатываем сервис проверки сайтов с простым интерфейсом, крупными элементами и понятными объяснениями. Наша цель — помочь человеку заметить возможную угрозу и разобраться, как действовать дальше.</p>
            <p>Проект находится в разработке. В будущем мы хотим создать браузерное расширение, которое будет предупреждать о подозрительных страницах прямо во время просмотра.</p>
            <p>Остались вопросы?</p>
            <div id='email-complex'>
                <label>Направляйте их на</label>
                <a type='email'>clearofficail@gmail.com</a>
            </div>
        </div>
    )
}

export default About