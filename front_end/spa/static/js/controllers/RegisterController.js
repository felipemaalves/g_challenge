import { paths } from "../utils/paths.js";
import AbstractController from "./AbstractController.js";

const postPath = paths.server + paths.user;

export default class extends AbstractController {
    async registerUser (login, username, pwd) {
        const payload = {login, username, pwd};
        const response = await fetch(postPath, this.postHeaders(payload));

        if (!response.ok) throw response;
        this.triggerNavigate(paths.dashboard);
    }
}