import { Menu, MenuItem } from "@mui/material";
import { overviewStat } from "../../../../utils/context";

interface menuListProps {
    anchorEl: HTMLAnchorElement | null;
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
    dataList: overviewStat[];
    setSelected: (El: any) => void
}

export default function MenuList({
    anchorEl,
    setAnchorEl,
    dataList,
    setSelected
}: menuListProps) {

    return (
        <Menu
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            {dataList.map((partner) => partner.name)
                .map((partnerName, index) => (
                    <MenuItem
                        key={index}
                        value={partnerName}
                        onClick={() => {
                            setAnchorEl(null);
                            setSelected(dataList.find(partner => partner.name === partnerName))
                        }}
                    >
                        {partnerName}
                    </MenuItem>
                ))}
        </Menu>
    );
}
