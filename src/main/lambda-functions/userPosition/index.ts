import { Handler } from 'aws-lambda';
import { LambdaResponse } from '../../types/types';
import { getUserLeaderboardPosition } from '../../dynamodb/queries';
import { CreateLambdaResponse,checkForInvalidAuthorization } from '../../utilities/functions';

export const getUserPositionHandler: Handler = async (event: any): Promise<LambdaResponse> => {

  try{
    const eventBody = event.body == null ? '' : JSON.parse(event.body);
    if(checkForInvalidAuthorization(eventBody))
      return CreateLambdaResponse(500,JSON.stringify('Invalid Authorization.'));

    if(eventBody.steamId === undefined)
      return CreateLambdaResponse(500,JSON.stringify('Please add steamId'));

    return CreateLambdaResponse(200,JSON.stringify(await getUserLeaderboardPosition(eventBody.steamId)));
  } catch (e) {
    console.log(e);
    return CreateLambdaResponse(500,JSON.stringify(e));
  }
}
