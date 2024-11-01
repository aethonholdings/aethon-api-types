# aethon-api-types

## Description

Type definitions for aethon API standard response format, allowing for consistency across client and server.  Import this package for formatting and processing responses in a type-safe way.

## Schema

### API response schema
All API responses conform to the `APIResponse<T>` type, whereby `<T>` is the DTO type and: 

`export type APIResponse<T> = APIResponseData<T> | APIResponseError;`

#### Data response
```
export interface APIResponseData<T> {
  requestId: string                             // unique id per request
  success: boolean = true                       // true for OK code
  path: string                                  // the endpoint path
  requestMethod: keyof typeof RequestMethod     // 'GET' | 'POST' | 'PUT' etc.
  paginated: boolean                            // true if response is paginated
  payload: T | T[] | Paginate<T>                // DTO payload, potentially paginated 
}
```

#### Error Response
```
export interface APIResponseError {
  requestId: string                             // unique id per request
  success: boolean = false                      // false for error
  path: string                                  // the endpoint path
  requestMethod: keyof typeof RequestMethod     // 'GET' | 'POST' | 'PUT' etc.
  error: {
    status: number                              // HTTP response code
    message: string                             // error message
  }
}
```
Pagination of type `T` DTOs in `APIResponseData<T>` is based on [`nestjs/paginate`](https://www.npmjs.com/package/nestjs-paginate) under the following interface:

## Installation

`npm install -s aethon-api-types`