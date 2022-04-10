import { LambdaResponse } from './../../../types/types';
import { upsertUserHandler } from '../index';
import { getStubbedContext } from '../../lambda-request-samples/mockContext';
import { getStubbedCallback } from '../../lambda-request-samples/mockCallback';

describe('Testing Upsert User Handler',()=> {

    it('should create a user', async ()=> {

        var event = {
            requestContext: {
                authorizer: {
                    claims: {},
                },
            },
        };
        
        var results: LambdaResponse = await upsertUserHandler(event,getStubbedContext(),getStubbedCallback());
        expect(results).toBe(Map);
    });

    it('should update a users best time', async ()=> {

        var event = {
            requestContext: {
                authorizer: {
                    claims: {},
                },
            },
        };
        
        var results: LambdaResponse = await upsertUserHandler(event,getStubbedContext(),getStubbedCallback());
        expect(results).toBe(Map);
    });
});