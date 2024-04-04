import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright(props: unknown) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/strider2023/efficacy">
                Efficacy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright