import { sentence } from "./sentenceObj.js"
import { dictionary } from "./dictionary.js"
import { Content } from './contentObj'
import { Log } from './logging'

// login log
Log.loginLog();

// content
Content.addAllDESC();

// inbox
import { Inbox } from './inbox'
new Inbox();

// heatmap
import { Heatmap } from "./heatmap.js";
new Heatmap();

//tags
import { TagM } from "./tagManager.js";
let tagM = new TagM()
// tagM.addTagItem("tag", "tag");

//searchBox
import { SearchBox } from "./searchBox.js";
new SearchBox();

//logo
import { LogoButton } from "./logoBtn.js";
new LogoButton();

//brand
import { Brand } from "./brand.js";
new Brand();

//shop
import { Shop } from "./shop.js";
new Shop();

//Rlayer
import { Rlayer } from "./rightlayer.js";

$("#test-btn").click(function () {
    new Rlayer().show();
});





