import { Menu, MenuItem } from "@mui/material";
import { usePartner } from "../../../../utils/context/partners/PartnerContextProvider";

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
    const { partnersDetails: { partnersData } } = usePartner()

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
                    onClick={() => {
                        setAnchorEl(null);
                        setPartnerSelected(partnersData.find(partner => partner.name === partnerName))
                    }}
                >
                    {partnerName}
                </MenuItem>
            ))}
        </Menu>
    );
}
