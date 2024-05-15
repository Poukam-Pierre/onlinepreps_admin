import LanguageIcon from '@mui/icons-material/Language';
import { Box, IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { theme } from "../../../utils/style/theme";
import BreadcrumbBase from "./breadcrumbs/BreadcrumbBase";
import MenuLanguage from "./MenuLanguage";

export interface breadcrumbItem {
    title: string;
    href: string;
    unLink?: boolean;
}

export default function Header() {
    const location = useLocation()
    const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)

    const breadcrumbBase: breadcrumbItem[] = [
        {
            title: 'dashboard',
            href: '/admin'
        },
        {
            title: 'Employes',
            href: '/admin/employes'
        },
        {
            title: 'New',
            href: '/admin/employe/new',
            unLink: true
        },
        {
            title: 'Partners',
            href: '/admin/partners'
        },
        {
            title: 'View',
            href: '/admin/partner/:id',
            unLink: true
        },
        {
            title: 'tests',
            href: '/admin/epreuves'
        },
        {
            title: 'Messages',
            href: '/admin/messages'
        },
        {
            title: 'Management',
            href: '/admin/manage'
        },
        {
            title: 'Statistics',
            href: '/admin/statistics'
        },
    ]

    function getCorrespondingBreadcrumb() {
        const breadcrumbNameMap = location.pathname.split('/').filter((x) => x)
        const currentBreadcrumbBase = breadcrumbBase.filter((value) =>
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
            <Tooltip arrow title="Change language">
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
