import { dictionary } from '../script/dictionary'
import { Tools } from '../script/toolShop'

class Timer {
    constructor() {
        this.type = localStorage.getItem("currentPage");
        this.word = localStorage.getItem("currentWord");
        this.example = localStorage.getItem("currentWord");
        this.durtion = 0;
        this.timer = null;
    }

    addone = () => {
        this.durtion++;
        // console.log(this.durtion);
    }

    start() {
        this.timer = setInterval(this.addone, 1000)
    }

    async end() {
        clearInterval(this.timer)
        //console.log(`${this.type} page final duration:${this.durtion}`);
        // return this.durtion

        let message = await dictionary.patchDuration(this.durtion);
        return message;
    }
}

export { Timer };