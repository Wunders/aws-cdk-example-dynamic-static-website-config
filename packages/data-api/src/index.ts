// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { DataType } from '@aws-cdk-example-dynamic-web-config/shared';

export const CORS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
};

const names = [
    'Alejandro Rosalez',
    'Akua Mansa',
    'Ana Carolina Silva',
    'Arnav Desai',
    'Carlos Salazar',
    'Diego Ramirez',
    'Efua Owusu',
    'Jane Doe',
    'John Doe',
    'John Stiles',
    'Jorge Souza',
    'Kwaku Mensah',
    'Kwesi Manu',
    'Li Juan',
    'Liu Jie',
    'Márcia Oliveira',
    'María García',
    'Martha Rivera',
    ' Mary Major',
    'Mateo Jackson',
    'Nikhil Jayashankar',
    'Nikki Wolf',
    'Paulo Santos',
    'Richard Roe',
    'Saanvi Sarkar',
    'Shirley Rodriguez',
    'Sofía Martínez',
    'Wang Xiulan',
    'Zhang Wei',
];

const getData = (): DataType[] => {
    return [...Array(29).keys()].map((x, index) => ({
        orderId: (x + 1).toString(),
        orderName: `Order ${x + 1}`,
        customerName: names[index],
        amount: Math.round(Math.random() * 100),
        createdDate: new Date(),
    }));
};

exports.handler = async (event: unknown) => {
    console.log('Event: \n' + JSON.stringify(event, null, 2));
    const data = getData();
    return {
        statusCode: 200,
        headers: {
            ...CORS,
        },
        body: JSON.stringify(data),
    };
};
