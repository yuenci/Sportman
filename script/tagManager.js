import "../style/tagManager.css"
import "../style/menuStyle.css"
import { Brand } from "../script/brand"
import { Menu } from "../script/menu"
import { Content } from './contentObj'
import { Html } from "../script/htmlContent"
import { dictionary } from "./dictionary"

class TagM {
    constructor() {
        if (!TagM.instance) {
            this.content = Html.tagManager;
            this.create();
            TagM.instance = this;

        }
        return TagM.instance;

    }

    async create() {
        let $content = $(`${this.content}`)
        $("#tags").append($content)

        let data = await dictionary.getAllTags();
        for (const i in data) {
            let type = data[i] === 1 ? "pined" : "tag"
            this.addTagItem(type, i)
        }



        //给tag 本身注册事件
        document.querySelectorAll('.tag-item').forEach(item => {
            item.addEventListener("click", this.tagClickEvent)
        })

        //给菜单注册事件
        document.querySelectorAll('#tags .tag-ellipsis-h').forEach(item => {
            item.addEventListener("click", this.tagMenuClickEvent)
        })

        //测试：添加item的事件
        document.querySelectorAll("#tagM-title").forEach(item => {
            item.addEventListener("click", () => this.addTagItem("tag", "new item"))
        })

        //测试：添加pined 的事件
        // document.querySelectorAll("#tagM-title1").forEach(item => {
        //     // item.addEventListener("click", () => this.addTagItem("pined", "new item"))
        // })

        //post
        // document.querySelector("#tagM-title1").addEventListener("click",
        //     () => dictionary.postNewTag("3hhhhhha").then(data => {
        //         console.log(data)
        //     }));

        //get
        // document.querySelector("#tagM-title1").addEventListener("click",
        //     () => dictionary.getTagList().then(data => {
        //         console.log(data)
        //     }));

        //update
        // document.querySelector("#tagM-title1").addEventListener("click",
        //     () => dictionary.updateTagPinStatus("3hhhhhha", "1").then(data => {
        //         console.log(data)
        //     }));

        //delete
        // document.querySelector("#tagM-title1").addEventListener("click",
        //     () => dictionary.deleteTag("3hhhhhha").then(data => {
        //         console.log(data)
        //     }));


    }

    tagClickEvent = function () {
        this.addEventListener("click", function (e) {
            e.stopPropagation();
            let brand = new Brand();
            let text = $(this).find(".tag-item-text").text();
            brand.showTag(text)
            Content.queryAllDESC("#" + text)
        })

    }

    tagMenuClickEvent = function () {
        //标记layer状态
        let layerIndex = null;
        let text = $(this).parent().find(".tag-item-text").text()

        // tagMenu 显隐
        this.addEventListener("click", function (e) {
            e.stopPropagation();
            if (!layerIndex) {
                let index = layer.open(Menu.TagMenu($(this)));
                Menu.TagMenuClickEvent();
                layerIndex = index;
            }
            else {
                layer.close(layerIndex);
                layerIndex = null;
            }

            localStorage.setItem("currentActiveTag", text)
        })

        //点击全局关闭
        $("body").click(function () {
            if (layerIndex) {
                layer.close(layerIndex);
                layerIndex = null;
            }
        });
    }

    addTagItem = function (type, tagText) {
        let $item = $(`${Html.tagItem(type, tagText)}`)

        //给整个标签条目组件添加事件
        $item.get(0).addEventListener("click", this.tagClickEvent)

        if (type === "tag") {
            $("#tag-container").append($item)
        } else if (type === "pined") {
            $("#tag-pined-container").append($item)
        } else {
            console.log(`${type}-${tagText}`);
            throw "Unknown tag type";
        }


        $item.get(0).children[1].addEventListener("click", this.tagMenuClickEvent)
    }

    static deleteTagItem() {
        let tagText = localStorage.getItem("currentActiveTag");
        let index = layer.confirm('Are you sure to delete all Sens that contain this tag? ', {
            title: 'Delete tags and Sens',
            btn: ['confirm', 'cancel'] //按钮
        }, function () {
            TagM.removeTagItem();
            dictionary.deleteTag(tagText).then(data => {
                console.log(data)
                if (data["msg"] === "success") {
                    layer.close(index);
                }
            })
        }, function () {
            //pass
        });

    }

    static removeTagItem() {
        let tagText = localStorage.getItem("currentActiveTag")
        $(".tag-item").each(function () {
            let $this = $(this)
            let thisTagtext = $this.find(".tag-item-text").text()
            if (tagText === thisTagtext) {
                $(this).remove()
            }
        })
        return tagText;
    }

    static switchPinUnpain() {
        let tagText = localStorage.getItem("currentActiveTag")
        $(".tag-item").each(function () {
            let $this = $(this)
            let thisTagtext = $this.find(".tag-item-text").text()
            if (tagText === thisTagtext) {
                if ($this.attr("type") == "tag") {
                    TagM.pinTagItem();
                    dictionary.updateTagPinStatus(tagText, "1")
                } else {
                    TagM.unPinTagItem();
                    dictionary.updateTagPinStatus(tagText, "0")
                }
            }
        });
    }


    static pinTagItem() {
        let text = this.removeTagItem()
        new TagM().addTagItem("pined", text)
    }

    static unPinTagItem() {
        let text = this.removeTagItem()
        new TagM().addTagItem("tag", text)
    }

    static addTagToDB(tagText) {
        dictionary.postNewTag(tagText).then(data => {
            //console.log(data)
        })
    }
}


export { TagM };