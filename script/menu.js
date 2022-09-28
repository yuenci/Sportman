import "../style/menuStyle.css"
import { TagM } from "./tagManager.js";
import { LogoButton } from "./logoBtn.js";
import { EmojyPicker } from "./emojyPicker.js";
import { sentence } from "./sentenceObj.js";

class Menu {
    // tools
    static clickEventRegister(selector, func) {
        document.querySelector(selector).onclick = func;
    }

    static TagMenu($btnObj) {
        let pin = $btnObj.parent().attr("type") == "tag" ? "Pin" : "Unpin";
        let config = {
            //https://layuion.com/docs/modules/layer.html
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            title: false, //是否显示标题
            closeBtn: 0, //不显示关闭按钮
            anim: 5, //出现动画
            shade: [0.001, '#000'],
            shadeClose: true, //开启遮罩关闭
            offset: [`${$btnObj.offset().top + 36}px `, `${$btnObj.offset().left - 50}px`],
            content: `
                           <ul class="menu-ul" id="tag-menu">
                                <li id="tag-menu-pin">${pin}</li>
                                <li id="tag-menu-set-icon">Set Icon</li>
                                <hr/>
                                <li id="tag-menu-del">Delete</li>
                            </ul>
                            `,
            fixed: false, //是否固定位置
            shade: 0,
            id: "tagMenu"
        }
        return config
    }


    static TagMenuClickEvent() {
        this.clickEventRegister("#tag-menu-pin",
            () => TagM.switchPinUnpain()
        );
        this.clickEventRegister("#tag-menu-set-icon",
            () => console.log("icon")
        );
        this.clickEventRegister("#tag-menu-del",
            () => TagM.deleteTagItem()
        );
    }

    static logoMenu($btnObj) {
        let config = {
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            title: false, //是否显示标题
            closeBtn: 0, //不显示关闭按钮
            anim: 5, //出现动画
            // shade: [0.5, "#000"],
            shade: 0,
            shadeClose: false, //开启遮罩关闭
            // offset: ['100px', '50px'], //位置
            offset: [`${$btnObj.offset().top + 50}px `, `${$btnObj.offset().left}px`],
            content: `
                        <ul class="menu-ul">
                            <li id="logo-menu-account">Account</li>
                            <li>222222222222</li>
                            <li>333333333333</li>
                        </ul>
                    `,
            fixed: false, //是否固定位置
        }

        return config;
    }

    static logoMenuClickEvent() {
        this.clickEventRegister("#logo-menu-account",
            () => LogoButton.showAccountSetting()
        );
        // this.clickEventRegister("#tag-menu-set-icon",
        //     () => console.log("hi from tag-menu-set-icon")
        // );
        // this.clickEventRegister("#tag-menu-del",
        //     () => TagM.deleteTagItem()
        // );
    }


    static sentenceMenu($btnObj) {
        let config = {
            //https://layuion.com/docs/modules/layer.html
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            title: false, //是否显示标题
            closeBtn: 0, //不显示关闭按钮
            anim: 5, //出现动画
            shade: [0.001, '#000'],
            shadeClose: true, //开启遮罩关闭
            // offset: ['100px', '50px'], //位置
            offset: [`${$btnObj.offset().top + 30}px `, `${$btnObj.offset().left - 85}px`],
            content: `
                    <ul class="menu-ul">
                        <li>Edit</li>
                        <li>Pin</li>
                        <hr/>
                        <li>View details</li>
                        <li>Annotate</li>
                        <li id="sen-menu-delete">Delete</li>
                        <hr/>
                        <li>Word count:<span id="word-count">66</span></li>
                    </ul>
                    `,
            fixed: false, //是否固定位置
        }

        return config;
    }

    static senMenuClickEvent() {
        // this.clickEventRegister("#logo-menu-account",
        //     () => console.log("hi from logo-menu-account")
        // );
        // this.clickEventRegister("#tag-menu-set-icon",
        //     () => console.log("hi from tag-menu-set-icon")
        // );
        this.clickEventRegister("#sen-menu-delete",
            console.log(this)
        );
    }

    static searchMenu($btnObj) {
        let config = {
            //https://layuion.com/docs/modules/layer.html
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            title: false, //是否显示标题
            closeBtn: 0, //不显示关闭按钮
            anim: 5, //出现动画
            shade: [0.001, '#000'],
            shadeClose: true, //开启遮罩关闭
            // offset: ['100px', '50px'], //位置
            offset: [`${$btnObj.offset().top + 50}px `, `${$btnObj.offset().left - 226}px`],
            content: `
                    <ul class="menu-ul" id="search-menu">
                        <li>111111111111</li>
                        <li>222222222222</li>
                        <li>333333333333</li>
                    </ul>
                    `,
            fixed: false, //是否固定位置
        }

        return config;
    }
}

export { Menu };