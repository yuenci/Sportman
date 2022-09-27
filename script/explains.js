import { dictionary } from './dictionary'

$(document).ready(function () {
    getExplainsFromDB();
})

async function getExplainsFromDB() {
    //console.log("explain page init");
    let word = localStorage.getItem("currentWord")
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
        $("#explains-word").text(word);
        layer.close(index);
        for (const ele of data) {
            let $ele = $(`${ele}`)
            $("#explains-app").append($ele)
            $ele.find(".switch_children").click(function () {
                $(this).children(".cn_txt").toggleClass("cn_txt_show");
            })
        }
    }

}


