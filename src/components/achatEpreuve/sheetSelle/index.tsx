// Made by Poukam Ngamaleu

import {
  Alert,
  Box,
  Button,
  Divider,
  Modal,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { alertMsgInterface } from '../../employe/createEmploy'

const columns: {
  field: string
  headerName: string
  width: number
  renderCell?: any
}[] = [
  { field: 'test_selling_id', headerName: 'ID', width: 180 },
  { field: 'category', headerName: 'Catégorie', width: 130 },
  { field: 'session', headerName: 'Session', width: 180 },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: (params: any) => {
      return (
        <>
          {params.row.status === 'waiting' ? (
            <span
              style={{
                backgroundColor: '#F89E9E',
                color: '#A95454',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              En vente
            </span>
          ) : params.row.status === 'buy' ? (
            <span
              style={{
                backgroundColor: '#D2F0F2',
                color: '#41B2BA',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Acheter
            </span>
          ) : (
            <span
              style={{
                backgroundColor: '#CAD2FF',
                color: '#626DA9',
                padding: '10px',
                borderRadius: '15px',
              }}
            >
              Contacter
            </span>
          )}
        </>
      )
    },
  },
]

interface rowsInterface {
  test_selling_id: string
  category: string
  session: string
  status: string
}

interface sellerInterface {
  nom: string
  email: string
  phoneNumber: string
}
type TransitionProps = Omit<SlideProps, 'direction'>

function SelleSheetTable({
  poste,
  id: employeId,
}: {
  poste: string
  id: number
}) {
  const [open, setOpen] = useState<boolean>(false)
  const [rows, setRows] = useState<rowsInterface[]>([])
  const [sellerInfos, setSellerInfos] = useState<sellerInterface>()
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  useEffect(() => {
    // TODO fetch data from BDD
    Axios.get(
      `http://localhost:3000/api/employe/getAllTestSell/${poste?.split('|')[1]}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) setRows(res.data)
      })
      .catch((err) => {
        if (err.response.status === 404) return
      })
  }, [open])

  const handleOpen = (id_: string) => {
    Axios.get(`http://localhost:3000/api/employe/getSellerInfos/${id_}`)
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setSellerInfos(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 404) return
      })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleBuy = (id_: string) => {
    Axios.put(
      `http://localhost:3000/api/employe/buyTestSheet/${id_}`,
      employeId
    )
      .then((res) => {
        if (res?.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'success',
          })
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: 'Erreur serveur. Veuillez rééssayer plus tart',
            severity: 'error',
          })
        }
      })
  }
  const actionColumns: {
    field: string
    headerName: string
    width: number
    renderCell: any
  }[] = [
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params: any) => {
        return (
          <Box display="flex" gap="10px">
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1A9EA7',
              }}
              disabled={params.row.status === 'buy' ? true : false}
              onClick={() => handleOpen(params.row.test_selling_id)}
            >
              Contacter
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#CBCBCB',
                color: '#1D689F',
              }}
              disabled={params.row.status === 'buy' ? true : false}
              onClick={() => handleBuy(params.row.test_selling_id)}
            >
              Acheter
            </Button>
          </Box>
        )
      },
    },
  ]

  const [openS, setOpenS] = useState(false)

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <>
      <DataGrid
        getRowId={(rows) => rows.test_selling_id}
        rows={rows}
        columns={columns.concat(actionColumns)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        sx={{ maxWidth: '63rem' }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            bgcolor: '#F5F0F0',
            width: '25rem',
            height: '15rem',
            borderRadius: '20px',
            padding: '10px',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            color="#555"
            padding="0 0 15px 10px"
          >
            Coordonnées du vendeur
          </Typography>
          <Divider />
          <Box p={2} display="grid" gap="20px">
            <Box display="flex" gap="10px" alignItems="center">
              <Typography variant="h6">Nom :</Typography>
              <Typography>{sellerInfos?.nom}</Typography>
            </Box>
            <Box display="flex" gap="10px" alignItems="center">
              <Typography variant="h6">Email :</Typography>
              <Typography>{sellerInfos?.email}</Typography>
            </Box>
            <Box display="flex" gap="10px" alignItems="center">
              <Typography variant="h6">Numéro de téléphone :</Typography>
              <Typography>{sellerInfos?.phoneNumber}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
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
    </>
  )
}

export default SelleSheetTable
