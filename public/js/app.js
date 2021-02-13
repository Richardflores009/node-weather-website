const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



const weatherFunction = (location) => {
    
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
}





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let location = searchEl.value
    weatherFunction(location)
})