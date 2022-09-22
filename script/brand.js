import '../style/brand.css'
import { Html } from "../script/htmlContent"
import { Content } from './contentObj'

class Brand {
    constructor() {
        if (!Brand.instance) {
            this.content = Html.brand;
            this.ifLoading = false;
            this.iftagShow = false;
            this.tesss = false;
            this.create();
            Brand.instance = this;
        }

        return Brand.instance;
    }

    create() {
        let $brand = $(`${this.content}`);
        $("#search-box").append($brand);

        $("#brand-sub1").css({ "display": "flex", "flex-direction": "row", "justify-content": "space-between" })

        document.querySelector("#brand-container").addEventListener("click", () => this.brandClickEvent())
    }



    brandClickEvent() {
        if (this.iftagShow) {
            Content.addAllDESC();
            if (!this.ifLoading) {
                this.hidetag();
            } else {
                this.hidetag();
                this.brandSwithEvent();
            }
        } else {
            if (!this.ifLoading) {
                this.brandSwithEvent();
                Content.addAllDESC().then(function (data) {
                    let brand = new Brand();
                    brand.brandSwithEvent();
                })

            } else {
                this.brandSwithEvent();
                console.log("22222");
            }
        }
    }

    brandSwithEvent() {
        if (this.ifLoading) {
            //在loading页面
            $("#brand-sub1").css({ "display": "flex", "flex-direction": "row", "justify-content": "space-between" })
            $("#brand-sub2").css("display", "none")
        } else {
            $("#brand-sub1").css("display", "none")
            $("#brand-sub2").css({ "display": "flex", "flex-direction": "row", "justify-content": "space-between" })
        }
        this.ifLoading = !this.ifLoading
    }


    showTag(tagName) {
        if (this.ifLoading) {
            this.brandSwithEvent()
        }

        $(".fa-sync").hide();
        $("#brand-tag-name").text(tagName)
        $("#brand-container").css("width", "90px");
        $("#brand-slash").css("display", "inline-block");
        $("#brand-tag-name").css("display", "inline-block")
        $("#brand-container").css("padding", "5px 3px")
        this.iftagShow = true;
    }

    hidetag() {
        $(".fa-sync").show();
        $("#brand-container").css("width", "120px");
        $("#brand-slash").css("display", "none");
        $("#brand-tag-name").css("display", "none")
        $("#brand-container").css("padding", "5px 5px")
        this.iftagShow = false;
    }


}

export { Brand };