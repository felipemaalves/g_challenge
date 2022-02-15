import Model from "../models/UserModel.js";
import AbstractController from "./AbstractController.js";

export default class extends AbstractController {
    async getLoggedUser() {
        return await Model.getLoggedUser();
    }
}