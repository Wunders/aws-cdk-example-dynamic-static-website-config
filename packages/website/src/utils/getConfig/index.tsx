// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { AppConfig } from '../../types';

const getConfig = (): AppConfig => {
    return window.__config;
};

export default getConfig;
