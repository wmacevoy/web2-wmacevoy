// alert('hello world')

let showme = document.getElementById('showme')
let countdown = document.getElementById('countdown')
var counter = 4

showme.style.setProperty("visibility","hidden")

function clickCheese() {
    showme.style.setProperty("visibility","hidden")
    counter = 4
    setTimeout(timeout,1000)
}

showme.onclick = clickCheese

function timeout() {
    if (counter == 0) {
        showme.style.setProperty("visibility","visible")
    } else {
        counter = counter - 1
        countdown.innerText="" + counter + "..."
        setTimeout(timeout,1000)
    }
}

setTimeout(timeout,1000)


