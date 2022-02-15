import { paths } from "../utils/paths.js";
import AbstractController from "./AbstractController.js";
import Model from "../models/UserModel.js";

export default class extends AbstractController {
    async chooseView() {
        const user = await Model.getLoggedUser();
        if (user) this.triggerNavigate(paths.user + '/' + user.id);
        else this.triggerNavigate(paths.dashboard);
    }

    async login (login, pwd) {
        const payload = {email:login, pwd};
        try {
            const user = await Model.login(payload);
            const targetPath = paths.user + '/' + user.id;
            this.triggerNavigate(targetPath);
        } catch (errorResponse) {
            throw errorResponse;
        }
    }
}