import { Box, Collapse, Typography } from "@mui/material";
import { sideBarSection } from "./SideBar";
import NavBarItem from "./NavBarItem";

interface navBarProps {
    sideBarNav: sideBarSection
    isSideOpen: boolean
}

export default function NavBar({
    sideBarNav: { title, sideBarItems }, isSideOpen }:
    navBarProps) {
    return (
        <Box sx={{
            display: 'grid',
            rowGap: isSideOpen ? '10px' : '15px',
            padding: '0px 8px'
        }}>
            <Typography
                component={Collapse}
                in={isSideOpen}
                orientation="horizontal"
                sx={{
                    color: "#AFB0B0",
                    display: isSideOpen ? 'initial' : 'none',
                    fontWeight: '500',
                    textWrap: 'nowrap',
                    whiteSpace: 'nowrap'
                }}>
                {title}
            </Typography>
            {sideBarItems.map((navEl, index) => (
                <NavBarItem navEl={navEl} key={index} isSideOpen={isSideOpen} />
            ))}
        </Box>
    )
}
