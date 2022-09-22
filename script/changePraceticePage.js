import { PracticeLayer } from './practiceLayer.js'

document.querySelector('.box').onclick = function () {
    console.log("hi");
    let preacticeLayer = PracticeLayer.getInstance();
    preacticeLayer.changeUrl();
}