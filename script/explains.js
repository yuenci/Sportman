import { dictionary } from './dictionary'

$(document).ready(function () {
    let word = localStorage.getItem("currentWord")
    getExplainsFromDB(word);
    getNotesFromDB(word);
})





async function getExplainsFromDB(word) {
    //console.log("explain page init");

    //console.log(`currentWord is ${word}`);

    var index = layer.load(2, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
    let data = await dictionary.getExplains(word)

    if (data["msg"] === "word doesn't exist") {
        layer.close(index);
        layer.msg("word doesn't exist");
        return
    }
    else {
        //$("#explains-word").text(word);
        layer.close(index);
        displayDataToFrame(data);
    }

}

async function getNotesFromDB(word) {
    let data = await dictionary.getNotes(word)
    if (data["error"] === "can't get notes to DB") {
        layer.msg("can't get notes to DB");
        return
    }
    else {
        $("#explains-note-ta").val(data["notes"]);

    }
}

function displayDataToFrame(data) {
    for (const ele of data) {
        let $ele = $(`${ele}`)
        $("#explains-app").append($ele)
        $ele.find(".switch_children").click(function () {
            $(this).children(".cn_txt").toggleClass("cn_txt_show");
        })
    }
}

class Explains {
    static async explainNextBtnClickEvent($textArea) {
        let word = localStorage.getItem("currentWord")
        let explains = $textArea.val();
        let data = await dictionary.postNotesToDB(word, explains)
        if (data["msg"] === "success") {
            return true
        }
        else {
            return false
        }
    }
}

export { Explains }