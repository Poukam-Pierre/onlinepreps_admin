import { Breadcrumbs, Link } from "@mui/material";
import { breadcrumbItem } from "../Header";
import { theme } from "../../../../utils/style/theme";

interface breadcrumbBaseProps {
    breadcrumbs: breadcrumbItem[]
}

export default function BreadcrumbBase({ breadcrumbs }: breadcrumbBaseProps) {
    return (
        <Breadcrumbs sx={{
            '& .MuiBreadcrumbs-separator': {
                color: theme.palette.secondary.contrastText
            }
        }}>
            <Link
                href='/admin'
                variant="body2"
                underline="hover"
                sx={{
                    color: theme.palette.secondary.contrastText
                }}
            >Admin</Link>
            {breadcrumbs.map(({ title, href, unLink }, index) => (
                <Link
                    key={index}
                    href={unLink ? undefined : href}
                    variant="body2"
                    underline='hover'
                    sx={{
                        color: theme.palette.secondary.contrastText
                    }}                    >
                    {title}
                </Link>
            ))}
        </Breadcrumbs>
    );
}
