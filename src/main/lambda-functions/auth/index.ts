import { Handler } from 'aws-lambda';
import { CreateLambdaResponse } from "../../utilities/functions";
import { LambdaResponse } from "../../types/types";
import { CognitoIdentityServiceProvider } from "aws-sdk";

/*
the client must first sign the user in to the user pool



*/

export const getUserTokenHandler: Handler = async (event: any): Promise<LambdaResponse> => {
    try{
        let eventBody = JSON.parse(event.body);
        let userPoolId = process.env.USER_POOL_ID || 'ca-central-1_BndoHRcE7';
        const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});

        var doesUserExistParams = {
          UserPoolId: userPoolId,
          Username: eventBody.username,
        };

        var params = {
          UserPoolId: userPoolId,
          Username: eventBody.username,
          UserAttributes: [],
          ValidationData: []
        };
        let doesUserExist = cognitoIdentityServiceProvider.adminGetUser(doesUserExistParams);
        

        var userFromCognito;
        try{
          userFromCognito = await doesUserExist.promise();
        }catch(err:any){
            console.log(err);
            if(err.code === 'UserNotFoundException'){
              userFromCognito = await createUser(cognitoIdentityServiceProvider,params);
            }
        }

        var authParams = {
          UserPoolId: userPoolId,
          ClientId: process.env.COGNITO_CLIENT_ID || '522nnfm0p1qvu5lvo0dnboi743',
          AuthFlow: 'ADMIN_NO_SRP_AUTH',
          AuthParameters: {
              USERNAME: userFromCognito.Username,
              PASSWORD: '',
          }};
          console.log(authParams);
        return CreateLambdaResponse(200, JSON.stringify(await cognitoIdentityServiceProvider.adminInitiateAuth(authParams).promise()));
    } catch (e) {
      return CreateLambdaResponse(500,JSON.stringify(e));
    }
}

async function createUser(cognitoIdentityServiceProvider:CognitoIdentityServiceProvider, params:any){
  let createUser = cognitoIdentityServiceProvider.adminCreateUser(params);
  let createdUserData = await createUser.promise();
  let createdUserJson = JSON.parse(JSON.stringify(createdUserData.User));
  createdUserJson.UserAttributes = createdUserJson.Attributes;
  delete createdUserJson.Attributes;
  return createdUserJson;
}
  