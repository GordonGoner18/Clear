import { useEffect, useState } from 'react'
import './popular-question.css'

const Popular = function(){
    const [open, setOpen] = useState([
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
    ])

    const [animation, SetAnimation] = useState(false)

    let preOpen = [
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
        {
            open: false
        },
    ]
    
    const SetOpen = (num)=>{
        if(open[num].open){
            preOpen[num].open = false
            setOpen(preOpen)
        }else{
            preOpen[num].open = true
            setOpen(preOpen)
        }
    }
    
    useEffect(()=>{
        const callback = function(entries){
            if(entries[0].isIntersecting)
            SetAnimation(true)
        }
            const MainLabel = document.getElementById('main-qestion-label')
            const listener = new IntersectionObserver(callback)
            listener.observe(MainLabel);
        return ()=>{listener.disconnect()}
    },[])

    return(
        <div id='popular-qeustion-body'>
            <p className={animation ? 'main-label-active' : 'main-label-pasive'} id='main-qestion-label'>Популярные вопросы</p>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(0)}} className='question'>Что такое «Прозрачно»?</label>
                {open[0].open ? <p className='answer'>Это проект, который помогает людям старшего возраста распознавать признаки интернет-мошенничества. Мы разрабатываем сервис проверки сайтов с понятными объяснениями.</p> : ''}
            </div>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(1)}} className='question'>Для кого создан сервис?</label>
                {open[1].open ? <p className='answer'>Для всех, кому нужна помощь с безопасностью в интернете. Особое внимание мы уделяем крупному тексту, понятным кнопкам и простым инструкциям.</p> : ''}
            </div>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(2)}} className='question'>Как будет проходить проверка сайта?</label>
                {open[2].open ? <p className='answer'>Вы сможете вставить ссылку и запустить проверку. Сервис покажет обнаруженные признаки опасности и объяснит, на что обратить внимание. Эта возможность находится в разработке.</p> : ''}
            </div>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(3)}} className='question'>Можно ли полностью доверять результату проверки?</label>
                {open[3].open ? <p className='answer'>Ни одна проверка не гарантирует полной безопасности. Если угрозы не обнаружены, всё равно внимательно относитесь к просьбам ввести пароль, сообщить код из СМС или перевести деньги.</p> : ''}
            </div>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(4)}} className='question'>Что делать, если сайт кажется подозрительным?</label>
                {open[4].open ? <p className='answer'>Не вводите личные данные, не скачивайте файлы и не выполняйте указания на странице. Закройте её. Свяжитесь с нужной организацией через известный вам официальный канал.</p> : ''}
            </div>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(5)}} className='question'>Значок замка рядом с адресом означает, что сайт безопасен?</label>
                {open[5].open ? <p className='answer'>Он означает, что соединение с сайтом зашифровано. Сам сайт при этом может принадлежать мошенникам.</p> : ''}
            </div>
            <div className='question-complex'>
                <label onClick={()=>{SetOpen(6)}} className='question'>Остались еще вопросы?</label>
                {open[6].open ? 
                <div id='email-qestion-complex'>
                    <label className='answer'>Направляйте их на</label>
                    <a type='email'>clearofficail@gmail.com</a>
                </div> : ''}
            </div>
        </div>
    )
}

export default Popular