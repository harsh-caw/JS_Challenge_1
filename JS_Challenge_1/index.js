const circle = document.querySelector(".progress_ring");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
circle.style.strokeDasharray = circumference;

const startingMinutesEL = document.getElementById('min');
const startingSecondsEL = document.getElementById('sec');
startingMinutesEL.defaultValue = "25";
startingSecondsEL.defaultValue = "00"

const img = document.querySelector('img')
img.onclick = () => {
    document.getElementById("min").disabled = document.getElementById("sec").disabled = false;
  }

let time, totalsecs;
let audio = new Audio('vintage-alarm.wav');
let refreshIntervalId;
let btn = document.getElementById("start");
let flag = true;
btn.addEventListener('click', event => {
    if(flag){
        document.getElementById("min").disabled = document.getElementById("sec").disabled = true;
        totalsecs = time = parseInt(startingMinutesEL.value) * 60 + parseInt(startingSecondsEL.value);
        flag = false;
    }
    if (btn.textContent === "start"){
        refreshIntervalId = setInterval(updateCountdown, 1000);
    }
    updateBtn();
});

function updateBtn() {
    if (btn.textContent === "start") {
        btn.textContent = "stop";
    } else {
        btn.textContent = "start";
        clearInterval(refreshIntervalId);
    }
}

function updateCountdown(){
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    perc = Math.ceil(((totalsecs - time) / totalsecs) * 100);
    setProgress(perc);
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    startingMinutesEL.value = `${minutes}`
    startingSecondsEL.value = `${seconds}`
    // countdownEL.innerHTML = `${minutes}:${seconds}`
    if(time == 0){
        audio.play();  
        circle.style.strokeDashoffset = 0
        document.getElementsByClassName("ring")[0].style.stroke='red';
        setTimeout(function() {
             audio.pause();
          }, 5000);
        return;
    }
    time--;
}

function setProgress(percent) {
    const offset = (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }