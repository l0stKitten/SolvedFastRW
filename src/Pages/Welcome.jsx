import { Typography } from '@mui/material';
import { Fragment } from 'react';
import Menu from '../Components/Menu';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function Welcome() {
    return (
        <Fragment>
            <Menu></Menu>

            <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{pt:4, pl:6, pr: 6}}>
                <Grid item xs={12} md={8}>
                    <Typography variant='h2'>Bienvenido</Typography>
                </Grid>
            </Grid>

            </Box>

        </Fragment>

    );
}
