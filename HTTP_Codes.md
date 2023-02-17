# Documentation for HTTP Status Codes

This document contains a list of all HTTP status codes and their use cases.

## 2xx Success Codes:

-   200:

    -   **Description:** The request was successful.
    -   **Use case:** Use when the request was successful and the server has returned the requested information.
    -   **Simple example:** Returning a list of items in response to a GET request.
    -   **Warning:** Be careful not to use 200 when returning an empty body in response to a DELETE request. In this case,
        use 204 instead.

-   201:

    -   **Description:** The request has been fulfilled, and a new resource has been created.
    -   **Use case:** Use when a new resource has been created as a result of the request.
    -   **Simple example:** Creating a new user account or adding a new item to a shopping cart.
    -   **Warning:** Be careful not to use 201 when updating an existing resource. In this case, use 200 or 204 instead.

-   204:
    -   **Description:** The server has successfully fulfilled the request, but there is no response body.
    -   **Use case:** Use when there is no response body to return.
    -   **Simple example:** In response to a DELETE request, when no content is returned.
    -   **Warning:** Be careful not to use 204 when returning a resource in response to a GET request. In this case, use
        200 instead.

## 3xx Redirection Codes:

-   301:

    -   **Description:** The requested resource has been permanently moved to a new location.
    -   **Use case:** Use when a resource has been permanently moved to a new URL.
    -   **Simple example:** When a web page has been permanently moved to a new location.
    -   **Warning:** Be careful not to use 301 for temporary redirects. In this case, use 302 instead.

-   302:

    -   **Description:** The requested resource has been temporarily moved to a new location.
    -   **Use case:** Use when a resource has been temporarily moved to a new URL.
    -   **Simple example:** When a website is undergoing maintenance and the pages have been temporarily moved to a
        different URL.
    -   **Warning:** Be careful not to use 302 for permanent redirects. In this case, use 301 instead.

-   304:
    -   **Description:** The resource has not been modified since the last request.
    -   **Use case:** Use when the resource has not been modified since the last request.
    -   **Simple example:** When a web page is cached in the user's browser and the cached version has not been modified
        since the last request.
    -   **Warning:** Be careful not to use 304 when a resource has been modified since the last request. In this case, use
        200 instead.

## 4xx Client Error Codes:

-   400:
    -   **Description**: The server cannot or will not process the request due to an apparent client error.
    -   **Use case**: Use when there is a problem with the client's request, such as missing or invalid parameters.
    -   **Simple example**: When a user submits a form with missing or invalid fields.
    -   **Warning**: Be careful not to use 400 for server errors. In this case, use 500 instead.
-   401:
    -   **Description**: The request requires authentication, and the client did not provide valid credentials.
    -   **Use case**: Use when the client is not authorized to access the requested resource.
    -   **Simple example**: When a user attempts to access a secure web page without logging in.
    -   **Warning**: Be careful not to use 401 for a missing or incorrect authorization token. In this case, use 403
        instead.
-   402:
    -   **Description**: Reserved for future use.
    -   **Use case**: Reserved for future use.
    -   **Simple example**: Reserved for future use.
    -   **Warning**: Reserved for future use.
-   403:
    -   **Description**: The client does not have permission to access the requested resource.
    -   **Use case**: Use when the client is authenticated, but does not have permission to access the requested resource.
    -   **Simple example**: When a user attempts to access a restricted page without the necessary permissions.
    -   **Warning**: Be careful not to use 403 for unauthenticated users. In this case, use 401 instead.
-   404:
    -   **Description**: The requested resource was not found on the server.
    -   **Use case**: Use when the server cannot find the requested resource.
    -   **Simple example**: When a user attempts to access a page that does not exist.
    -   **Warning**: Be careful not to use 404 when a server encounters an error while processing a request. In this case,
        use 500 instead.
-   405:
    -   **Description**: The method specified in the request is not allowed for the requested resource.
    -   **Use case**: Use when the requested method (such as GET or POST) is not supported for the requested resource.
    -   **Simple example**: When a user attempts to use an unsupported HTTP method for a specific endpoint.
    -   **Warning**: Be careful not to use 405 when authentication is required but missing. In this case, use 401 instead.

## 5xx Server Error Codes:

-   500:
    -   **Description**: The server encountered an unexpected error and cannot fulfill the request.
    -   **Use case**: Use when an unexpected error occurs on the server.
    -   **Simple example**: When a server experiences a critical error that prevents it from processing a request.
    -   **Warning**: Be careful not to use 500 for client errors. In this case, use 400 instead.
-   501:
    -   **Description**: The server does not support the functionality required to fulfill the request.
    -   **Use case**: Use when the requested functionality is not supported by the server.
    -   **Simple example**: When a user attempts to use a feature that is not supported by the server.
    -   **Warning**: Be careful not to use 501 for errors related to user input or malformed requests. In this case, use
        400 instead.
-   502:
    -   **Description**: The server received an invalid response from an upstream server while trying to fulfill the
        request.
    -   **Use case**: Use when a server acting as a gateway or proxy receives an invalid response from an upstream server.
    -   **Simple example**: When a user attempts to access a website through a gateway or proxy
        -   **Warning**: Be careful not to use 502 for client errors. In this case, use 400 instead.
-   503:
    -   **Description**: The server is currently unable to handle the request due to a temporary overload or maintenance
        of the server.
    -   **Use case**: Use when the server is temporarily unavailable to handle the request.
    -   **Simple example**: When a server is undergoing maintenance or experiencing high traffic that is causing it to be
        temporarily unavailable.
    -   **Warning**: Be careful not to use 503 for client errors. In this case, use 400 instead.
-   504:
    -   **Description**: The server did not receive a timely response from an upstream server while attempting to fulfill
        the request.
    -   **Use case**: Use when the server is acting as a gateway or proxy and did not receive a timely response from the
        upstream server.
    -   **Simple example**: When a server acting as a reverse proxy times out waiting for a response from an upstream
        server.
    -   **Warning**: Be careful not to use 504 for client errors. In this case, use 400 instead.
-   505:
    -   **Description**: The server does not support the HTTP protocol version used in the request.
    -   **Use case**: Use when the server does not support the version of the HTTP protocol used in the request.
    -   **Simple example**: When a client sends a request using an HTTP protocol version that is not supported by the
        server.
    -   **Warning**: Be careful not to use 505 for client errors. In this case, use 400 instead.
