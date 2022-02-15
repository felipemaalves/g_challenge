import AbstractView from "./AbstractView.js";
import { paths } from "../utils/paths.js";
import { labels } from "../utils/labels.js";
import { names } from "../utils/names.js";
import { dashboard } from "../utils/texts.js";
import { placeholder } from "../utils/placeholder.js";
import { login } from "../utils/ids.js";
import DashboardController from "../controllers/DashboardController.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
        this.controller = new DashboardController();
    }

    async getHtml() {
        return `
            ${this.htmlTitle(dashboard.title)}
            ${this.htmlP(dashboard.description)}
            <div class="container">
                ${this.htmlInput(labels.email, login.email, names.email, placeholder.email)}
                ${this.htmlInput(labels.pwd, login.pwd, names.pwd, placeholder.pwd, undefined, true)}
                ${this.htmlButton(labels.login, login.button, this.login.bind(this))}
                ${this.htmlButtonLink(labels.register, paths.register)}
            </div>
        `;
    }

    async login() {
        const email = document.getElementById(login.email).value;
        const pwd = document.getElementById(login.pwd).value;
        console.log("Sign in: email:", email, " pwd:", pwd);
        try {
            await this.controller.login(email,pwd);
        } catch (errorResponse) {
            const retryButton = this.htmlButtonLink(labels.retry, paths.dashboard);
            await this.handleError(errorResponse, retryButton);
        }
    }
}