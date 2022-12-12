// Made by Poukam Ngamaleu

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { notificationInterface } from '.'
import { theme } from '../../utils/style/theme'

function Notification({
  notifications,
}: {
  notifications: notificationInterface[]
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        backgroundColor: theme.common.notification,
        top: '80px',
        right: '0',
        width: '25rem',
        borderRadius: '5%',
        maxHeight: '30rem',
      }}
    >
      {notifications.map(
        ({ category, session, department, profil_img, nom }, index) => (
          <List key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={nom} src={profil_img} />
              </ListItemAvatar>
              <ListItemText
                primary="Epreuve en attente "
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {nom}
                    </Typography>
                    {` — Catégorie ${category} élaborée pour le département du ${department} de la session du ${session}`}
                  </Fragment>
                }
              />
            </ListItem>
          </List>
        )
      )}
    </Box>
  )
}

export default Notification
