import { randomBytes } from "crypto";
import { LambdaResponse, User } from "../types/types";

export function toUrlString(buffer:any) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

export function parseUserFromEvent(requestBody:any): User{
  if(requestBody == '' || requestBody.steamId == null || requestBody.bestTime == null)
    throw new Error('Invalid API Request');
  return {
    wormHoleId:toUrlString(randomBytes(16)),
    steamId:requestBody.steamId,
    bestTime:requestBody.bestTime
  };
}

export function CreateLambdaResponse(statusCode: number,message:any) : LambdaResponse {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: statusCode,
      body: message,
    }
};

export function checkForInvalidAuthorization(body:any) {
    if (body.authorizer == process.env.SECRET_KEY) {
        return false;
      }
      return true;
}