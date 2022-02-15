import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Users");
    }

    async getHtml() {
        const usersJson = await this.getUsers();
        console.log(usersJson);
        return `
            ${this.htmlTitle("Users")}
            ${this.htmlP("You are viewing the users!")}
        `;
    }

    async getUsers() {
        const response = await fetch('http://127.0.0.1:5000/users');
        return await response.json();
    }

    async mountUserList(usersJson) {
        //TODO
    }
}