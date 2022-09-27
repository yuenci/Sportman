import { sentence } from "./sentenceObj.js"
import { dictionary } from "./dictionary.js"
import { Content } from './contentObj'
import { Log } from './logging'
import { Html } from './htmlContent'
import { LogoMAccount } from './logoMenuAccount'

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
import { Http } from "./http.js"
// new Rlayer().show();
// $("#rlayer").append($(`${Html.logoMenuAccount()}`))
// new LogoMAccount();

// $("#test-btn").click(function () {
    
// });





