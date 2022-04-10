import { Handler } from 'aws-lambda';
import { LambdaResponse, User } from '../../types/types';
import { upsertUser } from '../../dynamodb/queries';
import { CreateLambdaResponse, checkForInvalidAuthorization, parseUserFromEvent } from '../../utilities/functions';

export const upsertUserHandler: Handler = async (event: any): Promise<LambdaResponse> => {
  const requestBody = event.body == null ? '' : JSON.parse(event.body);

  if(checkForInvalidAuthorization(requestBody))
   return CreateLambdaResponse(500,JSON.stringify('Invalid Authorization.'));
  
  try{
    const wormholeUser:User = parseUserFromEvent(event);
    var results = await upsertUser(wormholeUser);
    return CreateLambdaResponse(200,JSON.stringify(results));
  } catch (e) {
    return CreateLambdaResponse(500,JSON.stringify(e));
  }
}

