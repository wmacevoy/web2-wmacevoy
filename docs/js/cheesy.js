
class Cheezy {
    config(div,id) {
        this.div = div
        this.id = id
        this.timeout = parseInt(this.div.getAttribute("data-timeout"))
        this.div.innerHTML = 
           '<p id="' + this.id + 'countdown">' + this.id + '</p>' +
           '<img id="' + this.id + 'showme" src="images/cheese-575540.svg" alt="cheese" >'
        this.countdown = document.getElementById(this.id + 'countdown')
        this.showme = document.getElementById(this.id + 'showme')
        this.showme.style.setProperty("visibility","hidden")
        const me = this;
        this.showme.onclick = function() { me.clickShowme() }

        this.counter = this.timeout
        this.nextTime()
        console.log('configured ' + this.id)
    }

    onTimeout(me) {
        console.log('onTimeout for ' + this.id)
        if (this.counter == 0) {
            this.showme.style.setProperty("visibility","visible")
        } else {
            this.counter = this.counter - 1
            this.countdown.innerText="" + this.counter + "..."
            this.nextTime()
        }
    }

    clickShowme() {
        $("#" + this.id + "showme").css("visibility","hidden")
        this.counter = this.timeout
        this.nextTime()
    }

    nextTime() {
        const me = this;
        setTimeout(function() { me.onTimeout(); }, 1000)
    }
}

function documentReady() {
    cheesyDivs = document.getElementsByClassName("cheesy")
    for (let i=0; i<cheesyDivs.length; ++i) {
        const cheesyDiv = cheesyDivs[i]
        const cheesyObj = new Cheezy()
        cheesyObj.config(cheesyDiv,"cheesyId" + i)
    }
}


$( document ).ready(documentReady);
