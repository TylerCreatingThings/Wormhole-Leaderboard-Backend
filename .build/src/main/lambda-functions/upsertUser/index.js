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
exports.upsertUserHandler = void 0;
const queries_1 = require("../../dynamodb/queries");
const functions_1 = require("../../utilities/functions");
const upsertUserHandler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, functions_1.checkForInvalidAuthorization)(event)) {
        return (0, functions_1.CreateLambdaResponse)(500, 'Authorization not configured');
    }
    try {
        const wormholeUser = (0, functions_1.parseUserFromEvent)(event);
        var results = yield (0, queries_1.upsertUser)(wormholeUser);
        return (0, functions_1.CreateLambdaResponse)(200, results);
    }
    catch (e) {
        return (0, functions_1.CreateLambdaResponse)(500, JSON.stringify(e));
    }
});
exports.upsertUserHandler = upsertUserHandler;
//# sourceMappingURL=index.js.map