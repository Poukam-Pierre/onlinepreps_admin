// Made by Poukam Ngamaleu

import { Box } from '@mui/system'
import {
  Alert,
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  SlideProps,
  Snackbar,
  styled,
  Toolbar,
} from '@mui/material'
import { theme } from '../../utils/style/theme'
import logo from '../../asset/logoOnlinePreps.png'
import { useState, useEffect } from 'react'
import i18next from 'i18next'
import LanguageIcon from '@mui/icons-material/Language'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuSettings from './menuSetting'
import { alertMsgInterface } from '../employe/createEmploy'
import { useAuth } from '../../utils/context'
import { io } from 'socket.io-client'
import Notification from './Notifications'

export interface notificationInterface {
  category: string
  session: string
  department: string
  nom: string
  profil_img?: string
}
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

type TransitionProps = Omit<SlideProps, 'direction'>

function Header() {
  const {
    userInfo: { nom, id, is_admin, is_employe },
  } = useAuth()

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

  const [notifications, setNotifications] = useState<notificationInterface[]>(
    []
  )

  const [badgeContent, setBadgeContent] = useState<number>(0)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()
  const [openS, setOpenS] = useState<boolean>(false)
  const [openNotif, setOpenNotif] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }

  useEffect(() => {
    // TODO make greeting connection
    if (is_admin || is_employe) {
      const socket = io(process.env.REACT_APP_URL_SOCKET_LINK as string)

      socket.on('greeting', (msg: string) => {
        setCreatedMsg({
          message: `${msg} ${nom.toUpperCase()} !`,
          severity: 'success',
        })
        setOpenS(true)
      })

      // Adding infomation to server io
      socket.emit('newUser', id)
    }
  }, [])

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL_SOCKET_LINK as string)

    // listing notification from socket
    socket.on('getNotificationCreationTest', (data: notificationInterface) => {
      setNotifications((prev) => [...prev, data])
      setBadgeContent(notifications.length)
    })
  }, [badgeContent])

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
          {is_admin && (
            <IconButton
              sx={{ color: theme.palette.secondary.contrastText }}
              onClick={() => {
                setOpenNotif(!openNotif)
                setBadgeContent(0)
              }}
            >
              <Badge badgeContent={badgeContent} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
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
          {openNotif && <Notification notifications={notifications} />}
        </Box>
      </StyledToolbar>
      <Snackbar
        open={openS}
        onClose={() => setOpenS(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpenS(false)}
          severity={createdMsg?.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {createdMsg?.message}
        </Alert>
      </Snackbar>
    </AppBar>
  )
}

export default Header
