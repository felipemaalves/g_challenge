import { paths } from "../utils/paths.js";
import { labels } from "../utils/labels.js";

export default class {
    constructor(params) {
        this.params = params;
        this.callbacks = [];
    }

    setTitle(title) {
        document.title = title;
    }

    async init() {
        document.querySelector("#app").innerHTML = await this.getHtml();
        await this.setCallbacks();
    }

    async getHtml() {
        return "";
    }

    async setCallbacks() {
        this.callbacks.forEach(callbackObj => {
            const id = callbackObj.id;
            const element = document.getElementById(id);
            element.addEventListener("click", callbackObj.callback);
        });
    }

    htmlTitle(title) {
        return `<h1>${title}</h1>`;
    }

    htmlLink(path, text) {
        return `<a href="${path}" data-link>${text}</a>`;
    }

    htmlP(text) {
        return `<p>${text}</p>`
    }

    htmlInput(label, id, name, placeholder, value, isPassword) {
        return `
            <label for="${name}"><b>${label}:</b></label>
            <input type=${(isPassword)? "password" : "text"} 
                placeholder="${placeholder || label}" 
                name="${name}" 
                id="${id}" 
                ${(value)? `value="${value}"` : ""}
            required>
        `;
    }

    htmlButtonLink(label, path) {
        return `<a href="${path}" class="btnLink" data-link><b>${label}</b></a>`;
    }

    htmlButton(label, id, callback) {
        this.addCallback(id, callback);
        return `<button type="button" id="${id}"><b>${label}</b></button>`;
    }

    addCallback(id, callback) {
        const callbackObj = {id, callback};
        if(!this.callbacks.find(obj => obj.id == callbackObj.id))
            this.callbacks.push(callbackObj);            
        else
            console.log("id ", id, " already in use");
    }

    async handleError(response, retryButton) {
        let errorHtml = ""
        if (response.text) errorHtml = await response.text();

        console.log("Error response - ", response);
        console.log("Error status - ", response.status, " statusText - ", response.statusText);

        if (!retryButton) retryButton = this.htmlButtonLink(labels.retry, paths.home);
        errorHtml = `
            ${errorHtml}
            ${retryButton}
        `
        document.querySelector("#app").innerHTML = errorHtml;
    }
}