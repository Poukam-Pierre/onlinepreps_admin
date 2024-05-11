import { Box, Collapse, Tooltip, Typography } from "@mui/material";
import { sideBarItem } from "./SideBar";
import { theme } from "../../../utils/style/theme";
import { useLocation } from "react-router-dom";

interface navBarItemProps {
    navEl: sideBarItem
    isSideOpen: boolean
}
export default function NavBarItem({
    navEl: { label, icon, link }, isSideOpen }:
    navBarItemProps) {
    const location = useLocation()
    const isActive = link === location.pathname
    return (
        <Tooltip
            arrow
            title={isSideOpen ? "" : label}
            placement="right"
        >
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                alignItems: 'center',
                columnGap: isSideOpen ? '10px' : 0,
                padding: isSideOpen ? '5px 20px' : '5px',
                justifySelf: isSideOpen ? 'inherit' : 'center',
                cursor: 'pointer',
                background: isActive ? theme.palette.primary.dark : 'none',
                borderRadius: '10px',
                '&:hover': {
                    background: !isActive ? theme.palette.primary.dark : 'none'
                }

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
        </Tooltip>
    );
}
