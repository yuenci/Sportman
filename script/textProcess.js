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

    static senUrlFormat(sentence) {
        let args = sentence.split(" ");
        return args.join("+");
    }
}


export { TP };

// Test cases
// console.log(TP.splitSenToWords("Above all, I'd like to thank my family."));
