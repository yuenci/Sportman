import '../style/logoBtn.css'
import { Menu } from "../script/menu"
import { Html } from "../script/htmlContent"

class LogoButton {
    constructor() {
        this.content = Html.logoBtn;

        this.create();
    }

    create() {
        let $logoBtn = $(`${this.content}`);
        $("#logo").append($logoBtn)
        var layerIndex = null;
        $logoBtn.click(function (e) {
            e.stopPropagation();
            if (!layerIndex) {
                let index = layer.open(Menu.logoMenu($(this)))
                layerIndex = index;
            }
            else {
                layer.close(layerIndex);
                layerIndex = null;
            }
        })

        $("body").click(function () {
            if (layerIndex) {
                layer.close(layerIndex);
                layerIndex = null;
            }
        });
    }


}

export { LogoButton };