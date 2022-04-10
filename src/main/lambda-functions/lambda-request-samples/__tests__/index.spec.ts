import { Context, Callback } from 'aws-lambda';
import { getStubbedContext } from '../../lambda-request-samples/mockContext';
import { getStubbedCallback } from '../../lambda-request-samples/mockCallback';



describe('Testing for testing handler methods',()=> {

    it('should return a context object', async ()=> {
        var results:Context = getStubbedContext();
        expect(results).toBeDefined();
    });

    it('should return a test callback object', async ()=> {
        var results:Callback = getStubbedCallback();
        expect(results).toBeDefined();
    });
});
