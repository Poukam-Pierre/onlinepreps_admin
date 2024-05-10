import { Box, Menu, MenuItem } from "@mui/material";
import { languages } from ".";
import { useState } from "react";
import i18next from 'i18next'


interface menuLanguageProps {
    anchorEl: HTMLAnchorElement | null,
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
}

export default function MenuLanguage({ anchorEl, setAnchorEl }: menuLanguageProps) {
    const [selected, setSelected] = useState<string>(
        localStorage.getItem('systemLanguage') === 'en' ? 'en' : 'fr'
    )

    function handleLanguage(code: string) {
        setSelected(code)
        if (code === 'en') {
            localStorage.setItem('systemLanguage', 'en')
            i18next.changeLanguage('en')
        } else {
            localStorage.setItem('systemLanguage', 'fr')
            i18next.changeLanguage('fr')
        }
    }

    return (
        <Menu
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            open={anchorEl !== null}
        >
            {languages.map(({ code, label, country_code }) => (
                <MenuItem
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    key={code}
                    disabled={code === selected}
                    onClick={() => setAnchorEl(null)}
                >
                    <Box onClick={() => handleLanguage(code)}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${country_code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${country_code.toLowerCase()}.png 2x`}
                            alt=""
                            style={{ marginRight: '10px' }}
                        />
                        {label}
                    </Box>
                </MenuItem>
            ))}
        </Menu>

    );
}
