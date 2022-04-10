import AWS from 'aws-sdk';
import { User } from '../types/types';
export declare function getTop100Users(): import("../types/types").LambdaResponse;
export declare function upsertUser(user: User): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.DynamoDB.DocumentClient.UpdateItemOutput, AWS.AWSError>>;
export declare function getUser(steamId: string): User;
export declare function getUserPosition(steamId: string): import("../types/types").LambdaResponse;
