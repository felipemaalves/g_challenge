import AbstractView from "./AbstractView.js";
import Controller from "../controllers/TaskListController.js";
import { labels } from "../utils/labels.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.taskListId = params.id;
        this.setTitle("Add Task");
        this.controller = new Controller();
    }

    async getHtml() {
        return `
            ${this.htmlTitle("Adicionar nova tarefa")}
            <div class="container">
                ${this.htmlInput("Nova tarefa", "tsk-input", "task", "Nome da tarefa")}
                ${this.htmlDropdown()}
                ${this.htmlButton(labels.addTask, "tsk-button", this.addTask.bind(this))}
                ${this.htmlButtonLink(labels.cancel, labels.home)}
            </div>
        `
    }

    htmlDropdown() {
        return `
            <div class="dropdown">
                <button class="dropbtn">Prioridade</button>
                <div class="dropdown-content">
                    <a href="#low">Baixa</a>
                    <a href="#medium">Média</a>
                    <a href="#high">Alta</a>
                </div>
            </div>
        `
    }

    async addTask() {

    }
}