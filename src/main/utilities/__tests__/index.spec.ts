import {checkForInvalidAuthorization, CreateLambdaResponse, parseUserFromEvent, toUrlString} from '../functions'
import { User } from "../../types/types";

describe('Testing functions',()=> {
    it('should convert string in buffer to base64', async ()=> {
        var buf = new Buffer('test');

        var results = toUrlString(buf);

        expect(results).toBe(String);
    });

    it('should parse fields to create a user from an event object', async ()=> {
        var event = {
            body:{
                steamId:'is here',
                bestTime:'here',
            },
        };

        var results:User = parseUserFromEvent(event);

        expect(results.wormHoleId).toBeDefined();
    });

    it('should be invalid fields to create a user from an event object', async ()=> {
        var event = {
            body:{
                invalidOne:'is here',
                invalidTwo:'here',
            },
        };
        try{
            parseUserFromEvent(event);
        }catch(err){
            expect(err.message).toBeDefined();
        }
        //Should not get here.
    });

    it('should be valid authorization', async ()=> {
        var event = {
            requestContext:{
                authorizer:'test'
            },
        };

        var results = checkForInvalidAuthorization(event);

        expect(results).toBe(false);
    });

    it('should be invalid authorization', async ()=> {
        var event = {
            requestContext:{
                improper:'',
            },
        };

        var results = checkForInvalidAuthorization(event);

        expect(results).toBe(true);
    });

    
    it('should create an appropriate lambda response', async ()=> {
        var results = CreateLambdaResponse(200,'valid response');

        expect(results.headers).toBeDefined();
        expect(results.statusCode).toBeDefined();
        expect(results.body).toBeDefined();
    });
});
