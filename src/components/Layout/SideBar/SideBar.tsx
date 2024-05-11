import { Avatar, Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { ReactElement, useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HandshakeIcon from '@mui/icons-material/Handshake'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import TimelineIcon from '@mui/icons-material/Timeline'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import TextsmsIcon from '@mui/icons-material/Textsms'
import FullLogoOP from '../../../asset/logoOnlinePreps.png'
import ShortLogoOP from '../../../asset/logo.PNG'
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
    const [isSideOpen, setIsSideBarOpen] = useState<boolean>(true)
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
            width: isSideOpen ? '220px' : 'fit-content',
            padding: '8px',
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            rowGap: isSideOpen ? '10px' : '25px',
            position: 'relative'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {isSideOpen ? (
                    <Box
                        component='img'
                        src={FullLogoOP}
                        alt="logo OP"
                        sx={{ width: 150 }}
                    />

                ) : (
                    <Box
                        component='img'
                        src={ShortLogoOP}
                        alt="logo OP"
                        sx={{ width: 45 }}
                    />

                )}
                <Tooltip
                    arrow
                    title={isSideOpen ? 'Close' : 'Open'}
                    placement="right"
                >
                    <IconButton
                        size="small"
                        sx={{
                            bgcolor: theme.palette.primary.dark,
                            boxShadow: '0px 6px 12px',
                            position: 'absolute',
                            right: isSideOpen ? 0 : '-12px'
                        }}
                        onClick={() => setIsSideBarOpen((prev) => !prev)}
                    >
                        {isSideOpen ? (
                            <ChevronLeftIcon
                                sx={{
                                    color: theme.palette.secondary.contrastText,
                                    height: '20px',
                                    width: '20px',
                                }} />

                        ) : (

                            <ChevronRightIcon
                                sx={{
                                    color: theme.palette.secondary.contrastText,
                                    height: '20px',
                                    width: '20px',
                                }} />
                        )}
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
                    <NavBar
                        key={index}
                        sideBarNav={sideBarNav}
                        isSideOpen={isSideOpen}
                    />
                ))}
            </Box>
            <Profile isSideOpen={isSideOpen} />
        </Box>
    );
}
