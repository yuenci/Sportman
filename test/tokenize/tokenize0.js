function token(word) {
    const regexWord = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu; //只包含字母，不包含标点和数字
    //const regexInPunc = /^((?!\d).)[a-zA-Z]|\p{P}+((?!\d).)*$/gu; //不包含数字，可以包含字母和标点
    const regexInPunc = /^((?![0-9]).)*$/gu; //不包含数字，可以包含字母和标点
    const regexPunc = /\p{P}/gu; //标点

    if (regexWord.test(word)) {
        console.log(`[🔵:${word}]`);
    } else if (regexInPunc.test(word)) {
        if (word.indexOf("#") === 0) {
            if (!regexPunc.test(word.substring(1, word.length))) {
                console.log(`[🏷️ :${word}]`);
            } else {
                console.log(`[🔘🏷️ :${word}]`);
            }
        }
        else {
            console.log(`[🔘:${word}]`);
        }

    } else {
        console.log(`[❌:${word}]`);
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