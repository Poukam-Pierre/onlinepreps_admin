import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
        }}>
            <Typography
                variant="body2"
                paddingRight='5px'
            >
                Powered by
            </Typography>
            <Box >
                <Link
                    underline="hover"
                    variant="body2"
                    target="_blank"
                    href='#'
                    sx={{
                        display: 'flex',
                        paddingRight: '5px',
                        alignItems: 'center'
                    }}
                >
                    Poukam Tech
                    <img src='' alt="" />
                </Link>
            </Box>
        </Box>
    );
}
