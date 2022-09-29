import { Conf } from "./config";
import { dictionary } from "./dictionary";
import { TP } from "./textProcess";

class Tools {
    static getUpperWordFromLocal() {
        let word = localStorage.getItem("currentWord")
        return word.replace(word[0], word[0].toUpperCase())
    }

    static getUpperWord(word) {
        return word.replace(word[0], word[0].toUpperCase())
    }

    static getUpperSen(sen) {
        let firstWords = sen.split(" ")[0]
        let upperFirstWords = firstWords.replace(firstWords[0], firstWords[0].toUpperCase())
        return sen.replace(firstWords, upperFirstWords)
    }

    static getAlertLayer(msg) {
        layer.alert(msg, {
            title: false,
            time: 2 * 1000,
            closeBtn: 0
            , success: function (layero, index) {
                var timeNum = this.time / 1000, setText = function (start) {
                    layer.title((start ? timeNum : --timeNum) + ' 秒后关闭', index);
                };
                setText(!0);
                this.timer = setInterval(setText, 1000);
                if (timeNum <= 0) clearInterval(this.timer);
            }
            , end: function () {
                clearInterval(this.timer);
            }
        });
    }
    static typeConversion(type) {
        if (type === "read") return "reading"
        if (type === "write") return "writing"
        if (type === "listen") return "listening"
        if (type === "speak") return "speaking"

        if (type === "reading") return "read"
        if (type === "writing") return "wrtie"
        if (type === "listening") return "listen"
        if (type === "speaking") return "speak"
    }

    static async ifstartedLearing(word) {
        let status = await dictionary.getWordLearingStatus(word)
        // console.log(status);
        return status["status"]
    }

    static getDateTime() {

        var timezone = 8; //东8时区
        var offset_GMT = new Date().getTimezoneOffset();
        var nowDate = new Date().getTime();

        //获取标准时间
        var today = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);

        //获取日期
        var date = today.getFullYear() + "-"
            + String((today.getMonth() + 1)).padStart(2, '0')
            + "-" + String(today.getDate()).padStart(2, '0');

        //获取时间
        var time = String(today.getHours()).padStart(2, '0') + ":"
            + String(today.getMinutes()).padStart(2, '0') + ":"
            + String(today.getSeconds()).padStart(2, '0');

        return `${date} ${time}`
    }

    static getDateTimeFromDateObj(dateOobj) {


        var today = new Date(dateOobj);

        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return `${date} ${time}`
    }

    static getDate3MonthsAgo() {
        let date = new Date;
        let year = date.getFullYear();
        let month = date.getMonth();
        if (month == 0) {
            year = year - 1;
            month = 12;
        }
        //return year + "年" + month + "月";
        return new Date(year, month - 2, 1)
    }

    static getAudioUrl(sen) {
        let formatSen = TP.senUrlFormat(sen)
        let url = `${Conf.audioSource}?audio=${formatSen}&type=1`
        // type0 USA, type1 UK
        return url
    }

    static senNumChange(num) {
        let $senNum = $("#sens-num");
        let currentNum = parseInt($senNum.text())
        $senNum.text(currentNum + num)
    }

    static numberToEmojy(num) {
        let number = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        let numStr = num.toString()
        let emojyStr = ""
        for (let i = 0; i < numStr.length; i++) {
            emojyStr += number[Number(numStr[i])]
        }
        return emojyStr
    }

    static addBatchStatus = false
}

export { Tools };