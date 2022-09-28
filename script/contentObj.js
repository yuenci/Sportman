import { sentence } from "./sentenceObj.js"
import { dictionary } from "./dictionary.js"

class Content {
    static addASC($jqSentenceObj) {
        $("#content").append($jqSentenceObj);
    }

    static addDESC($jqSentenceObj) {
        $("#content").prepend($jqSentenceObj);
    }

    static addObjsASC(objsData) {
        let sentences = objsData["data"]
        $("#content").empty();
        for (const ele of sentences) {
            Content.addASC(new sentence(ele[0], ele[1], ele[2]));
        }
    }

    static addObjsDESC(objsData) {
        let sentences = objsData["data"]
        $("#content").empty();
        for (const ele of sentences) {
            Content.addDESC(new sentence(ele[0], ele[1], ele[2]));
        }
    }

    static showLucky(text, datetime, id) {
        $("#content").empty();
        Content.addDESC(new sentence(text, datetime, id));
    }

    static addAllASC() {
        dictionary.getAllSentences().then(function (data) {
            let sentences = data["data"]
            for (const ele of sentences) {
                Content.addASC(new sentence(ele[0], ele[1], ele[2]));
            }
        })
    }

    static addAllDESC() {
        return new Promise(
            function (resolve) {
                dictionary.getAllSentences().then(function (data) {
                    let sentences = data["data"]
                    for (const ele of sentences) {
                        Content.addDESC(new sentence(ele[0], ele[1], ele[2]));
                    }
                    setTimeout(() => resolve("sync successfully"), 500);
                })
            })

    }

    static queryAllDESC(word) {
        dictionary.querySentenceFromDB(word).then(function (data) {
            let sentences = data["data"]
            $("#content").empty();
            for (const ele of sentences) {
                Content.addDESC(new sentence(ele[0], ele[1], ele[2]));
            }
        })
    }

    static queryTimeDESC(time) {
        dictionary.querySentenceByTimeFromDB(time).then(function (data) {
            let sentences = data["data"]
            $("#content").empty();
            for (const ele of sentences) {
                Content.addDESC(new sentence(ele[0], ele[1], ele[2]));
            }
        })
    }

    static addAllTrash(time) {
        dictionary.getTrash().then(function (data) {
            Content.addObjsASC(data)
        })
    }
}

export { Content };