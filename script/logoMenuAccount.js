import '../style/logoMenuAccount.css'
import { dictionary } from './dictionary'

class LogoMAccount {
    constructor() {
        if (!LogoMAccount.instance) {
            LogoMAccount.instance = this;
            this.enentInit();
        }
        return LogoMAccount.instance;
    }

    enentInit() {
        document.querySelector("#pi-change-account").addEventListener("click", this.accountChange);
        document.querySelector("#pi-change-renew").addEventListener("click", this.renew);
        document.querySelector("#pi-change-passsword").addEventListener("click", this.passwordChange);
        document.querySelector("#pi-change-btn").addEventListener("click", this.save);

        document.querySelector("#pc-appearance").addEventListener("change", this.appearance);
        document.querySelector("#pc-language").addEventListener("change", this.language);
        document.querySelector("#pc-zen").addEventListener("change", this.zen);
        document.querySelector("#pc-cache").addEventListener("click", this.cache);

        document.querySelector("#dc-item-position").addEventListener("click", this.position);
        document.querySelector("#dc-item-delete").addEventListener("click", this.delete);

        document.querySelector("#dc-item-cancel").addEventListener("click", this.cancel);

    }

    //Personal Infomation
    accountChange() {
        console.log("hi from accountChange");
    }

    renew() {
        console.log("hi from renew");
    }

    passwordChange() {
        console.log("hi from passwordChange");
    }

    save() {
        let name = document.querySelector("#pi-name-input").value;
        console.log(`Hi from ${name}`);
    }

    //Preferences
    appearance() {
        console.log(this.options[this.selectedIndex].value);
    }

    language() {
        console.log(this.options[this.selectedIndex].value);
    }

    zen() {
        console.log(this.options[this.selectedIndex].value);
    }

    cache() {
        console.log(this);
        console.log(this.options[this.selectedIndex].value);
    }

    //data
    position() {
        console.log("hi from position");
        layer.prompt({
            formType: 2,
            shadeClose: true,
            value: '',
            title: 'Enter the absolute location of the cache folder.',
            area: ['400px', '30px'] //自定义文本域宽高
        }, function (value, index, elem) {
            console.log(value); //得到value
            dictionary.putCachePosition(value);
            layer.close(index);
        });
    }

    delete() {
        console.log("hi from delete");
    }

    //cancel
    cancel() {

        console.log("hi from cancel");
    }
}
export { LogoMAccount }