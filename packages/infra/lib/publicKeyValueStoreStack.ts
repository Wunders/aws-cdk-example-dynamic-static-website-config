// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PublicKeyValueStoreApiConstruct as PublicKeyValueStoreApiConstruct } from './publicKeyValueStoreApiContruct';
import { KeyValueStoreWebsiteConstruct } from './publicKeyValueStoreWebsiteConstruct';
import * as path from 'path';

const WEBSITE_DIST_PATH = path.join(__dirname, '../../website/build');

export class PublicKeyValueStoreStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const apiConstruct = new PublicKeyValueStoreApiConstruct(this, 'WebsiteAPIConstruct');

        new KeyValueStoreWebsiteConstruct(this, 'WebsiteConstruct', {
            websiteDistPath: WEBSITE_DIST_PATH,
            api: apiConstruct.api,
        });
    }
}
