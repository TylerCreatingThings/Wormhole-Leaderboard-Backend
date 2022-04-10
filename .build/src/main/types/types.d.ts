export declare type LambdaResponse = {
    headers: HeaderOption;
    statusCode: number;
    body: string;
};
interface HeaderOption {
    'Access-Control-Allow-Origin': string;
}
export interface User {
    wormHoleId: number;
    steamId: number;
    bestTime: Date;
}
export {};
