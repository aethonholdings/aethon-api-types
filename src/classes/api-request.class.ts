import { APIRequestOptions, APIHost, APIEndpoint, APIResource } from "../index";

export class APIRequest {
    host: APIHost;
    endpoint: APIEndpoint;
    options?: APIRequestOptions;
    private _url: string;
    private _paramTokens: string[] = [];

    constructor(resource: APIResource, options?: APIRequestOptions) {
        this.host = resource.host;
        this.endpoint = resource.endpoint;
        if (options) this.options = options;
        let path = this.endpoint.path;
        if (path.includes("{")) {
            this._paramTokens = path.match(/{(.*?)}/g) || [];
            this._paramTokens = this._paramTokens.map((token) => token.replace("{", "").replace("}", ""));
            this._paramTokens.forEach((token) => {
                if (options?.params && options.params[token]) path = path.replace(`{${token}}`, options.params[token]);
                else throw new Error(`Missing required parameter: ${token}`);
            });
        }
        this._url = `${this.host.protocol}://${this.host.name}${this.host.port ? `:${this.host.port}` : ""}/${path}`;
    }

    getURL(): string {
        return this._url;
    }
}
