import AbstractView from "./AbstractView.js";
import Model from "../models/UserModel.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        const user = await Model.getLoggedUser();
        console.log("logged user: ", user);
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
            <p>Logged user: ${(user && user.username) || ""}</p>
            ${this.htmlButton("Logout", "set-btn", this.clear.bind(this))}
        `;
    }

    clear() {
        Model.storage.clear();
        Model.user = undefined;
        console.log("cleared");
    }
}