"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTokenHandler = void 0;
const functions_1 = require("../../utilities/functions");
const aws_sdk_1 = require("aws-sdk");
const getUserTokenHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let eventBody = JSON.parse(event.body);
        const cognitoIdentityServiceProvider = new aws_sdk_1.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });
        var doesUserExistParams = {
            UserPoolId: process.env.USER_POOL_ID || 'ca-central-1_ztaR7RX7q',
            Username: eventBody.username,
        };
        var params = {
            UserPoolId: process.env.USER_POOL_ID || 'ca-central-1_ztaR7RX7q',
            Username: eventBody.username,
            UserAttributes: [],
            ValidationData: []
        };
        let doesUserExist = cognitoIdentityServiceProvider.adminGetUser(doesUserExistParams);
        try {
            let userExistsData = yield doesUserExist.promise();
            return (0, functions_1.CreateLambdaResponse)(200, JSON.stringify(userExistsData));
        }
        catch (err) {
            if (err.code === 'UserNotFoundException') {
                return yield createUser(cognitoIdentityServiceProvider, params);
            }
        }
        yield wait();
        function wait() {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve("hello"), 10000);
            });
        }
        return (0, functions_1.CreateLambdaResponse)(500, JSON.stringify('Could not authenticate user'));
    }
    catch (e) {
        return (0, functions_1.CreateLambdaResponse)(500, JSON.stringify(e));
    }
});
exports.getUserTokenHandler = getUserTokenHandler;
function createUser(cognitoIdentityServiceProvider, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let createUser = cognitoIdentityServiceProvider.adminCreateUser(params);
        let createdUserData = yield createUser.promise();
        let createdUserJson = JSON.parse(JSON.stringify(createdUserData.User));
        createdUserJson.UserAttributes = createdUserJson.Attributes;
        delete createdUserJson.Attributes;
        return (0, functions_1.CreateLambdaResponse)(200, JSON.stringify(createdUserJson));
    });
}
//# sourceMappingURL=index.js.map