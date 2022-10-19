// Made by Poukam Ngamaleu

import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChartConnexion from './connexionRecord'
import SheetBuy from './sheetBuying'
import SheetCreate from './sheetCreated'

function ViewEmploye() {
  const { employeId } = useParams()
  const navigate = useNavigate()
  const [value, setValue] = useState<string>('1')
  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const handleClick = () => {
    navigate(`/admin/employe/modify/${employeId}`)
  }

  //TODO Fetch function insert here

  return (
    <Box p={3}>
      <Box display="flex" gap="20px">
        <Paper
          sx={{ flex: 1, padding: 3, bgcolor: '#F5F0F0', position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              color: '#2092BA',
              top: '0px',
              right: '5px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          >
            <Typography variant="subtitle2" padding="2px">
              Modifier
            </Typography>
          </Box>
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
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText
                    primary="Poste :"
                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                  />
                  <Typography
                    variant="subtitle2"
                    paddingLeft="5px"
                    fontSize="0.89rem"
                    fontWeight={400}
                  >
                    Agent | WOURI 5
                  </Typography>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>
        <Paper
          sx={{ flex: 2, padding: 3, bgcolor: '#F5F0F0', height: '12rem' }}
        >
          <Typography color="#555">Taux de connexion</Typography>
          <ChartConnexion />
        </Paper>
      </Box>
      <Box
        component={Paper}
        sx={{ padding: 1, marginTop: 2, bgcolor: '#FCFBFB' }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: '#555' }}>
            <TabList
              onChange={(event: React.ChangeEvent<{}>, val: string) =>
                handleChange(val)
              }
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Epreuves créées" value="1" />
              <Tab label="Epreuves achetées" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box height="24rem" display="flex" justifyContent="center">
              <SheetCreate />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box height="24rem" display="flex" justifyContent="center">
              <SheetBuy />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default ViewEmploye
