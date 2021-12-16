// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

/**
 * The CDK Construct provisions the backend api resources.
 */
export class WebsiteApiConstruct extends Construct {
    readonly api: apigateway.RestApi;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.api = new apigateway.RestApi(this, 'DataAPI', {
            defaultCorsPreflightOptions: {
                allowOrigins: apigateway.Cors.ALL_ORIGINS,
                allowMethods: apigateway.Cors.ALL_METHODS,
            },
            restApiName: 'Data API',
        });

        this.api.addUsagePlan('WebsiteDataAPIUsagePlan', {
            name: 'WebsiteDataAPIUsagePlan',
            apiStages: [{ api: this.api, stage: this.api.deploymentStage }],
            throttle: { burstLimit: 500, rateLimit: 1000 },
            quota: { limit: 10000000, period: apigateway.Period.MONTH },
        });

        const dataFunctionRole = new iam.Role(this, 'DataFunctionRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
        });

        const dataFunction = new lambdaNodeJs.NodejsFunction(this, 'DataFunction', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'handler',
            entry: path.join(__dirname, '../../data-api/src/index.ts'),
            timeout: Duration.seconds(30),
            role: dataFunctionRole,
            reservedConcurrentExecutions: 1,
        });

        const dataIntegration = new apigateway.LambdaIntegration(dataFunction);

        const dataEndpoint = this.api.root.addResource('data');
        dataEndpoint.addMethod('Get', dataIntegration);
    }
}
