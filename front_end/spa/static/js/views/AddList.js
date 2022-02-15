import AbstractView from "./AbstractView.js";
import Controller from "../controllers/TaskListController.js";
import { labels } from "../utils/labels.js";
import { paths } from "../utils/paths.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Add Task List");
        this.controller = new Controller();
    }

    async getHtml() {
        return `
            ${this.htmlTitle("Criar nova lista de Tarefas")}
            <div class="container">
                ${this.htmlInput(labels.addList, "addtl-input", "addlist", "Título")}
                ${this.htmlButton(labels.addList, "addtl-btn", this.postList.bind(this))}
                ${this.htmlButtonLink(labels.cancel, paths.home)}
            </div>
        `;
    }

    async postList() {
        const title = document.getElementById("addtl-input").value;
        if (!title) return console.log("No title defined.");
        try {
            await this.controller.addTaskList(title);
        } catch (errorResponse) {
            await this.handleError(errorResponse);
        }
    }
}