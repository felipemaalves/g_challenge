import Users from "./views/Users.js";
import MockDashboard from "./views/MockDashboard.js";
import Dashboard from "./views/Dashboard.js";
import UserDashboard from "./views/UserDashboard.js";
import Settings from "./views/Settings.js";
import Register from "./views/Register.js";
import { paths } from "./utils/paths.js";
import AddList from "./views/AddList.js";
import DelList from "./views/DelList.js";
import TaskList from "./views/TaskList.js";
import AddTask from "./views/AddTask.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: paths.home, view: MockDashboard },
        { path: paths.dashboard, view: Dashboard },
        { path: paths.user, view: Users },
        { path: paths.user + "/:id", view: UserDashboard },
        { path: paths.register, view: Register },
        { path: paths.addList, view: AddList },
        { path: paths.delList, view: DelList },
        { path: paths.taskList + "/:id", view: TaskList },
        { path: paths.addTask, view: AddTask },
        { path: paths.settings, view: Settings }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    await view.init();
    console.log("view init");
};



window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    document.body.addEventListener("navigate", e => {
        if (e.target && e.target.href) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});