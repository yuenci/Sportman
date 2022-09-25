/*
1. 要可以区分出word tag和chara
2. 区分之后在外面套上标签
*/
var stopwords = ['this'];


function tokenizeSentences(sentence) {
    //., \/#!$%\^&\*;:{}=\-_`~()]
    //!"$%&'()*+,-./:;<=>?@[]^_`{|}~\
    const charaRegex = /([\!\"\$\%\&\\\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~])/g;
    const wordRegex = /(?<word>\b(?<!#)[a-zA-Z]+\b)/g;
    const tagRegex = /(?<tag>#[a-zA-Z]+\b)/g;


    const str = 'Hello,world. This is a test. #test #test2';


    const cleanString = str.replace(regex, '<span class="main-chara">$1</span>');
    console.log(cleanString);
}

function getwords(text) {
}


function getCharas() {

}

function getTags() {

}

// var text = "This is a short text about StackOverflow.";




// console.log(words); // ["is", "short", "text", "about", "StackOverflow"]

// console.log(tokenize("Above all, I'd like to thank my family."));
// console.log(tokenize("Above all, I'd like to thank my #family."));

// var text = "This is a short text about StackOverflow.";
// var stopwords = ['this'];

// var words = text.split(/\W+/).filter(function (token) {
//     token = token.toLowerCase();
//     return token.length >= 2 && stopwords.indexOf(token) == -1;
// });

//console.log(words); // ["is", "short", "text", "about", "StackOverflow"]

// word
// (\b(?<!#)[a-zA-Z]+\b)

//tag
//(#[a-zA-Z]+\b)

//chara
//((?<=[a-zA-Z])\p{P}|\p{P}(?![a-zA-Z]))


// let dateRegexp = /(?<word>\b(?<!#)[a-zA-Z]+\b)|(?<tag>#[a-zA-Z]+\b)|(?<chara>(?<=[a-zA-Z])\p{P}|\p{P}(?![a-zA-Z]))/;
// let str = "Above all, I'd like to thank my #family.";

// let groups = str.match(dateRegexp).groups;

// console.log(groups.word); // 2019
// console.log(groups.tag); // 04
// console.log(groups.chara); // 30


// const regex = /(?<word>\b(?<!#)[a-zA-Z]+\b)|(?<tag>#[a-zA-Z]+\b)|((?<=[a-zA-Z])\p{P}|\p{P}(?![a-zA-Z]))/g;

// // Alternative syntax using RegExp constructor
// // const regex = new RegExp('(?<word>\\b(?<!#)[a-zA-Z]+\\b)|(?<tag>#[a-zA-Z]+\\b)|((?<=[a-zA-Z])\\p{P}|\\p{P}(?![a-zA-Z]))', 'g')

// const str = `Above all, I'd like to thank my #family. .`;
// let m;

// while ((m = regex.exec(str)) !== null) {
//     // This is necessary to avoid infinite loops with zero-width matches
//     if (m.index === regex.lastIndex) {
//         regex.lastIndex++;
//     }

//     // The result can be accessed through the `m`-variable.
//     m.forEach((match, groupIndex) => {
//         console.log(`Found match, group ${groupIndex}: ${match}`);
//     });
// }


//(?<word>\b(?<!#)[a-zA-Z]+\b)|(?<tag>#[a-zA-Z]+\b)|((?<=[a-zA-Z])\p{P}|\p{P}(?![a-zA-Z]))


// const regex = '/([\!\"\$\%\&\\\\\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\\\]\^\_\`\{\|\}\~])/';
// var rawString = 'Hello, ? / world!';
// var cleanString = rawString.replace(regex, '<span class="main-chara">$1</span>');
// console.log(cleanString);

// const reg = /(\d{3})(\d{2})(\d*)(\d{4})/
// let phoneNum = "15612345678"
// const res = phoneNum.replace(reg, '$1****$2****$3****$4')
// console.log(res) // "156****12****34****5678"


// const regex = /(?<tag>#[a-zA-Z]+\b)/g;

// const str = 'Hello,#world';


// const cleanString = str.replace(regex, '<span class="main-chara">$1</span>');
// console.log(cleanString);


// const charaRegex = /([\!\"\$\%\&\\\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~])/g;
// const wordRegex = /(?<word>\b(?<!#)[a-zA-Z]+\b)/g;
// const tagRegex = /(?<tag>#[a-zA-Z]+\b)/g;


// const str = 'Hello,world. #tag ?';


// const cleanString = str.replace(charaRegex, '<span class="main-chara">$1</span>')
//     .replace(wordRegex, '<span class="main-word">$1</span>')
//     .replace(tagRegex, '<span class="main-word tag">$1</span>');
// console.log(cleanString);

function test1(sentence) {
    // 单词要能单独识别出来，标点符号也是，标签也是
    // word
    // word,
    // #tag
    // i'd
    let characters = [",", ".", "?"];

    let args = sentence.split(" ");
    let res = [];
    for (const ele of args) {
        let length = ele.length;
        if (ele[0] === "#" && length > 1) {
            // include tag
            if (characters.includes(ele[length - 1])) {
                // include chara
                let span = `<span class="main-word tag">${ele.substring(0, length - 1)}</span>
                        <span class="main-chara">${ele.substring(length - 1, length)}</span>`
                res.push(span)
            } else {
                // dont include chara
                let span = `<span class="main-word tag">${ele}</span>`
                res.push(span)
            }
        } else {
            if (characters.includes(ele[length - 1])) {
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
// test1("In this video I'm going to show you how to create #RESTful APIs using Flask and #document it by generating API specification in Open API aka #Swagger format using apispec and configure Swagger UI.")

// console.time('计时器1');
function test2(sentence) {
    let args = sentence.split(" ");
    let res = [];
    if (regexpWord.test(sentence)) {

        res.push(span)
    } else if (regexpWord.test(sentence)) {

        res.push(span)
    } else if (regexpWord.test(sentence)) {

        res.push(span)
    } else {

    }
}
//test1("In this video I'm going to show you how to create #RESTful APIs using Flask and #document it by generating API specification in Open API aka #Swagger format using apispec and configure Swagger UI.")

// let regex = /\b(?<!#)[a-zA-Z]+\b/g;
// console.log("Hello ,world. #tag ?".match(regex));

// console.timeEnd('计时器1');




// 1. 用函数的方法
// 2. 用纯正则
// 3. 用正则和函数的组合


// 单词要能单独识别出来，标点符号也是，标签也是
// word
// word,
// #tag
// i'd

// 先检测是否有标点，如果没有直接二处理。
// 如果有#，直接套上标签class
//如果有，先把标点符号去掉，然后再处理，最后再把标点符号加回去

function test3(sentence) {
    punctuation = "#!\"$%&'()*+,-./:;<=>?@[]^_`{|}~\\"
    let words = sentence.split(" ");
    let res = [];

    for (const word of words) {
        let index = str.indexOf(word);
        // if()
    }
}
//stripscript


// function test3(sentence) {
//     punctuation = "#!\"$%&'()*+,-./:;<=>?@[]^_`{|}~\\"
//     let words = sentence.split(" ");
//     let res = [];

//     for (const word of words) {
//         let index = str.indexOf(word);
//         // if()
//     }
// }

//console.time('计时器11');
function stripscript(sentence) {

    let words = sentence.split(" ");
    let res = [];
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    const regex = /\p{P}/gu;
    for (const word of words) {
        if (!pattern.test(pattern)) {
            // 不包含特殊字符
            res.push(`<span class="main-word">${word}</span>`);
        } else if (word.indexOf("#") === 0) {
            // 包含特殊字符，且以#开头
            res.push(`<span class="main-word tag">${word}</span>`);
        } else if (true) {
            // 包含特殊字符，且不以#开头
            //const regex = /\p{P}/gu;
            let newStr = word.replace(regex, `<span class="main-chara">$&</span>`)
            res.push(newStr);
        }

        return res.join(" ");
    }
}
//stripscript("In this video I'm going to show you how to create #RESTful APIs using Flask and #document it by generating API specification in Open API aka #Swagger format using apispec and configure Swagger UI.")
//console.timeEnd('计时器11');

function replace1(str) {

    //let ma = str.match(regex);
    console.log(newStr);
}


function test() {
    replace1(".lalala")
    replace1("I'd")
    replace1("Id.")
    replace1("I#5r,d.")
}
//test()

// function stripscript(sentence) {
//     let words = sentence.split(" ");
//     let res = [];
//     const regex = /\p{P}/gu;
//     for (const word of words) {
//         if (!pattern.test(regex)) {
//             // 不包含特殊字符
//             res.push(`<span class="main-word">${word}</span>`);
//         } else if (word.indexOf("#") === 0) {
//             // 包含特殊字符，且以#开头
//             res.push(`<span class="main-word tag">${word}</span>`);
//         } else if (true) {
//             // 包含特殊字符，且不以#开头
//             let newStr = word.replace(regex, `<span class="main-chara">$&</span>`)
//             res.push(`<span class="main-word">${newStr}</span>`);
//         } else {
//             //do noting
//             //include number 
//         }
//         return res.join("");
//     }
// }


// 1. 只包含字母
// 2. 只包含字母和标点（# and other）
// 3. 其他

function stripscript1(sentence) {
    let words = sentence.split(" ");
    let res = [];
    const regex = /\p{P}/gu;
    for (const word of words) {
        if (!pattern.test(regex)) {
            // 不包含特殊字符
            res.push(`<span class="main-word">${word}</span>`);
        } else if (word.indexOf("#") === 0) {
            // 包含特殊字符，且以#开头
            res.push(`<span class="main-word tag">${word}</span>`);
        } else if (true) {
            // 包含特殊字符，且不以#开头
            let newStr = word.replace(regex, `<span class="main-chara">$&</span>`)
            res.push(`<span class="main-word">${newStr}</span>`);
        } else {
            //do noting
            //include number 
        }
        return res.join("");
    }
}


// 1. 只包含字母,不包含标点和数字
//let re1 = /[a-zA-Z]+/gu

// console.time("11111");
// let re1 = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu
// console.log(re1.test("I'??d")) //f
// console.log(re1.test("88adas")) //f
// console.log(re1.test("aaaa")) //t
// console.timeEnd("11111");//6.054ms

// 2. 只包含字母和标点（# and other）
// console.time("11111");
// let re2 = /^((?!\d).).((?!\d).)*$/gu
// console.log(re2.test("I'??d")) //t
// console.log(re2.test("88adas"))//f
// console.log(re2.test("aaaa")) //t
// console.timeEnd("11111"); //6.614ms

console.time("c1");
function tokenize(sentence) {
    let words = sentence.split(" ");
    let res = [];
    const regexWord = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu
    const regexInPunc = /^((?!\d).).((?!\d).)*$/gu
    const regexPunc = /\p{P}/gu;
    for (const word of words) {
        if (regexWord.test(word)) {
            // 只包含字母
            res.push(`<span class="main-word">${word}</span>`);
        }
        else if (regexInPunc.test(word)) {
            // 只包含字母和标点（# and other）
            if (word.indexOf("#") === 0) {
                // 以#开头
                res.push(`<span class="main-word tag">${word}</span>`);
            } else {
                // 不以#开头
                let newStr = word.replace(regexPunc, `<span class="main-chara">$&</span>`)
                res.push(`<span class="main-word">${newStr}</span>`);
            }
        }
        else {
            //do noting
        }
    }
    return res.join(" ");
}

function tokenizeT(sentence) {
    let words = sentence.split(" ");
    let res = [];
    const regexWord = /^((?!\p{P}|\d).)*[a-zA-Z]+((?!\p{P}|\d).)*$/gu; //只包含字母，不包含标点和数字
    const regexInPunc = /^((?!\d).)\S+((?!\d).)*$/gu; //不包含数字，可以包含字母和标点
    const regexPunc = /\p{P}/gu; //标点
    for (const word of words) {
        if (regexWord.test(word)) {
            console.log(`[word:${word}]`);
        } else if (regexInPunc.test(word)) {
            console.log(`[Tag:${word}]`);
        } else {
            console.log(`[Error:${word}]`);
        }
        // if (regexWord.test(word)) {
        //     // 只包含字母
        //     res.push(`<w>${word}</w>`);
        // }
        // else if (regexInPunc.test(word)) {
        //     // 只包含字母和标点（# and other）
        //     if (word.indexOf("#") === 0) {
        //         // 以#开头
        //         res.push(`<t>${word}</t>`);
        //     } else {
        //         // 不以#开头
        //         let newStr = word.replace(regexPunc, `<c>$&</c>`)
        //         res.push(`<w>${newStr}</w>`);
        //     }
        // }
        // else {

        //     console.log(`[error:${word}]`);
        //     //do noting
        // }
    }
    return res.join(" ");
}
//tokenize("In this video I'm going to show you how to create #RESTful APIs using Flask and #document it by generating API specification in Open API aka #Swagger format using apispec and configure Swagger UI.")
console.log(tokenizeT("Education he #card five."));
// console.timeEnd("c1");

// const regexPunc = /\p{P}/gu;
// console.log("five.".replace(regexPunc, `<c>$&</c>`));

// let re2 = /^((?!\d).)\S+((?!\d).)*$/gu
// console.log(re2.test("five.")) //


// const regexInPunc = /^((?!\d).)\S+((?!\d).)*$/gu
// console.log(regexInPunc.test("five."));