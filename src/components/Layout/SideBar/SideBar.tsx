import { Avatar, Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
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
import NavBar from "./NavBar";
import Profile from "./Profile";

export interface sideBarItem {
    label: string
    icon: ReactElement
    link: string
}

export interface sideBarSection {
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
                    icon:
                        <DashboardIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin'
                }
            ]
        },
        {
            title: 'QUICK ACCESS',
            sideBarItems: [
                {
                    label: 'Employes',
                    icon:
                        <AccountCircleIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/employes'
                },
                {
                    label: 'Partners',
                    icon:
                        <HandshakeIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/partners'
                },
                {
                    label: 'Tests',
                    icon:
                        <TextSnippetIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/epreuves'
                },

            ]
        },
        {
            title: 'NOTIFICATIONS',
            sideBarItems: [
                {
                    label: 'Messages',
                    icon:
                        <TextsmsIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/messages'
                }
            ]
        },
        {
            title: 'STUFF',
            sideBarItems: [
                {
                    label: 'Manage',
                    icon:
                        < LocalMallIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/manage'
                },
                {
                    label: 'Statistics',
                    icon:
                        < TimelineIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
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
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            rowGap: '10px'
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
                <Tooltip
                    arrow
                    title='close'
                    placement="right"
                >
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
                </Tooltip>
            </Box>
            <Divider sx={{
                borderColor: theme.palette.primary.dark,
            }} />
            <Box sx={{
                display: 'grid',
                rowGap: '20px'
            }}>
                {sideBarSection.map((sideBarNav, index) => (
                    <NavBar sideBarNav={sideBarNav} key={index} />
                ))}
            </Box>
            <Profile />
        </Box>
    );
}
