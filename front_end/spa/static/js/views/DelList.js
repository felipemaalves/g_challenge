import AbstractView from "./AbstractView.js";
import Controller from "../controllers/TaskListController.js";
import { labels } from "../utils/labels.js";
import { paths } from "../utils/paths.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Delete Task List");
        this.controller = new Controller();
    }

    async getHtml() {
        return `
            ${this.htmlTitle("Remover lista de tarefas")}
            ${this.htmlP("Selecione as listas de tarefas a serem removidas")}
            <div class="container">
                ${await this.htmlTaskLists()}
                ${this.htmlButton(labels.delList, "deltl-btn", this.deleteList.bind(this))}
                ${this.htmlButtonLink(labels.cancel, paths.home)}
            </div>
        `;
    }

    async htmlTaskLists() {
        const user = await this.controller.getLoggedUser();
        if (!user) return console.log("No logged user");
        const taskLists = user.task_lists;
        let allTaskLists = "";
        taskLists.forEach( (taskList, index) => {
            allTaskLists += this.htmlTaskList(taskList, index) + '\n';
        });
        return allTaskLists;
    }

    htmlTaskList(taskList, id) {
        return this.htmlCheckbox(taskList.title, id);
    }

    htmlCheckbox(label, id) {
        const name = 'task-list';
        const marker = id + '-' + name;
        return `
            <div>
                <input type="checkbox" name="${name}" id="${id}" value="${marker}">
                <label for="${id}">${label}</label>
            </div>
        `;
    }

    async deleteList() {
        const checkboxes = document.querySelectorAll('input[name="task-list"]');
        let checkedIds = [];
        for (let i = 0; i < checkboxes.length; i++)
            if(checkboxes[i].checked)
                checkedIds.push(parseInt(checkboxes[i].id));
        try {
            await this.controller.delTaskList(checkedIds);
        } catch(errorResponse) {
            await this.handleError(errorResponse);
        }
    }

}