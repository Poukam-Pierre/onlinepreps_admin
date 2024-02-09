// Made by Poukam Ngamaleu

import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChartInscription from './chartInscription'
import TransactionTable from './transactionTable'
import { alertMsgInterface } from '../../employe/createEmploy'

interface partnerDataInterface {
  nom: string
  prenom: string
  email: string
  phone: string
  adresse: string
  profil_img: string
  commission: number
  montant: number
}
type TransitionProps = Omit<SlideProps, 'direction'>

function ViewPartner() {
  const { partnerId } = useParams()
  const [partnerData, setPartnerData] = useState<partnerDataInterface>()
  const [open, setOpen] = useState<boolean>(false)
  const [rate, setRate] = useState<number>()
  const [openS, setOpenS] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()



  useEffect(() => {
    // TODO change local link to remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getPartnerInfo/${partnerId}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setPartnerData(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return
        }
      })
  }, [])

  const handleRate = () => {
    setOpen(false)
    Axios.post(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/changeCommissionByPartner`,
      { comission: rate, id: partnerId },
    )
      .then((res) => {
        if (res.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'success',
          })
          setOpenS(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) return
      })
  }

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }

  return (
    <Box p={3}>
      <Box display="flex" gap="20px">
        <Paper sx={{ flex: 1, padding: 3, bgcolor: '#F5F0F0', position: 'relative' }}>
          <Box display="flex">
            <Avatar
              src={
                partnerData
                  ? partnerData.profil_img
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              sx={{ width: '3rem', height: '3rem' }}
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
                    primary="Gain(%) :"
                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                  />
                  <Typography
                    variant="subtitle2"
                    paddingLeft="5px"
                    fontSize="0.89rem"
                    fontWeight={400}
                  >
                    {partnerData?.commission}
                  </Typography>
                </ListItem>
                <ListItem sx={{ paddingTop: 0 }}>
                  <ListItemText
                    primary="Gain(FCFA) :"
                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                  />
                  <Typography
                    variant="subtitle2"
                    paddingLeft="5px"
                    fontSize="0.89rem"
                    fontWeight={400}
                  >
                    {partnerData?.montant}
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
          <Box
            sx={{
              position: 'absolute',
              color: '#2092BA',
              top: '2px',
              right: '9px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            <Typography variant="subtitle2" padding="2px">
              Modifier
            </Typography>
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Taux de gain</DialogTitle>
        <DialogContent>
          <TextField
            variant="standard"
            type="number"
            autoFocus
            label="Taux de gain"
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRate}>Valider</Button>
        </DialogActions>
      </Dialog>
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

    </Box>
  )
}

export default ViewPartner
