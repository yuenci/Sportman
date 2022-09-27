function token(word) {
    let words = sentence.split(" ");
    let res = [];
    const regexWord = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu; //只包含字母，不包含标点和数字
    //const regexInPunc = /^((?!\d).)[a-zA-Z]|\p{P}+((?!\d).)*$/gu; //不包含数字，可以包含字母和标点
    const regexInPunc = /^((?![0-9]).)*$/gu; //不包含数字，可以包含字母和标点
    const regexPunc = /\p{P}/gu; //标点
    for (const word of words) {
        if (regexWord.test(word)) {
            //纯单词
            //console.log(`[🔵:${word}]`);
            res.push(`<span class="main-word">${word}</span>`);
        } else if (regexInPunc.test(word)) {
            if (word.indexOf("#") === 0) {
                //纯标签
                if (!regexPunc.test(word.substring(1, word.length))) {
                    //console.log(`[🏷️ :${word}]`);
                    res.push(`<span class="main-word tag">${word}</span>`);
                } else {
                    //带其他符号的标签
                    //console.log(`[🔘🏷️ :${word}]`);
                    res.push(`<span class="main-word tag">${word.replace(regexPunc, `<span class="main-chara">$&</span>`)}</span>`);
                }
            }
            else {
                //带标点的单词
                //console.log(`[🔘:${word}]`);
                res.push(`<span class="main-word">${word.replace(regexPunc, `<span class="main-chara">$&</span>`)}</span>`);
            }

        } else {
            //do noting
        }
    }
    return res.join(" ");
}