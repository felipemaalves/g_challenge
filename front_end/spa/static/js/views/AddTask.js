import AbstractView from "./AbstractView.js";
import Controller from "../controllers/TaskListController.js";
import { labels } from "../utils/labels.js";
import { hrefs } from "../utils/paths.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        const href = window.location.href.match(/#.*/g);
        this.href = (href) ? href[0] : undefined;
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
                <button id="tsk-drop" class="dropbtn">${this.getPriorityLabel()}</button>
                <div id="tsk-drop-div" class="dropdown-content">
                    <a href="${hrefs.low}" data-link>Baixa</a>
                    <a href="${hrefs.medium}" data-link>Média</a>
                    <a href="${hrefs.high}" data-link>Alta</a>
                </div>
            </div>
        `
    }

    getPriorityLabel() {
        switch (this.href) {
            case hrefs.low:
                return labels.low;
            case hrefs.medium:
                return labels.medium;
            case hrefs.high:
                return labels.high
            default:
                return "Prioridade"
        }
    }

    async addTask() {
        const priority = document.getElementById('tsk-drop');
        const options = document.getElementById('tsk-drop-div').getElementsByTagName('a');
        let selected = undefined
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.href == window.location.href) {
                selected = option.text;
                break;
            }
        }
        if (selected) priority.value = selected;
    }
}