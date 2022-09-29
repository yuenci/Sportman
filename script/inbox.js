import '../style/inbox.css'
import { dictionary } from './dictionary'
import { Tools } from './toolShop'
import { sentence } from './sentenceObj'
import { Content } from './contentObj'
import { Html } from "./htmlContent"
import { TP } from './textProcess'
import { TagM } from './tagManager'

class Inbox {
    constructor() {
        this.content = Html.inbox;
        this.create();
    }

    create() {
        $("#inbox-in").append($(`${this.content}`))
        this.inboxTextAreaEvent();
        this.enterBtnClickEvent();
        this.addBatchEvent();
    }

    inboxTextAreaEvent() {
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

        $("#inbox-ta").keydown(function (e) {
            if (e.ctrlKey && e.which == 13) {
                // console.log("ctrl + enter");
                $("#enter-btn").click();
            }
        });
    }

    enterBtnClickEvent() {
        $("#enter-btn").click(function () {
            let inboxValue = $("#inbox-ta").val()
            let inboxWords = inboxValue.split(" ")
            let inboxTagsList = []

            // check if the words are tags
            let TagMInstance = new TagM();
            for (const word of inboxWords) {
                let inboxTags = TP.tagCheck(word)
                if (inboxTags) {
                    inboxTagsList.push(inboxTags);
                    TagMInstance.addTagItem("tag", inboxTags);
                }

            }

            if (inboxValue) {
                // post tags to db
                dictionary.postNewTag(inboxTagsList)

                // post sen to db
                dictionary.postSentenceTODB(inboxValue).then(function (data) {
                    //console.log(data);
                    let newSen = new sentence(inboxValue, Tools.getDateTime(), data.id, true);
                    Content.addDESC(newSen);
                    $("#inbox-ta").val("");
                    $("#enter-btn").css("background-color", "#cecece");
                    Tools.senNumChange(1);
                })
            }
        });
    }

    addBatchEvent() {
        $("#inbox-add-batch").click(function () {
            let index = layer.open({
                type: 2,
                anim: 5,
                title: false,
                shadeClose: false,
                shade: 0.8,
                area: ["100%", "100%"],
                shade: [0.95, '#000'],
                closeBtn: 0,
                content: `../html/addBatch.html`,
                end: function () {
                    console.log("import batch cancel1");
                    setTimeout(() => Content.addAllDESC(), 1000);
                    Inbox.showAddBatchProcess();
                }

            });
        })
    }

    static showAddBatchProcess() {
        let addBatchStatus = localStorage.getItem("addBatchStatus");
        if (addBatchStatus === "true") {
            $("#inbox-add-batch-process").css("display", "inline-block");
            $("#inbox-add-batch").css("display", "none");
            setTimeout(() => {
                $("#inbox-add-batch-process").css("display", "none");
                $("#inbox-add-batch").css("display", "inline-block");
            }, 3000);
            localStorage.setItem("addBatchStatus", "false");
        }
    }
}

export { Inbox };