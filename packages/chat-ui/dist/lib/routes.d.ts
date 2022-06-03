export interface IRoute {
    path: string;
    params: string[];
}
export declare const DOCS_URL: string | undefined;
export declare const routes: Record<string, IRoute>;
export declare function route(route: IRoute, params?: Record<string, string | undefined>): string;
//# sourceMappingURL=routes.d.ts.map