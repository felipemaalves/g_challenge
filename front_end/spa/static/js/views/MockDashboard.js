import AbstractView from "./AbstractView.js";
import DashboardController from "../controllers/DashboardController.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.controller = new DashboardController();
    }

    async init() {
        await this.controller.chooseView();
    }
}