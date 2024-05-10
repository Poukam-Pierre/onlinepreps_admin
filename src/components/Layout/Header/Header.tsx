import { Box, Button } from "@mui/material";
import LogoOP from '../../../asset/logoOnlinePreps.png'
import BreadcrumbBase from "./breadcrumbs/BreadcrumbBase";
import { useLocation } from "react-router-dom";
import TranslateIcon from '@mui/icons-material/Translate';
import { theme } from "../../../utils/style/theme";

export interface breadcrumbItem {
    title: string;
    href: string;
    unLink?: boolean;
}

export default function Header() {
    const location = useLocation()

    const breadcrumbBase: breadcrumbItem[] = [
        {
            title: 'dashboard',
            href: '/'
        },
        {
            title: 'employes',
            href: '/admin/employes'
        },
        {
            title: 'new',
            href: '/admin/employes/new',
            unLink: true
        },
        {
            title: 'partner',
            href: '/admin/partner'
        },
        {
            title: 'View',
            href: '/admin/partner/:id',
            unLink: true
        },
        {
            title: 'test',
            href: '/admin/epreuves'
        },
        {
            title: 'messages',
            href: '/admin/messages'
        },
        {
            title: 'management',
            href: '/admin/manager'
        },
        {
            title: 'statistics',
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
        <Box>
            {getCorrespondingBreadcrumb()}
            <Button>
                <TranslateIcon sx={{
                    fontSize: { xs: 20, sm: 30 },
                    color: theme.palette.secondary.contrastText,
                }} />
            </Button>

        </Box>
    );
}
