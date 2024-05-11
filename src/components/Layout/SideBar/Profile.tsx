import { Avatar, Typography, Box, IconButton, Tooltip, Collapse } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from "../../../utils/style/theme";

interface profileProps {
    isSideOpen: boolean
}
export default function Profile({ isSideOpen }: profileProps) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            alignItems: 'center',
            columnGap: '10px',
            alignSelf: 'end',
        }}>
            <Avatar
                alt="profil photo"
                sx={{
                    display: isSideOpen ? 'flex' : 'none'
                }}
            />
            <Box sx={{
                color: theme.palette.secondary.contrastText
            }}>
                <Typography
                    component={Collapse}
                    in={isSideOpen}
                    orientation="horizontal"
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        textWrap: 'nowrap',
                        whiteSpace: 'nowrap'
                    }}
                >Full name</Typography>
                <Typography
                    variant="body2"
                    component={Collapse}
                    in={isSideOpen}
                    orientation="horizontal"
                >
                    Fonction
                </Typography>
            </Box>
            <Tooltip
                arrow
                title="Log Out"
                placement="right"
            >
                <IconButton
                    size="small"
                    sx={{
                        justifySelf: 'end',
                        color: theme.palette.secondary.contrastText
                    }}

                >
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
        </Box>

    );
}
