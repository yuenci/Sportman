import '../style/heatmap.css'
import { Conf } from './config';
import { dictionary } from "./dictionary.js"
import { Tools } from "./toolShop"
import { Html } from "../script/htmlContent"
import { Content } from './contentObj'
import { Brand } from "../script/brand"

class Heatmap {
    constructor() {
        this.content = Html.heatmap;
        this.create()
    }

    async create() {
        let $heatmap = $(`${this.content}`)
        $("#heatmap").append($heatmap)

        dictionary.data_learing().then(function (data) {
            $heatmap.find("#sens-num").text(data.sens)
            anime({
                targets: '#sens-num',
                textContent: [0, data.sens],
                round: 1,
                easing: 'easeInSine'
            });

            // $heatmap.find("#hour-num").text(data.hour)
            anime({
                targets: '#hour-num',
                textContent: [0, data.hour],
                round: 1,
                easing: 'easeInSine'
            });

            //$heatmap.find("#day-num").text(data.day)
            anime({
                targets: '#day-num',
                textContent: [0, data.day],
                round: 1,
                easing: 'easeInSine'
            });
        })


        var cal = new CalHeatMap();
        let heatmapData = await dictionary.data_heatmap()




        cal.init({
            // data: {
            //     "1663571110": 1000,
            //     "1664003110": 0,
            //     "1664089510": 500
            // },
            data: heatmapData,
            itemSelector: "#cal-heatmap",
            cellRadius: 2,
            itemName: ["Sen", "Sens"],
            dataType: "json",
            domain: 'month',
            cellPadding: 5,
            cellSize: 14,
            domainGutter: 0,
            tooltip: true,
            // start: new Date(2022, 6, 19),
            start: Tools.getDate3MonthsAgo(),
            range: 3,
            displayLegend: false,
            subDomainTitleFormat: {
                empty: "0 Sen on {date}",
                filled: "{count} {name} on {date}"
            },
            subDomainDateFormat: function (date) {
                moment.locale('zh-cn')
                return moment(date).format("L"); // Use the moment library to format the Date
            },
            domainLabelFormat: "%m",
            highlight: "now",
            legend: Conf.LegendColorRange,
            onClick: function (date, nb) {
                let datetime = Tools.getDateTimeFromDateObj(date);
                Content.queryTimeDESC(datetime);
                let brand = new Brand();
                brand.showTag(datetime.substring(0, 10))
            }
        });

    }
}

export { Heatmap };