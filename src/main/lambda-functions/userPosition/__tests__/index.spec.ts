import { LambdaResponse } from './../../../types/types';
import { getUserPositionHandler } from '../index';
import { getStubbedContext } from '../../lambda-request-samples/mockContext';
import { getStubbedCallback } from '../../lambda-request-samples/mockCallback';

describe('Testing User Position Handler',()=> {
    it('should get the users position and the users around them.', async ()=> {
        var event = {
            requestContext: {
                authorizer: {
                    claims: {
                        'cognito:username':'tyler.aaron.farkas@gmail.com',
                    },
                },
            },
        };
        
        var results: LambdaResponse = await getUserPositionHandler(event,getStubbedContext(),getStubbedCallback());
        expect(results).toBe(Map);
    });
});