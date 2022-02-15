import { register } from "../utils/ids.js";
import { labels } from "../utils/labels.js";
import { placeholder } from "../utils/placeholder.js";
import { paths } from "../utils/paths.js";
import { names } from "../utils/names.js";
import AbstractView from "./AbstractView.js";
import RegisterController from "../controllers/RegisterController.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Register");
        this.controller = new RegisterController();
    }

    async getHtml() {
        return `
            ${this.htmlTitle("Registrar")}
            <div class="container">
                ${this.htmlInput(labels.email, register.email, names.email, placeholder.email)}
                ${this.htmlInput(labels.name, register.name, names.uname, placeholder.name)}
                ${this.htmlInput(labels.pwd, register.pwd, names.pwd, placeholder.pwd, undefined, true)}
                ${this.htmlButton(labels.register, register.button, this.register.bind(this))}
            </div>
        `;
    }

    async register() {
        const email = document.getElementById(register.email).value;
        const name = document.getElementById(register.name).value;
        const pwd = document.getElementById(register.pwd).value;
        console.log("Register: email:",email, " name:", name, " pwd", pwd);
        try {
            await this.controller.registerUser(email, name, pwd);
        } catch (errorResponse) {
            const retryButton = this.htmlButtonLink(labels.retry, paths.register);
            await this.handleError(errorResponse, retryButton);
        }
    }
}