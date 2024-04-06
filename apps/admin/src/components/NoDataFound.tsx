import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

interface NoDatFound {
    message: string;
}

const ErrorContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(10, 0),
    ...theme.mixins.toolbar,
}));

function NoDatFound({ message }: NoDatFound) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ErrorContainer>
                    <img
                        src="/efficacy-logo.svg"
                        alt="App Icon"
                        loading="lazy"
                        height={256}
                    />
                    <Typography variant="h2" gutterBottom>
                        {message}
                    </Typography>
                </ErrorContainer>
            </Grid>
        </Grid>
    );
}

export default NoDatFound