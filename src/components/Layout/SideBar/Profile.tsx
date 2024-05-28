import { Avatar, Typography, Box, IconButton, Tooltip, Collapse } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from "../../../utils/style/theme";
import { useAuth } from "../../../utils/context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface profileProps {
    isSideOpen: boolean
}
export default function Profile({ isSideOpen }: profileProps) {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const {
        userData: {
            userInfo: { nom, profil_img, poste, is_employe },
        },
        authDispatch
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
            <Tooltip arrow title={t('profile')}>
                <Avatar
                    alt={nom}
                    src={profil_img}
                    sx={{
                        display: isSideOpen ? 'flex' : 'none',
                        cursor: 'pointer',
                        color: theme.palette.primary.light
                    }}
                    onClick={() => navigate(is_employe ? '/profile' : '/admin/profile')}
                />
            </Tooltip>
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
                >{nom.toUpperCase().split(' ')[0]}</Typography>
                <Typography
                    variant="body2"
                    component={Collapse}
                    in={isSideOpen}
                    orientation="horizontal"
                >
                    {t(`${poste}`)}
                </Typography>
            </Box>
            <Tooltip
                arrow
                title={t('logOut')}
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
