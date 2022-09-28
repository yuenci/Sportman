import '../style/font-awesome-4.7.0/css/font-awesome.min.css'
import '../style/searchBox.css'
import { Content } from './contentObj'
import { Menu } from "../script/menu"
import { Html } from "../script/htmlContent"

class SearchBox {
    constructor() {
        this.content = Html.searchBox;
        this.create()
    }

    create() {
        let $searchBox = $(`${this.content}`)
        $("#search-box").append($searchBox)

        $searchBox.find("#search-confg-icon").click(function () {
            layer.open(Menu.searchMenu($(this)));
        })

        $searchBox.click(function () {
            $("#searchBox-input").focus();
            // console.log("box clicked");
        });

        document.getElementById("searchBox-input").addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.searchDataFromDB();
            }
        })

        // document.getElementById("searchBox-input").addEventListener("keydown", function (e) {
        //     if (e.key === 13) {
        //         searchDataFromDB();
        //     }
        // })

        // $("#searchBox-input").keydown(function (event) {


        // });

        this.searchBtnClickEvent()
    }

    searchBtnClickEvent() {
        let inputObj = document.getElementById("searchBox-input")
        let searchBtn = document.getElementById("search-icon")
        inputObj.addEventListener("input", function () {
            if (inputObj.value) {
                searchBtn.style.color = "#5f5f5f"
            } else {
                searchBtn.style.color = "#9d9d9d"
            }
        })

        searchBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.searchDataFromDB();
        })
    }

    searchDataFromDB() {
        let keyword = $("#searchBox-input").val();
        if (keyword) {
            Content.queryAllDESC(keyword);
        } else {
            Content.addAllDESC();
        }
    }
}

export { SearchBox };