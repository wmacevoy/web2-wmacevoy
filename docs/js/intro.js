// alert('hello world')

var showme = null;
var countdown = null;
var counter = 4

function clickCheese() {
    $("#showme").css("visibility","hidden")
    counter = 4
    setTimeout(timeout,1000)
}


function timeout() {
    if (counter == 0) {
        showme.style.setProperty("visibility","visible")
        $("#showme").css("visibility","visible")
    } else {
        counter = counter - 1
        countdown.innerText="" + counter + "..."
        setTimeout(timeout,1000)
    }
}

function documentReady() {
    showme = document.getElementById('showme')
    countdown = document.getElementById('countdown')
    showme.onclick = () =>clickCheese
    showme.style.setProperty("visibility","hidden")
    setTimeout(timeout,1000)
}


$( document ).ready(documentReady);
