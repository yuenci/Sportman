import '../style/inbox.css'
import { dictionary } from './dictionary'
import { Tools } from './toolShop'
import { sentence } from './sentenceObj'
import { Content } from './contentObj'
import { Html } from "./htmlContent"
import { TP } from './textProcess'

class Inbox {
    constructor() {
        this.content = Html.inbox;
        this.create();
    }

    create() {
        $("#inbox-in").append($(`${this.content}`))
        $("#inbox-ta")
            .focus(function () {
                $("#inbox").css("box-shadow", "0 2px 16px lightblue");
            })
            .blur(function () {
                $("#inbox").css("box-shadow", "none");
            });


        $("#inbox-ta").on('input propertychange', function () {
            if ($(this).val()) {
                //限制长度
                let maxchara = 378;
                if ($(this).val().length > maxchara) {
                    let limitword = $(this).val().substring(0, maxchara);
                    $("#inbox-ta").val(limitword);
                }

                //按钮亮起
                $("#enter-btn").css("background-color", "blue")


                if ($(this).get(0).scrollHeight > 120) {
                    $(this).height(0);
                    $(this).height(this.scrollHeight);
                } else {
                    // $(this).height(90);
                }
            } else {
                $("#enter-btn").css("background-color", "#cecece")
                $(this).height(100);
            }
        });

        $("#enter-btn").click(function () {
            let inboxValue = $("#inbox-ta").val()
            let inboxWords = inboxValue.split(" ")
            let inboxWordsWithoutPound = []
            for (const word of inboxWords) {
                let wordWithoutPound = TP.tagCheck(word)
                if (wordWithoutPound) {
                    inboxWordsWithoutPound.push(wordWithoutPound)
                }
            }

            if (inboxValue) {
                // 写个小工具可以提取标签，然后发送到后台
                dictionary.postNewTag(inboxWordsWithoutPound)

                dictionary.postSentenceTODB(inboxValue).then(function (msg) {
                    let newSen = new sentence(inboxValue, Tools.getDateTime())
                    Content.addDESC(newSen);
                    $("#inbox-ta").val("");
                    $("#enter-btn").css("background-color", "#cecece");
                })
            }
        });

        $("#inbox-ta").keydown(function (e) {
            if (e.ctrlKey && e.which == 13) {
                // console.log("ctrl + enter");
                $("#enter-btn").click();
            }
        });
    }




}

export { Inbox };