// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import getConfig from '../getConfig';

const apiGet = async <T>(path: string): Promise<T> => {
    const config = getConfig();

    const response = await fetch(`${config.apiUrl}${path}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
    });

    return response.json();
};

export { apiGet };
