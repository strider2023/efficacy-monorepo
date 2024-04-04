export enum HTTPCode {
    Bad_Request = 400,
    Unauthorized = 401,
    Payment_Required = 402,
    Forbidden = 403,
    Not_Found = 404,
    Method_Not_Allowed = 405,
    Not_Acceptable = 406,
    Request_Timeout = 408,
    Conflict = 409,
    Gone = 410,
    Payload_Too_Large = 413,
    Unsupported_Media_Type = 415,
    Too_Many_Requests = 429,
    Internal_Server_Error = 500,
    Not_Implemented = 501,
    Bad_Gateway = 502,
    Service_Unavailable = 503
}