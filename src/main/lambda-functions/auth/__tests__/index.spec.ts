import { LambdaResponse } from './../../../types/types';
import { getUserTokenHandler } from '../index';
import { getStubbedContext } from '../../lambda-request-samples/mockContext';
import { getStubbedCallback } from '../../lambda-request-samples/mockCallback';

describe('Testing Authentication Handler',()=> {

    it('should return a response of 200, and a JSON string of items', async ()=> {

          const event = { requestContext: {
                    authorizer: {
                        claims: {},
                    },
                },
            };

        var results: LambdaResponse = await getUserTokenHandler(event,getStubbedContext(),getStubbedCallback());
        expect(results.body).toBeDefined();
    });
});
