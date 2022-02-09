#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PublicKeyValueStoreStack } from '../lib/publicKeyValueStoreStack';

const app = new cdk.App();
new PublicKeyValueStoreStack(app, 'PublicKeyValueStoreStack', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
