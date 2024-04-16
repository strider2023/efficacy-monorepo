import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { createFileRoute } from '@tanstack/react-router';
import { AuthContext } from '../providers/AuthProvider';
import Copyright from '../components/Copyright';
import { Grid } from '@mui/material';

import './index.scss'

export const Route = createFileRoute('/')({
  component: Login
})

function Login() {

  const auth = React.useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const data = new FormData(event.currentTarget);
    const request = {
      email: data.get('email'),
      password: data.get('password'),
      callbackURL: params.get('redirect') || '/list/items'
    }
    auth.login(request)
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <CssBaseline />
      <div className="base-container">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <img
            src="/efficacy-logo.svg"
            alt="App Icon"
            loading="lazy"
            height={128} />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
            <TextField margin="normal" required fullWidth id="email"
              label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password"
              label="Password" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
      <Copyright />
    </Container>
  )
}