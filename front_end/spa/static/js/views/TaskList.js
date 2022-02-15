import AbstractView from "./AbstractView.js";
import Controller from "../controllers/TaskListController.js";
import { labels } from "../utils/labels.js";
import { paths } from "../utils/paths.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.taskListId = params.id;
        this.setTitle("Task List");
        this.controller = new Controller();
    }

    async getHtml() {
        const user = await this.controller.getLoggedUser();
        const taskList = user.task_lists[this.taskListId];
        return `
            ${this.htmlTitle(taskList.title)}
            ${this.htmlP("Lista de Tarefas")}
            <div class="container">
                ${await this.htmlAllTasks()}
                ${this.htmlButtonLink(labels.addTask, paths.addTask)}
                ${this.htmlButtonLink(labels.return, paths.home)}
            </div>
        `
    }

    async htmlAllTasks() {
        const user = await this.controller.getLoggedUser();
        const taskList = user.task_lists[this.taskListId];
        return this.htmlP("all tasks");
    }

    htmlTask() {
        return this.htmlP("a task");
    }
}