"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosition = exports.getUser = exports.upsertUser = exports.getTop100Users = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const functions_1 = require("../utilities/functions");
const ddb = new aws_sdk_1.default.DynamoDB.DocumentClient();
function getTop100Users() {
    ddb
        .query({
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        IndexName: 'BestTime_Index',
        KeyConditionExpression: 'BestTime > :bt',
        ExpressionAttributeValues: { ':bt': '0' },
        ScanIndexForward: true,
        Limit: 100,
    })
        .promise()
        .then(data => { return (0, functions_1.CreateLambdaResponse)(200, JSON.stringify(data.Items)); })
        .catch(console.error);
    return (0, functions_1.CreateLambdaResponse)(500, JSON.stringify('Couldn\'t get data.'));
}
exports.getTop100Users = getTop100Users;
function upsertUser(user) {
    return ddb.update({
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        Key: { SteamId: user.steamId },
        UpdateExpression: 'set #WID=:WID,#SID=:SID,#BT=:BT,#LU=:LU',
        ConditionExpression: '#BT > :BT',
        ExpressionAttributeNames: { '#WID': 'WormholeId', '#SID': 'SteamId', '#BT': 'BestTime', '#LU': 'LastUpdated' },
        ExpressionAttributeValues: {
            ":WID": { WormholeId: user.wormHoleId },
            ":SID": { SteamId: user.steamId },
            ":BT": { BestTime: user.bestTime },
            ":LU": { LastUpdated: new Date().toISOString() },
        },
        ReturnValues: 'ALL_NEW',
    }).promise();
}
exports.upsertUser = upsertUser;
function getUser(steamId) {
    var params = {
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        Key: {
            SteamId: steamId
        },
    };
    var documentClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
    documentClient.get(params, function (err, data) {
        if (err)
            console.log(err);
        else
            return data;
    });
    throw Error('Couldn\'t find User.');
}
exports.getUser = getUser;
function getUserPosition(steamId) {
    const user = getUser(steamId);
    ddb
        .query({
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        IndexName: 'BestTime_Index',
        FilterExpression: "#bt > :bestTime",
        ExpressionAttributeNames: {
            "#id": "WormholeId",
            "#bt": "BestTime",
        },
        ExpressionAttributeValues: {
            ":bestTime": user.bestTime,
        },
        ScanIndexForward: true,
        Limit: 15
    })
        .promise()
        .then(data => { var _a; return (0, functions_1.CreateLambdaResponse)(200, JSON.stringify((_a = data === null || data === void 0 ? void 0 : data.Items) === null || _a === void 0 ? void 0 : _a.push(user))); })
        .catch(console.error);
    return (0, functions_1.CreateLambdaResponse)(500, JSON.stringify('Couldn\'t get data.'));
}
exports.getUserPosition = getUserPosition;
//# sourceMappingURL=queries.js.map