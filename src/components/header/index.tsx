// Made by Poukam Ngamaleu

import { Box } from '@mui/system'
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
} from '@mui/material'
import { theme } from '../../utils/style/theme'
import logo from '../../asset/logoOnlinePreps.png'
import { useState } from 'react'
import i18next from 'i18next'
import LanguageIcon from '@mui/icons-material/Language'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import MenuSettings from './menuSetting'

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
})

export const StyledInscriptionButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
}))

const languages = [
  { code: 'fr', label: 'Français', country_code: 'fr' },
  { code: 'en', label: 'English', country_code: 'gb' },
]
function Header() {
  const [selected, setSelected] = useState<string>(
    localStorage.getItem('systemLanguage') === 'en' ? 'en' : 'fr'
  )

  function handleChange(code: string) {
    setSelected(code)
    if (code === 'en') {
      localStorage.setItem('systemLanguage', 'en')
      i18next.changeLanguage('en')
    } else {
      localStorage.setItem('systemLanguage', 'fr')
      i18next.changeLanguage('fr')
    }
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        padding: 3,
      }}
    >
      <StyledToolbar>
        <Box component="img" sx={{ width: 250 }} src={logo} alt="OnlinePreps" />
        <Box display="flex" alignItems="center">
          <IconButton sx={{ color: theme.palette.secondary.contrastText }}>
            <NotificationsNoneIcon />
          </IconButton>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <LanguageIcon
              sx={{
                fontSize: { xs: 20, sm: 30 },
                color: theme.palette.secondary.contrastText,
              }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {languages.map(({ code, label, country_code }) => (
              <MenuItem
                onClick={handleClose}
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                key={code}
                disabled={code === selected}
              >
                <Box onClick={() => handleChange(code)}>
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
          <MenuSettings />
        </Box>
      </StyledToolbar>
    </AppBar>
  )
}

export default Header
