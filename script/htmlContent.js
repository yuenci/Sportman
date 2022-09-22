import { TP } from './textProcess.js'
class Html {
    static shop = `
        <div id="shop-container">
            <div class="shop-item" id="shop-sportman">
                <i class="fa fa-cube" aria-hidden="true"></i>
                <div class="shop-item-text">SportMan</div>
            </div>
            <div class="shop-item" id="shop-lucky">
                <i class="fa fa-gift" aria-hidden="true"></i>
                <div class="shop-item-text">Get Lucky</div>
            </div>
            <div class="shop-item" id="shop-explore">
                <i class="fa fa-binoculars" aria-hidden="true"></i>
                <div class="shop-item-text">Explore</div>
            </div>
            <div class="shop-item" id="shop-dashboard">
                <i class="fa fa-tachometer" aria-hidden="true"></i>
                <div class="shop-item-text">Dashboard</div>
            </div>
        </div>
    `;

    static brand = `
            <div id="brand">
                <div id="brand-container">
                    <div class="brand-sub-container  .brand-sub1-show" id="brand-sub1">
                        <div id="brand-text">SportMan</div>
                        <i class="fa fa-refresh fa-sync" aria-hidden="true"></i>
                    </div>
                    <div class="brand-sub-container brand-sub2-hide" id="brand-sub2">
                        <div id="brand-sync-text">Syncing</div>
                        <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
                    </div>
                </div>
                <div id="brand-slash">/</div>
                <div id="brand-tag-name">Tag name here</div>
            </div>
    `;

    static heatmap = `
        <div id="heatmap-containet">
        <div id="learn-data">
            <div class="data-container">
                <div class="data-num" id="sens-num">0</div>
                <div class="data-title">SENS</div>
            </div>
            <div class="data-container">
                <div class="data-num" id="hour-num">0</div>
                <div class="data-title">HOUR</div>
            </div>
            <div class="data-container">
                <div class="data-num" id="day-num">0</div>
                <div class="data-title">DAY</div>
            </div>
        </div>
        <div id="cal-heatmap"></div>
    </div>
    `;

    static inbox = `<div id="inbox">
        <textarea name="" id="inbox-ta"></textarea>
        <div id="inbox-toolbar">
            <div id="inbox-tools-container">
                <button class="inbox-tools">👆</button>
                <button class="inbox-tools">👆</button>
            </div>
            <button id="enter-btn">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
        </div>
    </div>`;

    static searchBox = `
            <div id="searchBox">
                <i class="fa fa-search" aria-hidden="true"></i>
                <input type="text" id="searchBox-input">
                <i class="fa fa-sliders" aria-hidden="true" id="search-confg-icon"></i>
            </div>
    `;

    static tagManager1 = `
        <div id="tagM-container">
    <div class="tagM-title" id="tagM-title1">Pined Tags</div>
	<div class="tag-blank"></div>
    <div id="tag-pined-container"></div>
    <div class="tag-blank"></div>
	<div class="tagM-title" id="tagM-title">All Tags</div>
	<div class="tag-blank"></div>
	<div id="tag-container">
		<div class="tag-item" type="tag">
			<div class="tag-item-left">
				<i class="fa fa-hashtag" aria-hidden="true"></i>
				<div class="tag-item-text">tags content 1</div>
			</div>
			<i class="fa fa-ellipsis-h tag-ellipsis-h" aria-hidden="true"></i>
			<div class="tag-item-tooltip">Modify,delete tag</div>
		</div>
		<div class="tag-item"  type="tag">
			<div class="tag-item-left">
				<i class="fa fa-hashtag" aria-hidden="true"></i>
				<div class="tag-item-text">tags content 2</div>
			</div>
			<i class="fa fa-ellipsis-h tag-ellipsis-h" aria-hidden="true"></i>
			<div class="tag-item-tooltip">Modify,delete tag</div>
		</div>
		<div class="tag-item" type="tag">
			<div class="tag-item-left">
				<i class="fa fa-hashtag" aria-hidden="true"></i>
				<div class="tag-item-text">tags content 3</div>
			</div>
			<i class="fa fa-ellipsis-h tag-ellipsis-h" aria-hidden="true"></i>
			<div class="tag-item-tooltip">Modify,delete tag</div>
		</div>

	</div>
	<div class="tag-blank"></div>
	<div id="tag-trash">
		<i class="fa fa-trash"></i>
		<div id="tag-trash-text">Trash</div>
	</div>
</div>
        `;

    static tagManager = `
        <div id="tagM-container">
    <div class="tagM-title" id="tagM-title1">Pined Tags</div>
	<div class="tag-blank"></div>
    <div id="tag-pined-container"></div>
    <div class="tag-blank"></div>
	<div class="tagM-title" id="tagM-title">All Tags</div>
	<div class="tag-blank"></div>
	<div id="tag-container"></div>
	<div class="tag-blank"></div>
	<div id="tag-trash">
		<i class="fa fa-trash"></i>
		<div id="tag-trash-text">Trash</div>
	</div>
</div>
        `;

    static tagItem(type, tagText) {
        return `<div class="tag-item" type="${type}">
                    <div class="tag-item-left">
                        <i class="fa fa-hashtag" aria-hidden="true"></i>
                        <div class="tag-item-text">${tagText}</div>
                    </div>
                    <i class="fa fa-ellipsis-h tag-ellipsis-h" aria-hidden="true"></i>
                    <div class="tag-item-tooltip">Modify,delete tag</div>
                </div>`;
    }

    static logoBtn = `
            <div id="logo-container">
                <span>👑</span>
                <div id="logo-userName">Innis</div>
                <i class="fa fa-angle-down" aria-hidden="true" id="logo-dropdown"></i>
            </div>
    `;

    static sentence(sen, time) {
        return `<div class="box">
        <div class="sentence-upper">
            <div class="sentence-upper-time">${time}</div>
            <div class="sentence-upper-menu-btn"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div>
        </div>
        <div class="sentence-content">${TP.splitSenToWords(sen)}</div>
        </div>
    `;
    }


}

export { Html };