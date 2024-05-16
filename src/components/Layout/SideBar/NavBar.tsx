import { Box, Collapse, Typography } from "@mui/material";
import { sideBarSection } from "./SideBar";
import NavBarItem from "./NavBarItem";
import { useTranslation } from "react-i18next";

interface navBarProps {
    sideBarNav: sideBarSection
    isSideOpen: boolean
}

export default function NavBar({
    sideBarNav: { title, sideBarItems }, isSideOpen }:
    navBarProps) {
    const { t } = useTranslation()
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
                {t(`${title}`)}
            </Typography>
            {sideBarItems.map((navEl, index) => (
                <NavBarItem navEl={navEl} key={index} isSideOpen={isSideOpen} />
            ))}
        </Box>
    )
}
