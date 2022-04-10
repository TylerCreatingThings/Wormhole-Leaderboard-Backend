"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForInvalidAuthorization = exports.CreateLambdaResponse = exports.parseUserFromEvent = exports.toUrlString = void 0;
const crypto_1 = require("crypto");
function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
exports.toUrlString = toUrlString;
function parseUserFromEvent(event) {
    const requestBody = event.body == null ? '' : JSON.parse(event.body);
    if (requestBody == '' || requestBody.steamId == null || requestBody.bestTime == null)
        throw new Error('Invalid API Request');
    return {
        wormHoleId: toUrlString((0, crypto_1.randomBytes)(16)),
        steamId: requestBody.steamId,
        bestTime: requestBody.bestTime
    };
}
exports.parseUserFromEvent = parseUserFromEvent;
function CreateLambdaResponse(statusCode, message) {
    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: statusCode,
        body: message,
    };
}
exports.CreateLambdaResponse = CreateLambdaResponse;
;
function checkForInvalidAuthorization(event) {
    if (!event.requestContext.authorizer) {
        return true;
    }
    return false;
}
exports.checkForInvalidAuthorization = checkForInvalidAuthorization;
//# sourceMappingURL=functions.js.map