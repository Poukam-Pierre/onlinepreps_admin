import { Box, Divider, IconButton } from "@mui/material";
import { ReactElement } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HandshakeIcon from '@mui/icons-material/Handshake'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import TimelineIcon from '@mui/icons-material/Timeline'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import TextsmsIcon from '@mui/icons-material/Textsms'
import LogoOP from '../../../asset/logoOnlinePreps.png'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { theme } from "../../../utils/style/theme";

interface sideBarItem {
    label: string
    icon: ReactElement
    link: string
}

interface sideBarSection {
    title: string
    sideBarItems: sideBarItem[]
}

export default function SideBar() {
    const sideBarSection: sideBarSection[] = [
        {
            title: 'HOME',
            sideBarItems: [
                {
                    label: 'Dashboard',
                    icon: <DashboardIcon />,
                    link: '/admin'
                }
            ]
        },
        {
            title: 'QUICK ACCESS',
            sideBarItems: [
                {
                    label: 'Employes',
                    icon: <AccountCircleIcon />,
                    link: '/admin/employes'
                },
                {
                    label: 'Partners',
                    icon: <HandshakeIcon />,
                    link: '/admin/partners'
                },
                {
                    label: 'Tests',
                    icon: <TextSnippetIcon />,
                    link: '/admin/epreuves'
                },

            ]
        },
        {
            title: 'NOTIFICATIONS',
            sideBarItems: [
                {
                    label: 'Messages',
                    icon: <TextsmsIcon />,
                    link: '/admin/messages'
                }
            ]
        },
        {
            title: 'STUFF',
            sideBarItems: [
                {
                    label: 'Manage',
                    icon: < LocalMallIcon />,
                    link: '/admin/manage'
                },
                {
                    label: 'Statistics',
                    icon: < TimelineIcon />,
                    link: '/admin/statistics'
                }
            ]
        }
    ];
    return (
        <Box sx={{
            backgroundColor: theme.palette.primary.light,
            width: '250px',
            padding: '8px',
            // display: 'grid'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Box
                    component='img'
                    src={LogoOP}
                    alt="logo OP"
                    sx={{ width: 150 }}
                />
                <IconButton
                    size="small"
                    sx={{
                        bgcolor: theme.palette.primary.dark,
                        boxShadow: '0px 6px 12px',
                    }}>
                    <ChevronLeftIcon
                        sx={{
                            color: theme.palette.secondary.contrastText,
                            height: '20px',
                            width: '20px',
                        }} />
                </IconButton>
            </Box>
            <Divider />

        </Box>
    );
}
