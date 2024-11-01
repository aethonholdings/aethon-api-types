import { Paginated } from "aethon-paginate-types";
import { HttpStatus, RequestMethod } from "./enums";

// exported types for key API objects
export type APIResponse<T> = APIResponseData<T> | APIResponseError;
export type APIResponseData<T> = APIResponseMeta & { success: true } & (
        | { paginated: true; payload: Paginated<T> }
        | { paginated: false; payload: T | T[] }
    );
export type APIResponseError = APIResponseMeta & { success: false; error: APIError };
export type APIError = {
    status: HttpStatus;
    message: string;
};

type APIResponseMeta = {
    requestId: string;
    responseTimeMs: number;
    path: string;
    requestMethod: keyof typeof RequestMethod;
    success: boolean;
};
