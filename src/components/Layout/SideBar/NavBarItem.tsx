import { Box, Collapse, Typography } from "@mui/material";
import { sideBarItem } from "./SideBar";
import { theme } from "../../../utils/style/theme";

interface navBarItemProps {
    navEl: sideBarItem
    isSideOpen: boolean
}
export default function NavBarItem({
    navEl: { label, icon, link }, isSideOpen }:
    navBarItemProps) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            columnGap: '10px',
            padding: isSideOpen ? '0 20px' : 0
        }}>
            {icon}
            <Typography
                component={Collapse}
                in={isSideOpen}
                orientation="horizontal"
                sx={{
                    color: theme.palette.secondary.contrastText,
                    size: '0.8rem',
                }}
            >{label}</Typography>
        </Box>
    );
}
