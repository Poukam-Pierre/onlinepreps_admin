import { Breadcrumbs, Link } from "@mui/material";
import { breadcrumbItem } from "../Header";
import { theme } from "../../../../utils/style/theme";
import { useAuth } from "../../../../utils/context";
import { useTranslation } from "react-i18next";

interface breadcrumbBaseProps {
    breadcrumbs: breadcrumbItem[]
}

export default function BreadcrumbBase({ breadcrumbs }: breadcrumbBaseProps) {
    const {
        userData: {
            authData: {
                userInfo: { is_employe },
            }
        }
    } = useAuth()
    const { t } = useTranslation()

    return (
        <Breadcrumbs sx={{
            '& .MuiBreadcrumbs-separator': {
                color: theme.palette.secondary.contrastText
            }
        }}>
            <Link
                variant="body2"
                underline="hover"
                sx={{
                    color: theme.palette.secondary.contrastText
                }}
            >{is_employe ? t('employes') : 'Admin'}</Link>
            {breadcrumbs.map(({ title, href, unLink }, index) => (
                <Link
                    key={index}
                    href={unLink ? undefined : href}
                    variant="body2"
                    underline='hover'
                    sx={{
                        color: theme.palette.secondary.contrastText
                    }}                    >
                    {t(`${title}`)}
                </Link>
            ))}
        </Breadcrumbs>
    );
}
