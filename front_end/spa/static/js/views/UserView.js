import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.userId = params.id;
        this.setTitle("Viewing User");
    }

    async getHtml() {
        const userJson = await this.getUser(this.userId);
        console.log(userJson)
        return `
            ${this.htmlTitle("Users")}
            <p>You are viewing user #${this.userId}.</p>
        `;
    }

    async getUser(id) {
        const response = await fetch('http://127.0.0.1:5000/users/' + id)
        return await response.json();
    }
}
