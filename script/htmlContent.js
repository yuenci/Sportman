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
            <div class="shop-item" id="shop-plugin">
                <i class="fa fa-tachometer" aria-hidden="true"></i>
                <div class="shop-item-text">Plugins</div>
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

    // static sentence(sen, time) {
    //     return `<div class="box">
    //     <div class="sentence-upper">
    //         <div class="sentence-upper-time">${time}</div>
    //         <div class="sentence-upper-menu-btn"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div>
    //     </div>
    //     <div class="sentence-content">${TP.splitSenToWords(sen)}</div>
    //     </div>
    // `;
    // }

    static sentence(sen, time, id) {
        let data = TP.tokenize(sen)
        let sentence = data.words
        let wordNum = data.wordNum

        return `<div class="box">
        <div class="sentence-upper">
            <div class="sentence-upper-time">${time}</div>
            <div class="sentence-upper-menu-btn"  data-wordNum='${wordNum}'>
                <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
            </div>
        </div>
        <div class="sentence-content"  data-id="${id}">${sentence}</div>
        </div>
    `;
    }

    static logoMenuAccount() {
        return `
            <div id="account-container">
                <div class="account-title">Personal Infomation</div>
                <div class="pi-items">
                    <span class="pi-title">Account:</span>
                    <span class="pi-content">1575270674@qq.com</span>
                    <span class="pi-change" id="pi-change-account">Change account</span>
                </div>
                <div class="pi-items">
                    <span class="pi-title">Membership:</span>
                    <span class="pi-content">Pro</span>
                    <span class="pi-change" id="pi-change-renew">Renew PRO now</span>
                </div>
                <div class="pi-items">
                    <span class="pi-title">Password:</span>
                    <span></span>
                    <span class="pi-change" id="pi-change-passsword">Change password</span>
                </div>
                <div class="pi-items">
                    <span class="pi-title">Username:</span>
                    <input type="text" value="Innis" id="pi-name-input">
                    <button id="pi-change-btn" id="pi-change-save">Save</button>
                </div>
            </div>

            <div id="preferences-container">
                <div class="account-title">Preferences</div>
                <div class="pc-items">
                    <span class="pc-title">Appearance</span>
                    <div class="pc-select">
                        <select id="pc-appearance">
                            <option value="auto">Auto</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
            </div>

            <div class="pc-items">
                <span class="pc-title">Language</span>
                <div class="pc-select">
                    <select id="pc-language">
                        <option value="english">English</option>
                        <option value="chinese">Chinese</option>
                    </select>
                </div>
            </div>

            <div class="pc-items">
                <span class="pc-title">Zen Mode</span>
                <div class="pc-select">
                    <select id="pc-zen">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
                </div>
            </div>

            <div class="pc-items">
                <span class="pc-title">Cache Mode</span>
                <div class="pc-select">
                    <select id="pc-cache">
                        <option value="off">Off</option>
                        <option value="on">On</option>
                    </select>
                </div>
            </div>

        </div>

        <div id="data-contaier">
            <div class="account-title">Data</div>
            <div class="dc-items">
                <span class="dc-title">Cache</span>
                <span class="dc-position">C:\\Users\\Innis\\Documents\\sportman</span>
                <button id="dc-item-position">Choose position</button>
            </div>
            <div class="dc-items">
                <span class="dc-title">Delete all data</span>
                <button id="dc-item-delete">Delete</button>
            </div>
        </div>

        <div id="delete-contaier">
            <div class="account-title">Account Cancellation</div>
            <button id="dc-item-cancel">Cancel my aacount and delete all data</button>
        </div>
        `;
    }

    static toolBar(pageType) {
        return `
        <div class="toolbar">
            <div class="toolbar-page-type">${pageType}</div>
            <div class="toolbar-process">
                <div class="toolbar-process-item"></div>
                <div class="toolbar-process-item"></div>
                <div class="toolbar-process-item"></div>
                <div class="toolbar-process-item"></div>
            </div>
            <button class="next-page">Next</button>
        <div>"
        `
    }
}

export { Html };