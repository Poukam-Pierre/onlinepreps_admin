import { Menu, MenuItem } from "@mui/material";

interface menuActiveProps {
    anchorEl: HTMLAnchorElement | null
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
    souscriptionPeriod: string[] | number[]
    setActivePeriod: (activePeriod: string | number) => void
}
export default function MenuActivePeriod({
    anchorEl,
    setAnchorEl,
    souscriptionPeriod,
    setActivePeriod
}: menuActiveProps) {
    return (
        <Menu
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            {souscriptionPeriod.map((period, index) => (
                <MenuItem
                    key={index}
                    value={period}
                    onClick={() => {
                        setActivePeriod(period);
                        setAnchorEl(null)
                    }}
                >
                    {period}
                </MenuItem>
            ))}
        </Menu>
    );
}
