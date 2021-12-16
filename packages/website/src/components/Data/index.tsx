// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { FC, useEffect, useState } from 'react';
import { format as formatDate } from 'date-fns';
import Table, { Column } from 'aws-northstar/components/Table';
import { DataType } from '@aws-cdk-example-dynamic-web-config/shared';

import { apiGet } from '../../utils/api';

const columnDefinitions: Column<DataType>[] = [
    {
        id: 'orderId',
        width: 100,
        Header: 'Id',
        accessor: 'orderId',
    },
    {
        id: 'orderName',
        width: 100,
        Header: 'Order Name',
        accessor: 'orderName',
    },
    {
        id: 'customerName',
        width: 200,
        Header: 'Customer Name',
        accessor: 'customerName',
    },
    {
        id: 'amount',
        width: 200,
        Header: 'amounnt',
        accessor: (data) => `$ ${data.amount}`,
    },
    {
        id: 'createdDate',
        width: 200,
        Header: 'Created Date',
        accessor: (data) => formatDate(new Date(data.createdDate), 'Pp'),
    },
];

const Data: FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await apiGet<DataType[]>('/data');
                setData(data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        loadData();
    }, []);

    return (
        <Table
            tableTitle="Data"
            columnDefinitions={columnDefinitions}
            items={data}
            disableRowSelect={true}
            errorText={error}
        />
    );
};

export default Data;
