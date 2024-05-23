import { Menu, MenuItem } from "@mui/material";
import { usePartner } from "../../../../utils/context/partner/PartnerContextProvider";

interface menuListProps {
    anchorEl: HTMLAnchorElement | null;
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
    dataNameList: string[];
    setPartnerSelected: (El: any) => void
}

export default function MenuList({
    anchorEl,
    setAnchorEl,
    dataNameList,
    setPartnerSelected
}: menuListProps) {
    const { partnersDetails } = usePartner()

    return (
        <Menu
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            {dataNameList.map((partnerName, index) => (
                <MenuItem
                    key={index}
                    value={partnerName}
                    divider
                    onClick={() => {
                        setAnchorEl(null);
                        setPartnerSelected(partnersDetails.find(partner => partner.name === partnerName))
                    }}
                >
                    {partnerName}
                </MenuItem>
            ))}
        </Menu>
    );
}
