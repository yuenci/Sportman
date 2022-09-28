import { dictionary } from "./dictionary"
import '../style/read.css'
import { Timer } from '../script/timer'
import { Tools } from "./toolShop";

window.readTimer = new Timer();
$(document).ready(function () {
    showNewExample();

    var myBoard = new DrawingBoard.Board('painter');

    readTimer.start();
})

function loadAudio() {
    $("#reading-audio").attr("src", Tools.getAudioUrl(localStorage.getItem("currentExample")))

    console.log(Tools.getAudioUrl(localStorage.getItem("currentExample")));

    document.querySelector("#reading-speaker").addEventListener("click", function () {
        document.querySelector("#reading-audio").play();
    })
}

async function showNewExample() {
    let word = localStorage.getItem("currentWord")
    // loading layer
    var index = layer.load(2, {
        shade: [0.1, '#fff']
    });

    //get data from db
    let examplesData = await dictionary.getNewExampleSen(word)

    let sen = examplesData["example"];

    localStorage.setItem("currentExample", sen)

    loadAudio();

    $("#reading-sentence").text(Tools.getUpperSen(sen))
    layer.close(index);
}