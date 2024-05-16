import LanguageIcon from '@mui/icons-material/Language';
import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { theme } from "../../../utils/style/theme";
import BreadcrumbBase from "./breadcrumbs/BreadcrumbBase";
import MenuLanguage from "./MenuLanguage";
import { useAuth } from '../../../utils/context';
import { useTranslation } from 'react-i18next';

export interface breadcrumbItem {
    title: string;
    href: string;
    unLink?: boolean;
}

export default function Header() {
    const location = useLocation()
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)
    const {
        userInfo: { is_employe },
    } = useAuth()
    const { t } = useTranslation()

    const breadcrumbBaseAdmin: breadcrumbItem[] = [
        {
            title: 'dashboard',
            href: '/admin'
        },
        {
            title: 'employes',
            href: '/admin/employes'
        },
        {
            title: 'new',
            href: '/admin/employe/new',
            unLink: true
        },
        {
            title: 'partners',
            href: '/admin/partners'
        },
        {
            title: 'view',
            href: '/admin/partner/:id',
            unLink: true
        },
        {
            title: 'tests',
            href: '/admin/epreuves'
        },
        {
            title: 'profile',
            href: '/admin/profile'
        },
        {
            title: 'messages',
            href: '/admin/messages'
        },
        {
            title: 'management',
            href: '/admin/manage'
        },
        {
            title: 'statistics',
            href: '/admin/statistics'
        },
        {
            title: 'settings',
            href: '/admin/settings',
        },

    ]
    const breadcrumbBaseEmploye: breadcrumbItem[] = [
        {
            title: 'dashboard',
            href: '/'
        },
        {
            title: 'profile',
            href: '/profile'
        },
        {
            title: 'tests',
            href: '/epreuves'
        },
        {
            title: 'new',
            href: '/epreuves/new',
            unLink: true
        },
        {
            title: 'modified',
            href: '/epreuves/Modified',
            unLink: true
        },
        {
            title: 'settings',
            href: '/settings',
        },
        {
            title: 'view',
            href: '/epreuves/View',
            unLink: true
        },
        {
            title: 'messages',
            href: '/messages'
        },
    ]

    function getCorrespondingBreadcrumb() {
        const breadcrumbNameMap = location.pathname.split('/').filter((x) => x)
        const currentBreadcrumbBase = (is_employe ? breadcrumbBaseEmploye : breadcrumbBaseAdmin).filter((value) =>
            breadcrumbNameMap.length <= 2 ?
                value.href === `/${breadcrumbNameMap.join('/')}` :
                value.href.includes(`/${breadcrumbNameMap.slice(0, -1).join('/')}`)
        )
        return (
            <BreadcrumbBase breadcrumbs={currentBreadcrumbBase} />
        )
    }
    return (
        <Box sx={{
            padding: '8px 16px',
            backgroundColor: theme.palette.primary.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            {getCorrespondingBreadcrumb()}
            <Tooltip
                arrow
                title={t("changeLanguage")}
            >
                <IconButton
                    onClick={(event) => setAnchorEl(event.target as HTMLAnchorElement)}
                    sx={{
                        '&:hover': {
                            background: theme.palette.primary.dark,
                            borderRadius: '10px'
                        }

                    }}
                >
                    <LanguageIcon sx={{ color: theme.palette.secondary.contrastText }} />
                </IconButton>
            </Tooltip>
            <MenuLanguage anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Box>
    );
}
