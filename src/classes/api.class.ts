import { APIProtocol, APIResource, APIHost, APIRequestOptions, APIRequest, HttpMethod } from "../index";

export class API {
    resources: { [operationId: string]: APIResource } = {};
    host: APIHost;
    baseUrl: string;

    constructor(protocol: APIProtocol, name: string, openApiSpec: any, port?: number, basePath?: string) {
        // initialise the variables
        this.host = {} as APIHost;
        this.host.protocol = protocol;
        this.host.name = name.replace("/", "").replace(":", "");
        this.host.port = port;
        if (basePath && basePath.slice(-1) === "/") this.host.basePath = basePath.slice(0, -1);

        // construct the base url
        this.baseUrl = `${this.host.protocol}://${this.host.name}`;
        if (port) this.baseUrl = `${this.baseUrl}:${this.host.port}`;
        if (basePath) this.baseUrl = `${this.baseUrl}/${this.host.basePath}`;

        // construct the resource map
        const paths = openApiSpec?.paths;
        for (let path in paths) {
            for (let method in paths[path]) {
                let cleanPath: string
                try {
                    const operationId: string = paths[path][method].operationId;
                    let httpMethod;
                    switch (method.toUpperCase()) {
                        case "GET":
                            httpMethod = HttpMethod.GET;
                            break;
                        case "POST":
                            httpMethod = HttpMethod.POST;
                            break;
                        case "PATCH":
                            httpMethod = HttpMethod.PATCH;
                            break;
                        case "DELETE":
                            httpMethod = HttpMethod.DELETE;
                            break;
                        default:
                            httpMethod = HttpMethod.GET;
                            break;
                    }
                    if (path.slice(0, 1) === "/") cleanPath = path.slice(1);
                    if (path.slice(-1) === "/") cleanPath = path.slice(0, -1);
                    this.resources[operationId] = {
                        host: this.host,
                        endpoint: {
                            path: cleanPath,
                            method: httpMethod
                        }
                    } as APIResource;
                } catch (error) {
                    console.error("Error constructing resource map from OpenAPI spec file", error);
                }
            }
        }
    }

    getRequest(operationId: string, options: APIRequestOptions = {}): APIRequest | undefined {
        const resource = this.resources[operationId];
        if (resource) return new APIRequest(resource, options);
        return undefined;
    }
}
