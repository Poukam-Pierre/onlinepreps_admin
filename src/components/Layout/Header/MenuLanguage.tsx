import { Box, Menu, MenuItem } from "@mui/material";
import {
    supportedLanguageEnglishVersionInfos,
    supportedLanguageFrenshVersionInfos,
    useOPLanguage
} from "../../../utils/language";
import { getLanguageCode } from "../../../utils/utilis/GetCountryCode";


interface menuLanguageProps {
    anchorEl: HTMLAnchorElement | null,
    setAnchorEl: (anchorEl: HTMLAnchorElement | null) => void
}

export default function MenuLanguage({ anchorEl, setAnchorEl }: menuLanguageProps) {
    const { activeLanguage, languageDispatch } = useOPLanguage()
    const languages = getLanguageCode(activeLanguage) === 'en' ? supportedLanguageEnglishVersionInfos : supportedLanguageFrenshVersionInfos


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
                    disabled={code === getLanguageCode(activeLanguage)}
                    onClick={() => setAnchorEl(null)}
                >
                    <Box onClick={() => languageDispatch({
                        type: activeLanguage === 'en' ? 'USE_FRENSH' : 'USE_ENGLISH'
                    })}>
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
