import { names } from "./names.js";

function buildIds(type) {
    let builtObj = {}
    if (!type) return builtObj;
    Object.keys(names).forEach((name) => {
        builtObj[name] = type + '-' + names[name];
    })
    return builtObj;
}

export const login = buildIds('login');
export const register = buildIds('reg');
export const userTaskList = buildIds('utl');