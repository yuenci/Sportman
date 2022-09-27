function tokenize(sentence) {
    let words = sentence.split(" ");
    let res = [];
    const regexWord = /^((?!(\p{P}|\d)).)*[a-zA-Z]+((?!(\p{P}|\d)).)*$/u; //只包含字母，不包含标点和数字
    const regexWordAndPunc = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*\p{P}$/u; //只包含字母和末尾符号
    const regexPuncAndWord = /^\p{P}((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/u; //只包含字母和末尾符号
    const regexTag = /^#((?![0-9]|\p{P}).)*$/u; //不包含数字，可以包含字母和标点
    const regexTagAndPunc = /^#((?![0-9]|\p{P}).)*\p{P}$/u; //不包含数字，可以包含字母和标点

    // const regexWord = /((?!(\p{P}|\d)).)*/gu; //只包含字母，不包含标点和数字
    // const regexWordAndPunc = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*\p{P}$/gu; //只包含字母和末尾符号
    // const regexPuncAndWord = /^\p{P}((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu; //只包含字母和末尾符号
    // const regexTag = /^#((?![0-9]|\p{P}).)*$/gu; //不包含数字，可以包含字母和标点
    // const regexTagAndPunc = /^#((?![0-9]|\p{P}).)*\p{P}$/gu; //不包含数字，可以包含字母和标点


    const regexPunc = /\p{P}/gu; //标点

    for (const word of words) {
        if (regexWord.test(word)) {
            // 仅单词
            console.log(`[🔵:${word}]:${regexWord.test(word)}`);
            //res.push(`<span class="main-word">${word}</span>`);
        }
        else if (regexWordAndPunc.test(word)) {
            //单词末尾
            console.log(`[🔵🔘:${word}]`);
            //res.push(`<span class="main-word-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
        }
        else if (regexTag.test(word)) {
            // 仅标签
            console.log(`[🏷️:${word}]`);
            //res.push(`<span class="main-word-tag">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);

        } else if (regexTagAndPunc.test(word)) {
            //标签末尾有符号
            console.log(`[🔘🏷️:${word}]`);
            //res.push(`<span class="main-word-tag-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);

        } else if (regexPuncAndWord.test(word)) {
            //开头有符号的单词
            console.log(`[🔘:${word}]`);
            //res.push(`<span class="main-word-punc">${word.replace(regexPunc, `<span class="main-punc">$&</span>`)}</span>`);
        }
        else {
            console.log(`[❌:${word}]`);
            //res.push(`<span>${word}</span>`);
        }
    }
}

// tokenize("this is a good test")


const regexWord = /^((?!(\p{P}|\d)).)*[a-zA-Z]+((?!(\p{P}|\d)).)*$/gu;
console.log(regexWord.test('five+'));