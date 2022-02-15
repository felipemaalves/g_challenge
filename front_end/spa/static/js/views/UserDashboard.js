import AbstractView from "./AbstractView.js";
import UserDashboardController from "../controllers/UserDashboardController.js";
import { userDash } from "../utils/texts.js";
import { labels } from "../utils/labels.js";
import { paths } from "../utils/paths.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.userId = params.id;
        this.setTitle("User Dashboard");
        this.controller = new UserDashboardController();
    }

    async getHtml() {
        const user = await this.controller.getLoggedUser();
        return `
            ${this.htmlTitle(userDash.title)}
            ${this.htmlP(`Bem vindo ${user.username}. Essas são as suas listas de tarefas:`)}
            <div class="container">
                ${await this.htmlTaskLists()}
                ${this.htmlButtonLink(labels.addList, paths.addList)}
                ${this.htmlButtonLink(labels.delList, paths.delList)}
            </div>
        `;
    }

    async htmlTaskLists() {
        const user = await this.controller.getLoggedUser();
        const taskLists = user.task_lists
        let allTaskLists = "";
        taskLists.forEach( (taskList, index) => {
            allTaskLists += this.htmlTaskList(taskList, index) + '\n';
        });
        return allTaskLists;
    }

    htmlTaskList(taskList, id) {
        return `<a href="${paths.taskList + '/' + id}" class="taskList" id="${id}">${taskList.title}</a>`;
    }

}