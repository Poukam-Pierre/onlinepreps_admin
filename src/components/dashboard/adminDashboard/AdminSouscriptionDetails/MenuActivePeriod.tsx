import { Menu, MenuItem } from "@mui/material";
import { fetchingDataSelection } from "./SouscriptionDetails";
import { Dispatch, SetStateAction } from "react";

interface menuActiveProps {
    anchorEl: HTMLAnchorElement | null
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
    souscriptionPeriod: string[] | number[]
    setActivePeriod: Dispatch<SetStateAction<fetchingDataSelection>>
    activePeriodSelection: fetchingDataSelection
}
export default function MenuActivePeriod({
    anchorEl,
    setAnchorEl,
    souscriptionPeriod,
    setActivePeriod,
    activePeriodSelection
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
                        setActivePeriod({ ...activePeriodSelection, value: period });
                        setAnchorEl(null)
                    }}
                >
                    {period}
                </MenuItem>
            ))}
        </Menu>
    );
}
