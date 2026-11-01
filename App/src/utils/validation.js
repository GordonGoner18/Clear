const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)\S{8,20}$/

export const checkEmail = function (email) {
    if (email === "") return "Введите email"
    if (!emailRegex.test(email)) return "Проверьте email: он должен быть вида name@mail.ru"
    return ""
}

export const checkName = function (name) {
    if (name === "") return "Введите имя"
    if (name.length < 2) return "Имя должно быть не короче 2 букв"
    if (name.length > 20) return "Имя должно быть не длиннее 20 букв"
    return ""
}

export const checkPassword = function (password, repeat) {
    if (password === "") return "Введите пароль"
    if (repeat === "") return "Повторите пароль"
    if (password !== repeat) return "Пароли не совпадают"
    if (password.length < 8) return "Пароль должен быть не короче 8 символов"
    if (password.length > 20) return "Пароль должен быть не длиннее 20 символов"
    if (!passwordRegex.test(password)) return "Пароль должен содержать буквы и цифры, без пробелов"
    return ""
}

export const checkCheckBox = function (checked) {
    if (!checked) return "Примите политику пользования"
    return ""
}
