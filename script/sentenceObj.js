import { PracticeLayer } from './practiceLayer.js'
import { Tools } from './toolShop.js'
import '../style/sentence.css'
import { Menu } from "../script/menu"
import { Content } from './contentObj'
import { Brand } from "../script/brand"
import { Html } from "../script/htmlContent"
import { dictionary } from './dictionary.js'

class sentence {
    constructor(sen, time, id, cache = false) {
        this.sen = sen;
        this.time = time
        this.id = id;
        this.cache = cache;
        this.$senObj = null;
        this.sentenceContent = Html.sentence(sen, time, id)

        return this.init();
    }

    // 把例子变成一个例子对象，加到content区域，然后加上事件
    init() {
        let $sen = $(this.sentenceContent)
        this.$senObj = $sen;

        //给时间组件添加事件
        $sen.find(".sentence-upper-time").click(this.timeBtnClickEvent)

        //给菜单按钮添加事件
        $sen.find(".sentence-upper-menu-btn").click(this.meunBtnClickEvent)

        //给word 添加事件
        $sen.find(".main-word").each(function () {
            $(this).bind("contextmenu", function () {
                return false;
            })

            $(this).click(function () {
                let word = $(this).text().trim().toLowerCase()
                localStorage.setItem("currentWord", word);
                Tools.ifstartedLearing(word).then(function (status) {
                    //console.log(status);
                    if (status) {
                        localStorage.setItem("currentPage", "read");
                    } else {
                        localStorage.setItem("currentPage", "explains");
                    }
                    PracticeLayer.getInstance(word);
                    PracticeLayer.show();
                })
            })

            $(this).mousedown(function (e) {
                if (e.which === 3) {
                    console.log("right click contextmenu");
                }
            })
        })

        // 给word punctuation 添加事件
        $sen.find(".main-word-punc").each(function () {
            $(this).bind("contextmenu", function () {
                return false;
            })

            $(this).click(function () {
                let word = $(this).text().trim().toLowerCase()
                let text = word.substring(0, word.length - 1);
                localStorage.setItem("currentWord", text);
                Tools.ifstartedLearing(text).then(function (status) {
                    //console.log(status);
                    if (status) {
                        localStorage.setItem("currentPage", "read");
                    } else {
                        localStorage.setItem("currentPage", "explains");
                    }
                    PracticeLayer.getInstance(text);
                    PracticeLayer.show();
                })
            })

            $(this).mousedown(function (e) {
                if (e.which === 3) {
                    console.log("right click contextmenu");
                }
            })
        })

        //给纯tag 添加事件
        $sen.find(".main-word-tag").each(function () {
            let $senJQObj = $(this);
            let text = $senJQObj.text();
            let textWithoutPound = text.substring(1, text.length);
            $senJQObj.unbind();
            $senJQObj.click(function () {
                //console.log(textWithoutPound);
                Content.queryAllDESC(text);
                let brand = new Brand();
                brand.showTag(textWithoutPound)
            })

            $senJQObj.bind("contextmenu", function () {
                return false;
            })
        })

        //给有末尾符号的tag 添加事件
        $sen.find(".main-word-tag-punc").each(function () {
            let $senJQObj = $(this);
            let text = $senJQObj.text();
            //console.log(text);
            let textWithoutPound = text.substring(1, text.length - 1);
            $senJQObj.unbind();
            $senJQObj.click(function () {
                //console.log(textWithoutPound);
                Content.queryAllDESC(text);
                let brand = new Brand();
                brand.showTag(textWithoutPound)
            })

            $senJQObj.bind("contextmenu", function () {
                return false;
            })
        })

        //给句子加双击事件
        $sen.dblclick(function () {
            console.log("double click");
            let text = $(this).find(".sentence-content").text()
            //console.log(text);
            $("#inbox-ta").val(text)
        });

        //屏蔽句子的右键菜单
        $sen.bind("contextmenu", function () {
            return false;
        })

        //检查是否需要缓存
        if (this.cache) {
            this.setSenToDBForCache();
        }

        return $sen
    }

    timeBtnClickEvent = () => {
        let text = $(this)[0]["time"]
        Content.queryTimeDESC(text);
        let brand = new Brand();
        brand.showTag(text.substring(0, 10))
    }

    meunBtnClickEvent() {
        layer.open(Menu.sentenceMenu($(this)));
        Menu.senMenuClickEvent($(this));
    }


    setSenToDBForCache() {

        let $icon = $(`<i class="fa fa-circle-o-notch fa-spin"
            id="sentence-process-icon" aria-hidden="true"></i>`);
        this.$senObj.find(".sentence-upper-time").append($icon);
        $icon = this.$senObj.find(".fa-circle-o-notch");

        dictionary.storeSentenceWordsToCache(this.sen).then(function (data) {
            if (data.msg === "success") {
                // console.log("sentence words stored to cache");
                $icon[0].style.display = "none";
            }
        })
    }

}

export { sentence };