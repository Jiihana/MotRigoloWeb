import React from 'react';
import { Box, colors, Grid } from '@mui/material';
import CardHeaderVerticale from '../Game/Cards/CardHeader/CardHeaderVerticale';
import CardHeaderHorizontale from '../Game/Cards/CardHeader/CardHeaderHorizontale';
import CardGrid from './CardGrid';

const TestField = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(/images/pages/gameLobbyBackgound.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid
                container
                spacing={4} // Adjusted spacing for better layout
                sx={{
                    height: '45%',
                    width: '80%',
                    backgroundColor: colors.pink[500]
                }}
            >
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[500]
                    }}
                ></Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[200],
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardHeaderVerticale cardText={''} cardWord={''} />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[500],
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardHeaderVerticale cardText={''} cardWord={''} />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[200],
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardHeaderVerticale cardText={''} cardWord={''} />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[500],
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardHeaderVerticale cardText={''} cardWord={''} />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.orange[500],
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardHeaderVerticale cardText={''} cardWord={''} />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[200],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardHeaderHorizontale cardText={''} cardWord={''} />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[500],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardGrid />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[200],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardGrid />
                </Grid>
                <Grid
                    item
                    xs={2}
                    sx={{
                        backgroundColor: colors.green[500],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardGrid />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TestField;
