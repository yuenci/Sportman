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

        // $("#searchBox-input").on('input propertychange', function () {
        //     console.log(`inputEvent: ${$(this).val()}`);
        // })

        $("#searchBox-input").keydown(function (event) {
            if (event.keyCode === 13) {
                let keyword = $("#searchBox-input").val();
                if (keyword) {
                    Content.queryAllDESC(keyword);
                } else {
                    Content.addAllDESC();
                }
            }

        });
    }
}

export { SearchBox };