import { Tools } from "./toolShop";
import { dictionary } from "./dictionary"
import { Html } from "./htmlContent";



$(document).ready(function () {
    getExamplesFromDB();
})

async function getExamplesFromDB() {
    let word = localStorage.getItem("currentWord")
    // loading layer
    var index = layer.load(2, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });

    //get data from db
    let examplesData = await dictionary.getExamples(word)
    localStorage.setItem("currentExamplesData", JSON.stringify(examplesData))

    $("#examples-word").text(Tools.getUpperWord(word));
    layer.close(index);

    // insert data to app
    let keys = Object.keys(examplesData);
    for (const key of keys) {
        if (examplesData[key]["display"]) {
            const exampleContent = examplesData[key]["content"].replaceAll("--", "'");
            $("#examples-app").append(Html.exampleItem(key, exampleContent));
        }
    }
}