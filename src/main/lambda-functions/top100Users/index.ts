import { Handler } from 'aws-lambda';
import { CreateLambdaResponse } from '../../utilities/functions';
import { getTop100Users } from '../../dynamodb/queries';
import { LambdaResponse } from '../../types/types';

 export const getTop100UsersHandler: Handler = async (event: any): Promise<LambdaResponse> => {
  try{
      return CreateLambdaResponse(200,JSON.stringify(await getTop100Users()));
  } catch (e) {
    return CreateLambdaResponse(500,JSON.stringify(e));
  }
}
