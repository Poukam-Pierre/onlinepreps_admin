import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TextsmsIcon from '@mui/icons-material/Textsms';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { ReactElement, useState } from "react";
import ShortLogoOP from '../../../asset/logo.PNG';
import FullLogoOP from '../../../asset/logoOnlinePreps.png';
import { theme } from "../../../utils/style/theme";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { useAuth } from '../../../utils/context';
import { useTranslation } from 'react-i18next';

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
    const {
        userInfo: { is_employe },
    } = useAuth()
    const { t } = useTranslation()
    const sideBarSectionAdmin: sideBarSection[] = [
        {
            title: 'home',
            sideBarItems: [
                {
                    label: 'dashboard',
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
            title: 'quickAccess',
            sideBarItems: [
                {
                    label: 'employes',
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
                    label: 'partners',
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
                    label: 'tests',
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
            title: 'notifications',
            sideBarItems: [
                {
                    label: 'messages',
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
            title: 'others',
            sideBarItems: [
                {
                    label: 'manage',
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
                    label: 'statistics',
                    icon:
                        < TimelineIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/statistics'
                },
                {
                    label: 'settings',
                    icon:
                        < SettingsIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/admin/settings'
                }
            ]
        }
    ];
    const sideBarSectionEmploye: sideBarSection[] = [
        {
            title: 'home',
            sideBarItems: [
                {
                    label: 'dashboard',
                    icon:
                        <DashboardIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/'
                }
            ]
        },
        {
            title: 'quickAccess',
            sideBarItems: [
                {
                    label: 'tests',
                    icon:
                        <TextSnippetIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/epreuves'
                },

            ]
        },
        {
            title: 'notifications',
            sideBarItems: [
                {
                    label: 'messages',
                    icon:
                        <TextsmsIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/messages'
                }
            ]
        },
        {
            title: 'others',
            sideBarItems: [
                {
                    label: 'settings',
                    icon:
                        < SettingsIcon
                            sx={{
                                fontSize: 30,
                                color: '#F5FA05'
                            }}
                        />,
                    link: '/settings'
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
            rowGap: isSideOpen ? '10px' : '15px',
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
                        sx={{ width: 50 }}
                    />

                )}
                <Tooltip
                    arrow
                    title={isSideOpen ? t('close') : t('open')}
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
                {(is_employe ? sideBarSectionEmploye : sideBarSectionAdmin).map((sideBarNav, index) => (
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
