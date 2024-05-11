import { Box, Typography } from "@mui/material";
import { sideBarItem } from "./SideBar";
import { theme } from "../../../utils/style/theme";

interface navBarItemProps {
    navEl: sideBarItem
}
export default function NavBarItem({
    navEl: { label, icon, link } }:
    navBarItemProps) {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            columnGap: '10px',
            padding: '0 20px'
        }}>
            {icon}
            <Typography
                sx={{
                    color: theme.palette.secondary.contrastText,
                    size: '0.8rem'
                }}
            >{label}</Typography>
        </Box>
    );
}
