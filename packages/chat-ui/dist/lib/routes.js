"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.routes = exports.DOCS_URL = void 0;
exports.DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL;
exports.routes = {
    chats: { path: "/", params: [] },
    chat: {
        path: "/chats/:id",
        params: ["id"],
    },
};
function rmUndefined(obj) {
    return Object.keys(obj).reduce((acc, key) => {
        if (typeof obj[key] !== "undefined")
            acc[key] = obj[key];
        return acc;
    }, {});
}
function route(route, params = {}) {
    const subbed = route.params.reduce((acc, param) => {
        if (params[param]) {
            const ret = acc.replaceAll(`:${param}`, params[param]);
            delete params[param];
            return ret;
        }
        return acc;
    }, route.path);
    const search = typeof window != "undefined" && window.location.search;
    const currQuery = new URLSearchParams(search || "");
    const cluster = currQuery.get("cluster");
    if (cluster && !params.cluster) {
        params.cluster = cluster;
    }
    const nextQuery = new URLSearchParams(rmUndefined(params)).toString();
    return subbed + (nextQuery ? `?${nextQuery}` : "");
}
exports.route = route;
//# sourceMappingURL=routes.js.map