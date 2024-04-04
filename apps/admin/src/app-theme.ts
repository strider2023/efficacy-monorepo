import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#181825',
        },
        primary: {
            light: '#393958',
            main: '#4caf50',
            dark: '#4caf50',
            contrastText: '#fff',
        },
        secondary: {
            light: '#181825',
            main: '#181825',
            dark: '#181825',
            contrastText: '#000',
        },
    },
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            }
        },
        MuiButton: {
            defaultProps: {
                size: 'large',
            },
            styleOverrides: {
                root: {
                    borderRadius: 50,
                }
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'transparent',
                    borderLeft: 'none'
                }
            }
        }
    },
});