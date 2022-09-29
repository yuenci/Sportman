import { dictionary } from "./dictionary.js";
import { Content } from "./contentObj.js";

function frameClose() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}


$("#cancel-btn").click(function () {
    frameClose();
});




document.querySelector("#customPunc-input").addEventListener("focus", function () {
    document.getElementById("custom").checked = true;
})


document.querySelector("#preview").addEventListener("click", function () {
    addNewCard("11111111111111")
})

let container = document.getElementById("cards-container");

let previewTip = document.getElementById("preview-tip");


function addNewCard(sentence) {
    if (previewTip) {
        previewTip.style.display = "none";
        previewTip = null;
    }
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = sentence;
    container.appendChild(card);
}

function removeCard() {
    $(container).empty();
}


let textArea = document.getElementById("import-ta");
let importBtn = document.getElementById("import-btn");


textArea.addEventListener('input', function () {
    let val = textArea.value
    importBtnColorEvent(val);
    parser();
})

function importBtnColorEvent(val) {
    if (val) {
        importBtn.classList.add("import-btn-active");
    } else {
        importBtn.classList.remove("import-btn-active");
    }
}

function parser() {
    let type = radioCheck();
    let val = textArea.value
    if (type && val) {
        let parser = parserFactory(type);
        let sentences = parser.parse(val);
        removeCard();
        sentences.forEach(sentence => {
            addNewCard(sentence);
        });
    } else {
        removeCard();
        previewTip = document.getElementById("preview-tip");
        previewTip.style.display = "inline-block";
    }
}

function radioCheck() {
    let radio = document.querySelector("input[type='radio']:checked");
    if (radio) {
        return radio.value;
    }
    return null;
}

function getPunc() {
    let punc = document.getElementById("customPunc-input");
    if (punc && punc.value) {
        console.log(punc.value);
        return punc.value;
    }
    return "\n";
}

function parserFactory(type) {
    switch (type) {
        case "newline":
            return new NewlineParser();
        case "semicolon":
            return new SemicolonParser();
        case "custom":
            return new CustomParser(getPunc());
    }
}

class NewlineParser {
    parse(val) {
        return val.split("\n");
    }
}

class SemicolonParser {
    parse(val) {
        return val.split(";");
    }
}

class CustomParser {
    constructor(punc) {
        this.punc = punc;
    }

    parse(val) {
        return val.split(this.punc);
    }
}

function getAllSentence() {
    let sentences = [];
    $(".card").each(function () {
        sentences.push($(this).text());
    })
    return sentences;
}

let index = null;

importBtn.addEventListener("click", function () {
    sendSensToDB();
})

$(textArea).keydown(function (e) {
    if (e.ctrlKey && e.which == 13) {
        sendSensToDB();
    }
});

function sendSensToDB() {
    index = layer.confirm('Are you sure to import there cards', {
        title: 'Import cards',
        btn: ['confirm', 'cancel'] //按钮
    }, function () {
        dictionary.addBatchSentences(getAllSentence()).then(data => {
            console.log(data)
            layer.close(index);
            if (data["msg"] === "success") {
                console.log("hi");
                frameClose();
            } else {
                layer.msg("Import failed")
            }
        })
    }, function () {
        //pass
    });
}