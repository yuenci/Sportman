import "../style/listening.css"
import { Tools } from "./toolShop";

// https://github.com/greghub/green-audio-player
import { Timer } from '../script/timer'

window.listenTimer = new Timer();

var player = null;
$(document).ready(function () {
    let curSen = localStorage.getItem("currentExample");
    $("#listen-source").attr("src", `${Tools.getAudioUrl(curSen)}`);
    //console.log(`${Tools.getAudioUrl(curSen)}`);
    player = new GreenAudioPlayer('.gap-example');
    listenTimer.start();
})

$(window).unload(function () {
    listenTimer.end();
});

let audio = document.getElementById("listen-audio");

$("body").keydown(function (event) {
    if (event.keyCode == 82) {
        player.player.play();
    }
});

