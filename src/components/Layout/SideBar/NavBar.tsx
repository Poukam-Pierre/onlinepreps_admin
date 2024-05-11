import { Box, Typography } from "@mui/material";
import { sideBarSection } from "./SideBar";
import NavBarItem from "./NavBarItem";

interface navBarProps {
    sideBarNav: sideBarSection
}

export default function NavBar({
    sideBarNav: { title, sideBarItems } }:
    navBarProps) {
    return (
        <Box sx={{
            display: 'grid',
            rowGap: '10px',
            padding: '0px 8px'
        }}>
            <Typography
                sx={{
                    color: "#AFB0B0",
                }}>
                {title}
            </Typography>
            {sideBarItems.map((navEl, index) => (
                <NavBarItem navEl={navEl} key={index} />
            ))}
        </Box>
    )
}
