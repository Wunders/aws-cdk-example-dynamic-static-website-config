// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { FC, useMemo } from 'react';
import NorthStarThemeProvider from 'aws-northstar/components/NorthStarThemeProvider';
import AppLayout from 'aws-northstar/layouts/AppLayout';
import Header from 'aws-northstar/components/Header';
import Data from '../Data';

const App: FC = () => {
    const header = useMemo(() => <Header title="Hello World" />, []);
    return (
        <NorthStarThemeProvider>
            <AppLayout header={header}>
                <Data />
            </AppLayout>
        </NorthStarThemeProvider>
    );
};

export default App;
