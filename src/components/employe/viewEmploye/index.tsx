// Made by Poukam Ngamaleu

import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import {
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material'
import Tab from '@mui/material/Tab'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ChartConnexion from './connexionRecord'
import SheetBuy from './sheetBuying'
import SheetCreate from './sheetCreated'
import Axios from 'axios'
import { alertMsgInterface } from '../createEmploy'

export interface employeDataInterface {
  nom: string
  email: string
  phone: string
  poste: string
  adresse: string
  profil_img?: string
  user_country?: string
}

type TransitionProps = Omit<SlideProps, 'direction'>

function ViewEmploye() {
  const { employeId } = useParams()
  const navigate = useNavigate()
  const [value, setValue] = useState<string>('1')
  const [employeData, setEmployeData] = useState<employeDataInterface>()
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const handleClick = () => {
    navigate(`/admin/employe/modify/${employeId}`)
  }

  useEffect(() => {
    // TODO fetch data from BDD
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getEmployeInfo/${employeId}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setEmployeData(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: err.response.data.message,
            severity: 'error',
          })
        } else {
          setCreatedMsg({
            message: 'Rééssayez plutard',
            severity: 'error',
          })
        }
      })
  }, [])

  const [open, setOpen] = useState(false)

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
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
              src={
                employeData
                  ? employeData.profil_img
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              sx={{ width: '5rem', height: '5rem' }}
            />
            <Box>
              <Typography padding="0px 16px" variant="h5" fontWeight="bold">
                {employeData?.nom}
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
                    {employeData?.email}
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
                    {employeData?.phone}
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
                    {employeData?.adresse}
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
                    {employeData?.poste}
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
          <ChartConnexion id={employeId} />
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
              <SheetCreate
                id={employeId}
                setCreatedMsg={setCreatedMsg}
                setOpen={setOpen}
                createdMsg={createdMsg}
              />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box height="24rem" display="flex" justifyContent="center">
              <SheetBuy />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={createdMsg?.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {createdMsg?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ViewEmploye
