function token(word) {
    let words = sentence.split(" ");
    let res = [];
    const regexWord = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu; //只包含字母，不包含标点和数字
    const regexWordAndPunc = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*\p{P}$/gu; //只包含字母和末尾符号
    const regexPuncAndWord = /^\p{P}((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu; //只包含字母和末尾符号
    const regexTag = /^#((?![0-9]|\p{P}).)*$/gu; //不包含数字，可以包含字母和标点
    const regexTagAndPunc = /^#((?![0-9]|\p{P}).)*\p{P}$/gu; //不包含数字，可以包含字母和标点
    const regexPunc = /\p{P}/gu; //标点

    if (regexWord.test(word)) {
        // 仅单词
        //console.log(`[🔵:${word}]`);
        res.push(`<span class="main-word">${word}</span>`);
    }
    else if (regexWordAndPunc.test(word) || regexPuncAndWord.test(word)) {
        //单词末尾/开头有符号
        //console.log(`[🔵🔘:${word}]`);
        res.push(`<span class="main-word-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
    }
    else if (regexTag.test(word)) {
        // 仅标签
        //console.log(`[🏷️:${word}]`);
        res.push(`<span class="main-word-tag">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);

    } else if (regexTagAndPunc.test(word)) {
        //标签末尾有符号
        //console.log(`[🔘🏷️:${word}]`);
        res.push(`<span class="main-word-tag-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);

    }
    else {
        //console.log(`[❌:${word}]`);
    }
}
console.time("cost");
function test() {
    token("Above"); //单词
    token("all"); //单词
    token("#like"); //标签
    token("all,"); //单词+后标点
    token("I'd"); //单词+中标点
    token(",like"); //单词+前标点
    token("888to"); //数字
    token("to888"); //数字
    token("t888o"); //数字
    token("#t888o"); //数字
    token("ok"); //数字
    token("#ok"); //数字
    token("#thank,");
    token("#88tha888nk,");
}

test()
console.timeEnd("cost");