import { dictionary } from "./dictionary.js"
import { Tools } from "./toolShop"

class Log {
    static loginLog() {
        dictionary.logForLogin("login")
    }
}

export { Log };