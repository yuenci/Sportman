import '../style/rlayer.css'

class Rlayer {
    constructor() {
        if (!Rlayer.instance) {
            this.showStatus = false;
            Rlayer.instance = this;
        }
        return Rlayer.instance;
    }

    show() {
        let rlayer = document.querySelector("#rlayer");
        if (!rlayer) {
            let $rlayer = $(`<div id="rlayer"></div>`);
            $("#inbox-in").append($rlayer);
            this.showStatus = true;
        } else {
            this.remove();
        }
    }

    remove() {
        if (this.showStatus) {
            $("#rlayer").remove();
            this.showStatus = false;
        }
    }
}

export { Rlayer };