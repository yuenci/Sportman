import { Tools } from "./toolShop";
import { Examples } from "./examples";
import { dictionary } from "./dictionary";

export class PracticeLayer {

    static getInstance() {
        if (!this.instance) {
            this.instance = new PracticeLayer();
        }
        return this.instance
    }

    static show() {
        layer.open({
            type: 2,
            anim: 5,
            title: Tools.getUpperWordFromLocal(),
            shadeClose: false,
            shade: 0.8,
            area: ["80%", "80%"],
            shade: [0.95, '#000'],
            closeBtn: 2,
            // TODO 入口
            content: `../html/${localStorage.getItem("currentPage")}.html`,
            // content: "../html/2.examples.html",
            //content: "../html/3.read.html",
            //ontent: "../html//5.listen.html",

            // 给next 按钮加回调事件
            success: function aaa(layero, index) {
                var boxobj = layer.getChildFrame('.next-page', index).get(0);
                boxobj.addEventListener("click", function () {
                    let currPage = localStorage.getItem("currentPage");
                    if (currPage == "explains") {
                        layer.iframeSrc(index, "../html/examples.html");
                        localStorage.setItem("currentPage", "examples");
                    } else if (currPage == "examples") {
                        Examples.exampleNextBtnClickEvent(layer.getChildFrame('.examplesSen', index)).then(
                            function (choosed) {
                                if (choosed) {
                                    layer.iframeSrc(index, "../html/read.html");
                                    localStorage.setItem("currentPage", "read");
                                } else {
                                    Tools.getAlertLayer("Choose at least one")
                                }
                            }
                        );

                    } else if (currPage == "read") {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        iframeWin.readTimer.end().then(
                            function (data) {
                                if (data["msg"] === "success") {
                                    layer.iframeSrc(index, "../html/write.html");
                                    localStorage.setItem("currentPage", "write");
                                }
                                else {
                                    Tools.getAlertLayer("Duration record failed")
                                }
                            }
                        )
                    } else if (currPage == "write") {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        iframeWin.writeTimer.end().then(
                            function (data) {
                                if (data["msg"] === "success") {
                                    layer.iframeSrc(index, "../html/listen.html");
                                    localStorage.setItem("currentPage", "listen");
                                }
                                else {
                                    Tools.getAlertLayer("Duration record failed")
                                }
                            }
                        )


                    } else if (currPage == "listen") {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        iframeWin.listenTimer.end().then(
                            function (data) {
                                if (data["msg"] === "success") {
                                    layer.iframeSrc(index, "../html/speak.html");
                                    localStorage.setItem("currentPage", "speak");
                                }
                                else {
                                    Tools.getAlertLayer("Duration record failed")
                                }
                            }
                        )

                    } else if (currPage == "speak") {
                        var iframeWin = window[layero.find('iframe')[0]['name']];
                        iframeWin.speakTimer.end().then(
                            function (data) {
                                if (data["msg"] === "success") {
                                    layer.iframeSrc(index, "../html/read.html");
                                    localStorage.setItem("currentPage", "read");
                                }
                                else {
                                    Tools.getAlertLayer("Duration record failed")
                                }
                            }
                        )
                    }

                });
            }
        });
    }


}

//TODO 关闭该层之前要先保存duration数据