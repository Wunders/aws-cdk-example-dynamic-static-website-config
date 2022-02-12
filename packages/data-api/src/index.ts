// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DataType } from '@aws-cdk-example-dynamic-web-config/shared';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const ddb = new DocumentClient();

const CORS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
};

exports.handler = async (event: any) => {
    console.log('Event: \n' + JSON.stringify(event, null, 2));
    const registrationKey = event.queryStringParameters.registrationKey;
    if (typeof registrationKey === 'string') {
        if (event.httpMethod === 'GET') {
            try {
                console.log('getting dynamo value for key', event.queryStringParameters.registrationKey);
                const queryResult = await queryDynamoFor(
                    'key_value_table',
                    event.queryStringParameters.registrationKey
                );
                console.log('got result from query', queryResult);
                const itemResult = JSON.stringify(queryResult);
                return {
                    statusCode: 200,
                    headers: {
                        ...CORS,
                    },
                    body: itemResult,
                };
            } catch (error) {
                return {
                    statusCode: 400,
                    headers: {
                        ...CORS,
                    },
                    body: 'Item not found in table with error: ' + error,
                };
            }
        } else if (event.httpMethod === 'PUT') {
            try {
                console.log('calling dynamodb to put in key', event.queryStringParameters.registrationKey);
                const putResult = await putKeyValueInDynamo(
                    'key_value_table',
                    event.queryStringParameters.registrationKey,
                    event.queryStringParameters.percentageValue
                );
                console.log('got result from put', putResult);
                return {
                    statusCode: 200,
                    headers: {
                        ...CORS,
                    },
                    body: 'Successfully put item in table',
                };
            } catch (error) {
                return {
                    statusCode: 400,
                    headers: {
                        ...CORS,
                    },
                    body: 'Could not put item in table with error: ' + error,
                };
            }
        } else {
            return {
                statusCode: 400,
                headers: {
                    ...CORS,
                },
                body: 'Invalid http Method: ' + event.httpMethod,
            };
        }
    } else {
        return {
            statusCode: 400,
            headers: {
                ...CORS,
            },
            body: 'Invalid query',
        };
    }
};

function queryDynamoFor(tableName: string, registrationKeyName: string): any {
    const queryParams = {
        TableName: tableName,
        Key: {
            registration_key: registrationKeyName,
        },
    };

    return ddb
        .get(queryParams, (error, result) => {
            if (error) {
                console.log('Could not find item in table with error', error);
            } else {
                console.log('Successfully found item in table', result);
            }
        })
        .promise();
}

function putKeyValueInDynamo(tableName: string, registrationKeyName: string, percentageValue: string): any {
    const queryParams = {
        TableName: tableName,
        Item: {
            registration_key: registrationKeyName,
            percentage_value: percentageValue,
        },
    };

    return ddb
        .put(queryParams, (error, result) => {
            if (error) {
                console.log('Could not put item in table with error', error);
            } else {
                console.log('Successfully put item in table', result);
            }
        })
        .promise();
}
