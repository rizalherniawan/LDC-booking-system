function getTodaysDate(){
    const dateFull = new Date()
    let month = dateFull.getMonth() + 1
    month = month.toString().length < 2 ? "0" + month : month
    let day = dateFull.getDate()
    day = day.toString().length < 2 ? "0" + day : day
    let year = dateFull.getFullYear().toString()
    return year + "-" + month + "-" + day
}

function getHours(){
    let date = new Date()
    let options = { hour12: false }
    let time = date.toLocaleString('en-US', options)
    let clock = time.substring(time.indexOf(" "),time.length - 3).trim()
    return clock
}

module.exports = { getTodaysDate, getHours }
