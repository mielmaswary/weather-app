// fetch('http://puzzle.mead.io/puzzle').then((respons) => {
//     respons.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?adress=maalot').then((respons) => {
//     // console.log(respons)
//     respons.json().then((data) => {
//         if (data.error)
//             console.log(data.error)
//         else
//             console.log(data)

//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let forecastMessageCity = document.getElementById('forecastMessageCity')
let forecastMessageForecast = document.getElementById('forecastMessageForecast')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    forecastMessageCity.textContent = 'Loading...'
    forecastMessageForecast.textContent = ''
    const location = search.value
    fetch('/weather?adress=' + location).then((respons) => {
        // console.log(respons)
        respons.json().then((data) => {
            if (data.error)
                forecastMessageCity.textContent = data.error
            else {
                forecastMessageCity.textContent = data.location
                forecastMessageForecast.textContent = data.forecast
            }

        })
    })

    // console.log(location)
    // console.log(messageContent)
})