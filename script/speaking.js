import { Timer } from '../script/timer'

window.speakTimer = new Timer();
$(document).ready(function () {
    speakTimer.start();
})

$(window).unload(function () {
    speakTimer.end();
});