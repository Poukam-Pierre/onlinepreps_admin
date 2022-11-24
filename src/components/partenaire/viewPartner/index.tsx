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
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChartInscription from './chartInscription'
import TransactionTable from './transactionTable'

interface partnerDataInterface {
  nom: string
  prenom: string
  email: string
  phone: string
  adresse: string
  profil_img: string
}

function ViewPartner() {
  const { partnerId } = useParams()
  const [partnerData, setPartnerData] = useState<partnerDataInterface>()

  useEffect(() => {
    // TODO fetch data to BDD
    Axios.get(`http://localhost:3000/api/admin/getPartnerInfo/${partnerId}`)
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setPartnerData(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data.message)
        }
      })
  }, [])

  return (
    <Box p={3}>
      <Box display="flex" gap="20px">
        <Paper sx={{ flex: 1, padding: 3, bgcolor: '#F5F0F0' }}>
          <Box display="flex">
            <Avatar
              src={
                partnerData
                  ? partnerData.profil_img
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              sx={{ width: '5rem', height: '5rem' }}
            />
            <Box>
              <Typography padding="0px 16px" variant="h5" fontWeight="bold">
                {partnerData?.nom} {partnerData?.prenom}
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
                    {partnerData?.email}
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
                    {partnerData?.phone}
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
                    {partnerData?.adresse}
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
          <ChartInscription id={partnerId} />
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
          <TransactionTable id={partnerId} />
        </Box>
      </Box>
    </Box>
  )
}

export default ViewPartner
