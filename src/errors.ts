export interface ErrorData {
    message: string;
    code: string;
    type: "warn" | "error";
}

export function errorLink(error: ErrorData) {
    return `https://mond.blazing.works/troubleshooting/${error.type === "warn" ? "warnings" : "errors"}/${error.code}`;
}

const errors: ErrorData[] = [
    {
        message: "No config file was provided. Default values are used.",
        code: "noConfig",
        type: "warn",
    },
    {
        message: "Invalid config file was found. Default values are used.",
        code: "invalidConfig",
        type: "warn",
    },
    {
        message: "The provided token is invalid.",
        code: "invalidToken",
        type: "error",
    },
    {
        message: "The provided Client ID is invalid.",
        code: "invalidClientId",
        type: "error",
    },
    {
        message: "No token was provided.",
        code: "noToken",
        type: "error",
    },
    {
        message: "No Client ID was provided.",
        code: "noClientId",
        type: "error",
    },
    {
        message: "Incomplete MondCommand was provided.",
        code: "incompleteCommand",
        type: "error",
    },
];

export default errors;
