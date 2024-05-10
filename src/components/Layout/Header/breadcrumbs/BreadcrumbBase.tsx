import { Breadcrumbs, Link } from "@mui/material";
import { breadcrumbItem } from "../Header";

interface breadcrumbBaseProps {
    breadcrumbs: breadcrumbItem[]
}

export default function BreadcrumbBase({ breadcrumbs }: breadcrumbBaseProps) {
    return (
        <Breadcrumbs>
            <Link
                href='/admin'
                variant="body2"
                underline="hover"
                color='primary'
            >Admin</Link>
            {breadcrumbs.map(({ title, href, unLink }, index) => (
                <Link
                    key={index}
                    href={unLink ? undefined : href}
                    variant="body2"
                    underline='hover'
                    color='primary'
                >
                    {title}
                </Link>
            ))}
        </Breadcrumbs>
    );
}
