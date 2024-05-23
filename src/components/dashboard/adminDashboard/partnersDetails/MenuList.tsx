import { Menu, MenuItem } from "@mui/material";

interface menuListProps {
    anchorEl: HTMLAnchorElement | null;
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
    dataList: string[];
}

export default function MenuList({
    anchorEl,
    setAnchorEl,
    dataList
}: menuListProps) {
    return (
        <Menu
            open={anchorEl !== null}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
        >
            {dataList.map((partner, index) => (
                <MenuItem
                    key={index}
                    value={partner}
                    divider
                    onClick={() => {
                        setAnchorEl(null);
                    }}
                >
                    {partner}
                </MenuItem>
            ))}
        </Menu>
    );
}
