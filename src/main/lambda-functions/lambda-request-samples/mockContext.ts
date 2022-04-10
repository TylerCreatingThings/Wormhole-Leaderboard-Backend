export const getStubbedContext = ()=>{
    return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: function (): number {
        throw new Error('Function not implemented.');
    },
    done: function (error?: Error, result?: any): void {
        throw new Error('Function not implemented.');
    },
    fail: function (error: string | Error): void {
        throw new Error('Function not implemented.');
    },
    succeed: function (messageOrObject: any): void {
        throw new Error('Function not implemented.');
    }
}
};