import { paths } from "../utils/paths.js";
import { mountQueryString } from "../utils/fetch-utils.js";

const loginPath = paths.server + paths.login;

class UserModel {
    constructor() {
        this.storage = window.localStorage;
        this.user = undefined;
    }

    queryStringFromUser(user) {
        if (!user) return '';
        const payload = {email: user.login, pwd:user.pwd}
        return mountQueryString(payload);
    }

    async login(payload) {
        const queryString = mountQueryString(payload);
        const user = await this.fetchUser(queryString);
        return await this.setLoggedUser(user);
    }

    async logout() {
        this.storage.clear();
        this.user = undefined;
    }

    async setLoggedUser(user) {
        this.user = user;
        const queryString = this.queryStringFromUser(user);
        this.storage.setItem('user', queryString);
        return user;
    }

    async getLoggedUser() {
        if (this.user) return this.user;
        const queryString = this.storage.getItem('user');
        if (!queryString) return undefined;
        this.user = await this.fetchUser(queryString);
        return this.user;
    }

    async fetchUser(queryString) {        
        const response = await fetch(loginPath + queryString);

        if (!response.ok) throw response;
        return await response.json();
    }

    async updateLoggedUser() {
        if (!this.getLoggedUser()) throw new Error("No user logged");
        let user = await this.getLoggedUser();
        const queryString = this.queryStringFromUser(user);
        user = await this.fetchUser(queryString);
        return this.setLoggedUser(user);
    }
}

const singleton = new UserModel();

export default singleton;