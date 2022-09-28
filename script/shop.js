import { Html } from "../script/htmlContent"
import "../style/shop.css"
import { Content } from "./contentObj";
import { dictionary } from "./dictionary";

class Shop {
    constructor() {
        this.content = Html.shop;
        this.create();
    }

    create() {
        let $shop = $(`${this.content}`)
        let $shopItems = $shop.find(".shop-item")
        $("#shop").append($shop)

        $shopItems.each(function () {
            $(this).click(function () {
                $shopItems.each(function () {
                    $(this).removeClass("shop-item-active")
                });

                $(this).toggleClass("shop-item-active")
            });
        });

        document.querySelector("#shop-sportman").addEventListener("click", this.sportManClickEvent)

        document.querySelector("#shop-lucky").addEventListener("click", this.getLuckyClickEvent)

        document.querySelector("#shop-explore").addEventListener("click", this.exploreClickEvent)

        document.querySelector("#shop-plugin").addEventListener("click", this.pluginClickEvent)
    }


    sportManClickEvent = function () {
        Content.addAllDESC();
    }

    getLuckyClickEvent = function () {
        dictionary.getLucky().then((data) => {
            let text = data["sentence"]
            let datetime = data["time"]
            let id = data["id"]

            Content.showLucky(text, datetime, id);
        })
    }

    exploreClickEvent() {
        console.log("hi explore")
    }

    pluginClickEvent() {
        console.log("hi plugin")
    }
}

export { Shop };