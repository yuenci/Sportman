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

        //console.log(window.examplesData);

        //对于所有的input对象执行
        senObj.each(function () {
            if ($(this).is(':checked')) {
                choosed = true;
                let $checkbox = $(this)
                examplesSelected["examples"].push($checkbox.get(0).nextElementSibling.textContent)
            } else {
                let $checkbox = $(this)
                examplesData[$checkbox.attr("id")]["display"] = false
            }
        })

        //console.log(window.examplesData);
        let newExamplesData = {
            "word": localStorage.getItem("currentWord"),
            "examples": examplesData
        }

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

