import { createTheme, ThemeOptions, Shadows } from '@mui/material/styles';

// create a temporary theme to get the default options
const defaultTheme = createTheme();

// get the default `shadows` object
const defaultShadows: ThemeOptions['shadows'] = [...defaultTheme.shadows];

export const appTheme = createTheme({
    shadows: defaultShadows.map(() => 'none') as Shadows,
    palette: {
        mode: 'dark',
        background: {
            default: '#1c2434', //'#181825'
        },
        primary: {
            light: '#78ccf4',
            main: '#78ccf4',
            dark: '#78ccf4',
            contrastText: '#181825',
        },
        secondary: {
            light: '#181825',
            main: '#78ccf4',
            dark: '#78ccf4',
            contrastText: '#fff',
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
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiFab: {
            defaultProps: {
                size: 'large'
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