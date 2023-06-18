export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getTimeString,
    getDate
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300){
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    return monthNames[date.getMonth()]
}

function getTimeString(date, isDetails = false) {
    date = new Date(date)
    const now = Date.now()
    const diff = now - date
    
    //by milliseconds:
    const min = 60000
    const hour = 3600000
    const day = 86400000
    const week = 604800000

    // const month = getMonthName(date)
    // const monthDay = date.getDate()
    // const hours = padNum(date.getHours())
    // const minutes = padNum(date.getMinutes())

    // let formattedDate = (diff > week) ? `${monthDay} ${month}` :
    //     (diff > day) ? `${getDayName(date, 'en-GB')}` : `${hours}:${minutes}`

    if (isDetails) {
        const formattedDate = (diff > week) ? `${Math.floor(diff / week)} WEEKS AGO` :
        (diff > day) ? `${Math.floor(diff / day)} DAYS AGO` : 
        (diff > hour) ? `${Math.floor(diff / hour)} HOURS AGO` : 
        (diff > min) ? `${Math.floor(diff / min)} MINUTES AGO` : `1 MINUTE AGO`

        return formattedDate
    }

    const formattedDate = (diff > week) ? `${Math.floor(diff / week)}w` :
        (diff > day) ? `${Math.floor(diff / day)}d` : 
        (diff > hour) ? `${Math.floor(diff / hour)}h` : 
        (diff > min) ? `${Math.floor(diff / min)}m` : `1m`

    return formattedDate
}

function getDate (date) {
    date = new Date(date)

    const year = date.getFullYear()
    const month = getMonthName(date)
    const monthDay = date.getDate()

    let formattedDate = `${monthDay} ${month}, ${year}`

    return formattedDate
}