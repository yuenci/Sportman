import '../style/toolbar.css'
import { Tools } from "../script/toolShop"

$("body").append($(`<div class="toolbar-blank"></div>`))

let pageType = Tools.getUpperWord(localStorage.getItem("currentPage"))
$("body").append($(`<div class="toolbar">
                        <div class="toolbar-page-type">${pageType}</div>
                        <button class="next-page">Next</button>
                    <div>"`))