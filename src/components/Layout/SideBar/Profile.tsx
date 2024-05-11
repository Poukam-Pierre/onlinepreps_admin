import { Avatar, Typography, Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from "../../../utils/style/theme";

export default function Profile() {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            alignItems: 'center',
            columnGap: '10px',
            alignSelf: 'end',
        }}>
            <Avatar alt="profil photo" />
            <Box sx={{
                color: theme.palette.secondary.contrastText
            }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >Full name</Typography>
                <Typography variant="body2"> Fonction</Typography>
            </Box>
            <LogoutIcon sx={{ justifySelf: 'end' }} />
        </Box>

    );
}
