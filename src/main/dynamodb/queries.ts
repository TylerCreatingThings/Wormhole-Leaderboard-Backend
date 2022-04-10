import AWS from 'aws-sdk';
import { User } from '../types/types';
import { CreateLambdaResponse } from '../utilities/functions';

const ddb = new AWS.DynamoDB.DocumentClient();

export async function getTop100Users() {
      return await ddb
      .scan({
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        IndexName: 'BestTime_Index',
        Limit: 100,
      })
      .promise()
      .then(data => { return data.Items;})
      .catch( err => {
        console.log(err);
        return {};
      })
    
}

export function upsertUser(user:User) {
    return ddb.update(
      {
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        Key: { SteamId: user.steamId },
        UpdateExpression: 'set #WID=:WID,#BT=:BT,#LU=:LU',
        ConditionExpression: '#BT > :BT or attribute_not_exists(#BT)',
        ExpressionAttributeNames: {'#WID' : 'WormholeId','#BT' : 'BestTime','#LU' : 'LastUpdated'},
        ExpressionAttributeValues : {
            ":WID": user.wormHoleId,
            ":BT": user.bestTime,
            ":LU": new Date().toISOString(),
        },
        ReturnValues:'ALL_NEW',
    }).promise();
}
  

export async function getUser(steamId:string){
  var params = {
    TableName : process.env.DYNAMODB_TABLE || 'Users',
    Key: {
      SteamId: steamId
    },
  };
  
  return await ddb.get(params).promise().then((data) => {return data.Item});
}


export async function getUserLeaderboardPosition(steamId:string) {
  
  const currentUser = await getUser(steamId) || [];
    if(currentUser != []){
      return await ddb
      .scan({
        TableName: process.env.DYNAMODB_TABLE || 'Users',
        IndexName: 'BestTime_Index',
        FilterExpression: "#bt > :bestTime",
        ExpressionAttributeNames: {
            "#bt": "BestTime",
        },
        ExpressionAttributeValues: {
            ":bestTime": currentUser['BestTime'],
        },
        Limit:15
      })
      .promise()
      .then(usersAround => { 
        usersAround.Items?.push(currentUser);
        return usersAround.Items;
      })
      .catch( (err) => {console.log(err); return {};})
    }
}