import '../style/toolbar.css'
import { Tools } from "./toolShop"
import { Html } from "./htmlContent"

$("body").append($(`<div class="toolbar-blank"></div>`))

let pageType = Tools.getUpperWord(localStorage.getItem("currentPage"))
$("body").append($(Html.toolBar(pageType)))


let currentPage = localStorage.getItem("currentPage")
if (currentPage == "read") {
    changeProcess(1);
} else if (currentPage == "write") {
    changeProcess(2);
} else if (currentPage == "listen") {
    changeProcess(3);
} else if (currentPage == "speak") {
    changeProcess(4);
}


function changeProcess(num) {
    let dot = document.querySelectorAll(".toolbar-process-item")
    for (let i = 0; i < num; i++) {
        dot[i].style.backgroundColor = "green"
    }
}