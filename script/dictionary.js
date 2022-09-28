import { Tools } from './toolShop'
import { Http } from './http'

class dictionary {

    static getAllSentences() {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:5000/sentences`,
                    data: { "sentence": "all" },
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static getExplains(word) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:5000/explains`,
                    data: { "word": word },
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )

    }

    static getExamples(word) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:5000/examples`,
                    data: { "word": word },
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static updateExamplesDisplay(jsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "PUT",
                    url: `http://localhost:5000/examples`,
                    data: JSON.stringify(jsonData),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static createExampleRecord(jsonData) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "POST",
                    url: `http://localhost:5000/examples`,
                    data: JSON.stringify(jsonData),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static getNewExampleSen(word) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:5000/examples/new`,
                    data: { "word": word },
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static patchDuration(duration) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "PATCH",
                    url: `http://localhost:5000/examples/duration`,
                    contentType: "application/x-www-form-urlencoded",
                    data: JSON.stringify(
                        {
                            "word": localStorage.getItem("currentWord"),
                            "example": localStorage.getItem("currentExample"),
                            "type": Tools.typeConversion(localStorage.getItem("currentPage")),
                            "duration": duration
                        }
                    ),
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static getWordLearingStatus(word) {
        return new Promise(
            function (resolve) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:5000/examples/status`,
                    data: { "word": word },
                    success: function (data) {
                        resolve(data);
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });
            }
        )
    }

    static async postSentenceTODB(sentence) {
        let msg = await Http.postRequeste(
            "/sentences",
            { "sentence": sentence }
        )
        return msg
    }

    static async querySentenceFromDB(keyword) {
        console.log("query tags from DB");
        let data = await Http.getRequeste(
            "/sentences/query",
            { "type": "word", "word": keyword }
        )
        return data
    }

    static async querySentenceByTimeFromDB(keyword) {
        let data = await Http.getRequeste(
            "/sentences/query",
            { "type": "time", "word": keyword }
        )
        return data
    }


    static async logForLogin(logType) {
        let msg = await Http.postRequeste(
            "/log/login",
            { "type": logType }
        )
        // console.log("login log success");
        return msg
    }

    static async data_heatmap() {
        let data = await Http.getRequeste(
            "/data/heatmap",
            { "type": "heatmap" }
        )
        return data
    }

    static async data_learing() {
        let data = await Http.getRequeste(
            "/data/learing",
            { "type": "learing" }
        )
        return data
    }

    static async postNewTag(tagName) {
        let data = await Http.postRequeste(
            "/tags",
            { "tag": tagName }
        )
        return data
    }

    static async deleteTag(tagName) {
        let data = await Http.deleteRequeste(
            "/tags",
            { "tag": tagName }
        )
        return data
    }

    static async updateTagPinStatus(tagName, status) {
        let data = await Http.patchRequeste(
            "/tags",
            { "tag": tagName, "status": status }
        )
        return data
    }

    static async getAllTags() {
        let data = await Http.getRequeste(
            "/tags",
            { "type": "tag" }
        )
        return data
    }

    // static async getAllTags() {
    //     let data = await Http.getRequeste(
    //         "/tags",
    //         { "type": "tag" }
    //     )
    //     return data
    // }

    static async getLucky() {
        let data = await Http.getRequeste(
            "/sentences/lucky",
            { "type": "lcuky" }
        )
        return data
    }

    static async putCachePosition(position) {
        let data = await Http.putRequeste(
            "/configs",
            { "position": position }
        )
        return data
    }
}

export { dictionary };