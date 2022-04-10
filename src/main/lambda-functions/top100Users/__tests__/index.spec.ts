import { LambdaResponse } from './../../../types/types';
import { getTop100UsersHandler } from '../index';
import { getStubbedContext } from '../../lambda-request-samples/mockContext';
import { getStubbedCallback } from '../../lambda-request-samples/mockCallback';

describe('Testing Top 100 Users Handler',()=> {

    it('should return a response of 200, and a JSON string of items', async ()=> {

          const event = { requestContext: {
                    authorizer: {
                        claims: {},
                    },
                },
            };

        var results: LambdaResponse = await getTop100UsersHandler(event,getStubbedContext(),getStubbedCallback());
        expect(results.body).toBeDefined();
    });
});
