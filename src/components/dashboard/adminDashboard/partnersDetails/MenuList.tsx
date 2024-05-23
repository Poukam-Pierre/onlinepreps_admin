import { Menu, MenuItem } from "@mui/material";
import { partnersDetails } from "./PartnersDetails";

interface menuListProps {
    anchorEl: HTMLAnchorElement | null;
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
    dataList: partnersDetails[];
    setPartnerSelected: (partnerDetails: partnersDetails) => void
}

export default function MenuList({
    anchorEl,
    setAnchorEl,
    dataList,
    setPartnerSelected
}: menuListProps) {
    return (
        <Menu
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            {(dataList.map(partner => partner.name))
                .map((partnerName, index) => (
                    <MenuItem
                        key={index}
                        value={partnerName}
                        divider
                        onClick={() => {
                            setAnchorEl(null);
                            setPartnerSelected(dataList.find((partner) => partner.name === partnerName) as partnersDetails)
                        }}
                    >
                        {partnerName}
                    </MenuItem>
                ))}
        </Menu>
    );
}
