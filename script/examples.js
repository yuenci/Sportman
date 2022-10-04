import { dictionary } from './dictionary.js'
import '../style/examples.css';


class Examples {
    static async exampleNextBtnClickEvent(senObj) {
        console.log("next btn clicked");
        let examplesData = JSON.parse(localStorage.getItem("currentExamplesData"))
        let examplesSelected = {
            "word": localStorage.getItem("currentWord"),
            "examples": []
        };

        let choosed = false;

        //对于所有的input对象执行
        //选中的项目的文本内容加入到examplesSelected中
        //没选中的将examplesData中的display设置为false
        senObj.each(function () {
            let $this = $(this);
            if ($this.is(':checked')) {
                choosed = true;
                let $checkbox = $this
                let contentText = $checkbox.get(0).nextElementSibling.textContent;
                examplesSelected["examples"].push(contentText)
                if ($this.hasClass('exampleNew')) {
                    examplesData[$this.attr("id")] = {
                        "content": contentText,
                        "display": true
                    }
                }
            } else {
                let $checkbox = $this
                examplesData[$checkbox.attr("id")]["display"] = false
            }
        })


        //console.log(window.examplesData);
        let newExamplesData = {
            "word": localStorage.getItem("currentWord"),
            "examples": examplesData
        }

        // 如果没有选中的例句，就不会执行下面的代码
        if (choosed) {
            const resultArray = await Promise.all([
                dictionary.updateExamplesDisplay(newExamplesData),
                dictionary.createExampleRecord(examplesSelected)
            ]);
            console.log(resultArray);
        }

        return choosed
    }

    // localStorage.setItem("examplesSelected", JSON.stringify(examplesSelected));
    // localStorage.setItem("currentExample", examplesSelected[1]["content"]);
    // showReadPage();
}

export { Examples };


// 初始化的时候需要拿到数据库的数据，然后显示出来（异步）
// 在点击next之后，需要更新数据，并且发到后端（全局变量）
// 再次初始化的时候，再拿数据，显示
// 重复。。。

