import '../style/rlayer.css'

class Rlayer {
    constructor() {
        if (!Rlayer.instance) {
            Rlayer.instance = this;
        }
        return Rlayer.instance;
    }

    show() {
        // $("#inbox-in").empty();
        // $("#content").empty();
        let rlayer = document.querySelector("#rlayer");
        if (!rlayer) {
            let $rlayer = $(`<div id="rlayer"></div>`);
            $("#inbox-in").append($rlayer);
            console.log("hi");
        } else {
            rlayer.remove()
            console.log("bye");
        }
    }

    remove() {

    }
}

export { Rlayer };