import "./styles.css";
// console.log("hello world!");

let axios = require('axios')

const randomTextUrl = 'https://api.quotable.io/random'


let textDisplay = document.getElementById('textDisplay')
let textInput = document.getElementById('textInput')
let timer = document.getElementById('timer')


// =====================

/* axios.get(randomTextUrl)
    .then((res) => {

        let data = res.data.content
        textDisplay.innerText = ''

        data.split('').forEach((character) => {

            let createSpan = create('span')
            createSpan.innerText = character
            textDisplay.appendChild(createSpan)
        })

    })
    .catch((err) => {
        console.log(err.message);
    }) */


// ==========================


function renderText() {

    axios.get(randomTextUrl)
        .then((res) => {

            let data = res.data.content
            textDisplay.innerText = ''

            data.split('').forEach((character) => {

                let createSpan = create('span')
                createSpan.innerText = character
                textDisplay.appendChild(createSpan)
            })

        })
        .catch((err) => {
            console.log(err.message);
        })

    window.onload = startTimer()
}



textInput.addEventListener('input', function () {

    const arrayText = textDisplay.querySelectorAll('span')
    const arrayValue = textInput.value.split('')

    let correct = true

    arrayText.forEach((createSpan, index) => {

        let character = arrayValue[index]

        if (character == null) {

            createSpan.classList.remove('correct')
            createSpan.classList.remove('incorrect')
            correct = false

        } else if (character === createSpan.innerText) {

            createSpan.classList.add('correct')
            createSpan.classList.remove('incorrect')

        } else {

            createSpan.classList.add('incorrect')
            createSpan.classList.remove('correct')
            correct = false
        }


    })

    if (correct) {

        textInput.value = null
        renderText()
    }


})


let startTime

function startTimer() {
    startTime = new Date()
    timer.innerText = 0
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date - startTime) / 1000)
}



window.onload = renderText()



// Dom Element Creating Function 

window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}