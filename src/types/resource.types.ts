import { HttpMethod } from "../index";

export type APIResource = {
    host: APIHost;
    endpoint: APIEndpoint;
};

export type APIEndpoint = {
    path: string;
    method: HttpMethod;
};

export type APIHost = {
    protocol: APIProtocol;
    name: string;
    basePath?: string;
    port?: number;
};

export type APIProtocol = "http" | "https";
