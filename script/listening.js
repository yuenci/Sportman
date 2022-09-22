import "../style/listening.css"
import { Tools } from "./toolShop";

// https://github.com/greghub/green-audio-player
import { Timer } from '../script/timer'

window.listenTimer = new Timer();
$(document).ready(function () {
    let curSen = localStorage.getItem("currentExample");
    $("#listen-source").attr("src", `${Tools.getAudioUrl(curSen)}`);
    console.log(`${Tools.getAudioUrl(curSen)}`);
    new GreenAudioPlayer('.gap-example');
    listenTimer.start();
})

$(window).unload(function () {
    listenTimer.end();
});

