// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AppConfig } from './types';

declare global {
    interface Window {
        __config: AppConfig;
    }
}
