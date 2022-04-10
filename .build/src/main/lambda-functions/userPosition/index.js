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
exports.getUserPositionHandler = void 0;
const queries_1 = require("../../dynamodb/queries");
const functions_1 = require("../../utilities/functions");
const getUserPositionHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((0, functions_1.checkForInvalidAuthorization)(event)) {
        return (0, functions_1.CreateLambdaResponse)(500, 'Authorization not configured');
    }
    try {
        const steamId = (_b = (_a = event === null || event === void 0 ? void 0 : event.requestContext) === null || _a === void 0 ? void 0 : _a.authorizer) === null || _b === void 0 ? void 0 : _b.claims['cognito:steamId'];
        return (0, queries_1.getUserPosition)(steamId);
    }
    catch (e) {
        return (0, functions_1.CreateLambdaResponse)(500, JSON.stringify(e));
    }
});
exports.getUserPositionHandler = getUserPositionHandler;
//# sourceMappingURL=index.js.map