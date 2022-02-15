import { paths } from "../utils/paths.js";
import AbstractController from "./AbstractController.js";
import UserModel from "../models/UserModel.js";

const postPath = paths.server + paths.addList + '/';
const delPath = paths.server + paths.delList + '/';

export default class extends AbstractController {
    async addTaskList(title) {
        const payload = {title};
        const user = await UserModel.getLoggedUser();

        if (!user) throw new Error("AddTaskList: No user logged.");
        
        const response = await fetch(postPath + user.id, this.postHeaders(payload));

        if (!response.ok) throw response;
        
        await UserModel.updateLoggedUser();
        this.triggerNavigate(paths.home);
    }

    async delTaskList(ids) {
        const payload = {ids}
        const user = await UserModel.getLoggedUser();

        if (!user) throw new Error("AddTaskList: No user logged.");

        const response = await fetch(delPath + user.id, this.deleteHeaders(payload));

        if (!response.ok) throw response;
        
        await UserModel.updateLoggedUser();
        this.triggerNavigate(paths.home);
    }

    async getLoggedUser() {
        return await UserModel.getLoggedUser();
    }
}