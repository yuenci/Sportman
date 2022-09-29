import { Tools } from './toolShop'
import { Http } from './http'

class dictionary {

    static async getAllSentences() {
        let data = await Http.getRequeste(
            "/sentences",
            { "sentence": "all" }
        )
        return data
    }

    static async getExplains(word) {
        let data = await Http.getRequeste(
            "/explains",
            { "word": word }
        )
        return data
    }

    static async getExamples(word) {
        let data = await Http.getRequeste(
            "/examples",
            { "word": word }
        )
        return data
    }

    static async updateExamplesDisplay(jsonData) {
        let data = await Http.putRequeste(
            "/examples",
            jsonData
        )
        return data
    }

    static async createExampleRecord(jsonData) {
        let data = await Http.postRequeste(
            "/examples",
            jsonData
        )
        return data
    }

    static async getNewExampleSen(word) {
        let data = await Http.getRequeste(
            "/examples/new",
            { "word": word }
        )
        return data
    }

    static async patchDuration(duration) {
        let data = await Http.patchRequeste(
            "/examples/duration",
            {
                "id": localStorage.getItem("currentExampleID"),
                "type": Tools.typeConversion(localStorage.getItem("currentPage")),
                "duration": duration
            }
        )
        return data
    }

    static async getWordLearingStatus(word) {
        let data = await Http.getRequeste(
            "/examples/status",
            { "word": word }
        )
        return data
    }

    static async postSentenceTODB(sentence) {
        let msg = await Http.postRequeste(
            "/sentences",
            { "sentence": sentence }
        )
        return msg
    }

    static async querySentenceFromDB(keyword) {
        //console.log("query tags from DB");
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

    static async deleteSentenceFromDB(sentenceID) {
        let data = await Http.deleteRequeste(
            "/sentences",
            { "sentenceID": sentenceID }
        )
        return data
    }

    static async restoreSentenceFromDB(sentenceID) {
        let data = await Http.patchRequeste(
            "/sentences/trash",
            { "sentenceID": sentenceID }
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
        //console.log("post new tag");
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

    static async getTrash() {
        let data = await Http.getRequeste(
            "/sentences/trash",
            { "type": "trash" }
        )
        return data
    }

    static async postChatMessages(messagesList) {
        let data = await Http.postRequeste(
            "/chat",
            { "messages": messagesList }
        )
        return data
    }

    static async addBatchSentences(sentencesList) {
        console.log(sentencesList);
        let data = await Http.postRequeste(
            "/sentences/batch",
            { "sentences": sentencesList }
        )
        return data
    }

    static async getStreak() {
        let data = await Http.getRequeste(
            "/examples/streak",
            { "type": "streak" }
        )
        return data
    }

    static async storeSentenceWordsToCache(sentence) {
        let data = await Http.postRequeste(
            "/explains/cache",
            { "sentence": sentence }
        )
        return data
    }
}

export { dictionary };