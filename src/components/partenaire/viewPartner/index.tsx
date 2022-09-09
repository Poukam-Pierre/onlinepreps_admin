// Made by Poukam Ngamaleu

import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../../../utils/style/theme'
import { StyledLink } from '../../sideBar/sideBarEmploye'
import ChartInscription from './chartInscription'
import TransactionTable from './transactionTable'

function ViewPartner() {
  return (
    <Box p={3}>
      <Box display="flex" gap="20px">
        <Paper sx={{ flex: 1, padding: 3, bgcolor: '#F5F0F0' }}>
          <Box display="flex">
            <Avatar
              src="https://www.booska-p.com/wp-content/uploads/2022/02/Nicki-Minaj-Verzuz-Visu-News.jpg"
              sx={{ width: '5rem', height: '5rem' }}
            />
            <Box>
              <Typography padding="0px 16px" variant="h5" fontWeight="bold">
                Ngamaleu Poukam
              </Typography>
              <List>
                <ListItem sx={{ paddingTop: 0 }}>
                  <ListItemText
                    primary="Email :"
                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                  />
                  <Typography
                    variant="subtitle2"
                    paddingLeft="5px"
                    fontSize="0.89rem"
                    fontWeight={400}
                  >
                    Ngamaleu2011@gmail.com
                  </Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: 0 }}>
                  <ListItemText
                    primary="Phone :"
                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                  />
                  <Typography
                    variant="subtitle2"
                    paddingLeft="5px"
                    fontSize="0.89rem"
                    fontWeight={400}
                  >
                    +237 696841451
                  </Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: 0 }}>
                  <ListItemText
                    primary="Adresse :"
                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                  />
                  <Typography
                    variant="subtitle2"
                    paddingLeft="5px"
                    fontSize="0.89rem"
                    fontWeight={400}
                  >
                    NDE | CMR
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>
        <Paper
          sx={{ flex: 2, padding: 3, bgcolor: '#F5F0F0', height: '12rem' }}
        >
          <Typography color="#555">courbe des inscriptions</Typography>
          <ChartInscription />
        </Paper>
      </Box>
      <Box
        component={Paper}
        sx={{ padding: 3, marginTop: 2, bgcolor: '#FCFBFB', height: '26rem' }}
      >
        <Typography variant="h6" color="#555">
          Liste des transactions
        </Typography>
        <Box
          height="24rem"
          display="flex"
          justifyContent="center"
          padding="15px 0"
        >
          <TransactionTable />
        </Box>
      </Box>
    </Box>
  )
}

export default ViewPartner
