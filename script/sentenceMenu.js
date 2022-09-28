import { dictionary } from './dictionary'
import { Tools } from './toolShop';

class SentenceMenu {
    static editSentence($btnObj) {
        let text = $btnObj.parent().parent().find(".sentence-content").text()
        $("#inbox-ta").val(text)
    }

    static pinSentence($btnObj) {
        console.log("pin sentence");
    }

    static viewDetails($btnObj) {
        console.log("view details");
    }

    static viewMetadata($btnObj) {
        console.log("view metadata");
        layer.open({
            title: "Metadata",
            type: 1,
            //skin: 'layui-layer-lan', //加上边框
            area: ['420px', '240px'], //宽高
            content: 'html内容'
        });
    }

    static annotateSentence($btnObj) {
        console.log("annotate sentence");
    }

    static deleteSentence($btnObj) {
        let $box = $btnObj.parent().parent()

        let $sentence = $box.find(".sentence-content")
        let id = $sentence.attr("data-id")

        let menuText = id.indexOf("-1") !== -1 ? "Restore" : "Delete";

        if (menuText == "Delete") {
            dictionary.deleteSentenceFromDB(id)
            $box.remove();
            Tools.senNumChange(-1);
            layer.closeAll('page');
        } else {
            dictionary.restoreSentenceFromDB(id.substring(0, id.length - 2))
            //fa-searchconsole.log("restore sentence");
            $box.remove();
            Tools.senNumChange(1);
            layer.closeAll('page');
        }

    }
}

export { SentenceMenu };