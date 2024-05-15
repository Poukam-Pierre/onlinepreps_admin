import { Avatar, Typography, Box, IconButton, Tooltip, Collapse } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from "../../../utils/style/theme";
import { useAuth } from "../../../utils/context";
import { useNavigate } from "react-router-dom";

interface profileProps {
    isSideOpen: boolean
}
export default function Profile({ isSideOpen }: profileProps) {
    const navigate = useNavigate()
    const {
        authDispatch,
        userInfo: { is_admin, nom, profil_img },
    } = useAuth()

    const disconnected = () => {
        authDispatch({
            accessToken: '',
            userInfo: {
                id: undefined,
                nom: '',
                prenom: '',
                email: '',
            },
        })
        navigate('/login')
    }

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            alignItems: 'center',
            columnGap: '10px',
            alignSelf: 'end',
        }}>
            <Avatar
                alt="profil"
                src={profil_img}
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
                >{nom.toUpperCase()}</Typography>
                <Typography
                    variant="body2"
                    component={Collapse}
                    in={isSideOpen}
                    orientation="horizontal"
                >
                    {is_admin && 'Administrator'}
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
                        color: theme.palette.secondary.contrastText,
                        '&:hover': {
                            background: theme.palette.primary.dark,
                            borderRadius: '10px'
                        }

                    }}
                    onClick={disconnected}
                >
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
        </Box>

    );
}
