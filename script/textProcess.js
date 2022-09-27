import { TagM } from './tagManager'
class TP {
    static characters = [",", ".", "?"]

    static splitSenToWords(sentence) {
        let args = sentence.split(" ");
        let res = [];
        for (const ele of args) {
            let length = ele.length;
            if (ele[0] === "#" && length > 1) {
                // include tag

                if (this.characters.includes(ele[length - 1])) {
                    // include chara

                    let text = ele.slice(1, length - 1);
                    TagM.addTagToDB(text);

                    let span = `<span class="main-word tag">${ele.substring(0, length - 1)}</span>
                        <span class="main-chara">${ele.substring(length - 1, length)}</span>`
                    res.push(span)
                } else {
                    // dont include chara
                    let text = ele.slice(1, length);
                    TagM.addTagToDB(text);

                    let span = `<span class="main-word tag">${ele}</span>`
                    res.push(span)
                }
            } else {
                if (this.characters.includes(ele[length - 1])) {
                    let span = `<span class="main-word">${ele.substring(0, length - 1)}</span>
                        <span class="main-chara">${ele.substring(length - 1, length)}</span>`
                    res.push(span)
                } else {
                    let span = `<span class="main-word">${ele}</span>`
                    res.push(span)
                }
            }
        }
        return res.join(" ");
    }

    static tokenize(sentence) {
        let words = sentence.split(" ");
        let res = [];
        const regexWord = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/u; //只包含字母，不包含标点和数字
        const regexWordAndPunc = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*\p{P}$/u; //只包含字母和末尾符号
        const regexPuncAndWord = /^\p{P}((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/u; //只包含字母和末尾符号
        const regexTag = /^#((?![0-9]|\p{P}).)*$/u; //不包含数字，可以包含字母和标点
        const regexTagAndPunc = /^#((?![0-9]|\p{P}).)*\p{P}$/u; //不包含数字，可以包含字母和标点
        const regexPunc = /\p{P}/gu; //标点

        for (const wordE of words) {
            let word = wordE.replaceAll("+", " ");
            if (regexWord.test(word)) {
                // 仅单词
                //console.log(`[🔵:${word}]`);
                res.push(`<span class="main-word">${word}</span>`);
            }
            else if (regexWordAndPunc.test(word)) {
                //单词末尾
                //console.log(`[🔵🔘:${word}]`);
                res.push(`<span class="main-word-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
                regexPunc.lastIndex = 0;
            }
            else if (regexTag.test(word)) {
                // 仅标签
                // console.log(`[🏷️:${word}]`);
                res.push(`<span class="main-word-tag">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
                regexPunc.lastIndex = 0;
            } else if (regexTagAndPunc.test(word)) {
                //标签末尾有符号
                //console.log(`[🔘🏷️:${word}]`);
                res.push(`<span class="main-word-tag-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
                regexPunc.lastIndex = 0;
            } else if (regexPuncAndWord.test(word)) {
                //开头有符号
                res.push(`<span class="main-word-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
                //console.log("punc start");
                regexPunc.lastIndex = 0;
            }
            else {
                //console.log(`[❌:${word}]`);
                res.push(`<span>${word}</span>`);
            }
        }

        return res.join(" ");
    }

    static tagCheck(tag) {
        let tag1 = tag.replaceAll("+", " ");
        let regexNum = /[0-9]+/;
        let regexTag = /^#((?!\p{P}).)*[a-zA-Z]+$/u;
        let regexTagAndPunc = /^#[a-zA-Z]+?\p{P}*$/u;
        if (regexNum.test(tag1)) {
            // 数字
            return null;
        } else if (regexTag.test(tag1)) {
            // 仅标签
            console.log(`${tag1}: ${regexTag.test(tag1)}-tag`);
            return tag1.substring(0, tag1.length);
        } else if (regexTagAndPunc.test(tag1)) {
            // 标签和标点
            console.log(`${tag1}: ${regexTagAndPunc.test(tag1)}-tagPunc`);
            return tag1.substring(0, tag1.length - 1);
        } else {
            // 其他
            // console.log(`${tag1}: ❌`);
            return null;
        }
    }

    static senUrlFormat(sentence) {
        let args = sentence.split(" ");
        return args.join("+");
    }


}


export { TP };

// Test cases
// console.log(TP.splitSenToWords("Above all, I'd like to thank my family."));
