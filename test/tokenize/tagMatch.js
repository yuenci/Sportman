// 什么是标签？
// 1. 以#开头
// 2. 不是全字母
// 3. 不含数字

function matchTag(tag) {
    let tag1 = tag.replaceAll("+", " ");
    let regexNum = /[0-9]+/;
    let regexTag = /^#((?!\p{P}).)*[a-zA-Z]+$/u;
    let regexTagAndPunc = /^#[a-zA-Z]+?\p{P}*$/u;
    if (regexNum.test(tag1)) {
        // 数字
        return false;
    } else if (regexTag.test(tag1)) {
        // 仅标签
        console.log(`${tag1}:${tag1.substring(0, tag1.length)}: ${regexTag.test(tag1)}-tag`);
    } else if (regexTagAndPunc.test(tag1)) {
        // 标签和标点
        console.log(`${tag1}:${tag1.substring(0, tag1.length - 1)}: ${regexTagAndPunc.test(tag1)}-tagPunc`);
    } else {
        // 其他
        console.log(`${tag1}: ❌`);
    }
    // let tag = tag1.replaceAll("+", " ");
    // console.log(`${tag}--${tag.match(/^#((?![0-9]|\p{P}).)*$/u)}`);
}

function test() {
    matchTag("#hello");
    matchTag("#he?llo");
    matchTag("#hisdsadf");
    matchTag("#hello?");
    matchTag("#hello#");
    matchTag("#asjdf;l??ds");
    matchTag("#aaadasdqw1");
    matchTag("#he88llo");
    matchTag("#8hello");
    matchTag("#hello9");
}

test()