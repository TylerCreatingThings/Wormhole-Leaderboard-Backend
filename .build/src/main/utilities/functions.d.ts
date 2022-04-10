import { LambdaResponse, User } from "../types/types";
export declare function toUrlString(buffer: any): any;
export declare function parseUserFromEvent(event: any): User;
export declare function CreateLambdaResponse(statusCode: number, message: any): LambdaResponse;
export declare function checkForInvalidAuthorization(event: any): boolean;
