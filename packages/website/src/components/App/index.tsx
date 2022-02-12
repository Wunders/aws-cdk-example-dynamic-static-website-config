// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Box, Container, Slider } from '@mui/material';
// import { FC, useMemo } from 'react';
// import Data from '../Data';

function App() { return (   
    <Container maxWidth="xs">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          Cool Sliderbar
          <Slider
            defaultValue={50}
            valueLabelDisplay="auto"
          >
          </Slider>
        </Box>      
    </Container>
    )
};

export default App;
