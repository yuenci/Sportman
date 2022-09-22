import { dictionary } from "./dictionary"
import '../style/read.css'
import { Timer } from '../script/timer'
import { Tools } from "./toolShop";
window.lala = "lalal"
window.readTimer = new Timer();
$(document).ready(function () {
    showNewExample();
    var myBoard = new DrawingBoard.Board('painter');

    readTimer.start();
})

// $(window).unload(function () {
//     readTimer.end();
// });


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

    $("#reading-sentence").text(Tools.getUpperSen(sen))
    layer.close(index);
}